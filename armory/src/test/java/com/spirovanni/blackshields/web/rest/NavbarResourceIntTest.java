package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Navbar;
import com.spirovanni.blackshields.repository.NavbarRepository;
import com.spirovanni.blackshields.repository.search.NavbarSearchRepository;
import com.spirovanni.blackshields.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.spirovanni.blackshields.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.spirovanni.blackshields.domain.enumeration.Status;
/**
 * Test class for the NavbarResource REST controller.
 *
 * @see NavbarResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class NavbarResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Status DEFAULT_STATUS = Status.ALPHA;
    private static final Status UPDATED_STATUS = Status.BETA;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    @Autowired
    private NavbarRepository navbarRepository;

    @Autowired
    private NavbarSearchRepository navbarSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNavbarMockMvc;

    private Navbar navbar;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NavbarResource navbarResource = new NavbarResource(navbarRepository, navbarSearchRepository);
        this.restNavbarMockMvc = MockMvcBuilders.standaloneSetup(navbarResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Navbar createEntity(EntityManager em) {
        Navbar navbar = new Navbar()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return navbar;
    }

    @Before
    public void initTest() {
        navbarSearchRepository.deleteAll();
        navbar = createEntity(em);
    }

    @Test
    @Transactional
    public void createNavbar() throws Exception {
        int databaseSizeBeforeCreate = navbarRepository.findAll().size();

        // Create the Navbar
        restNavbarMockMvc.perform(post("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isCreated());

        // Validate the Navbar in the database
        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeCreate + 1);
        Navbar testNavbar = navbarList.get(navbarList.size() - 1);
        assertThat(testNavbar.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testNavbar.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testNavbar.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testNavbar.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testNavbar.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Navbar in Elasticsearch
        Navbar navbarEs = navbarSearchRepository.findOne(testNavbar.getId());
        assertThat(navbarEs).isEqualToIgnoringGivenFields(testNavbar);
    }

    @Test
    @Transactional
    public void createNavbarWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = navbarRepository.findAll().size();

        // Create the Navbar with an existing ID
        navbar.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNavbarMockMvc.perform(post("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isBadRequest());

        // Validate the Navbar in the database
        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = navbarRepository.findAll().size();
        // set the field null
        navbar.setDate(null);

        // Create the Navbar, which fails.

        restNavbarMockMvc.perform(post("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isBadRequest());

        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = navbarRepository.findAll().size();
        // set the field null
        navbar.setStatus(null);

        // Create the Navbar, which fails.

        restNavbarMockMvc.perform(post("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isBadRequest());

        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = navbarRepository.findAll().size();
        // set the field null
        navbar.setDescription(null);

        // Create the Navbar, which fails.

        restNavbarMockMvc.perform(post("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isBadRequest());

        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNavbars() throws Exception {
        // Initialize the database
        navbarRepository.saveAndFlush(navbar);

        // Get all the navbarList
        restNavbarMockMvc.perform(get("/api/navbars?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(navbar.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getNavbar() throws Exception {
        // Initialize the database
        navbarRepository.saveAndFlush(navbar);

        // Get the navbar
        restNavbarMockMvc.perform(get("/api/navbars/{id}", navbar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(navbar.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingNavbar() throws Exception {
        // Get the navbar
        restNavbarMockMvc.perform(get("/api/navbars/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNavbar() throws Exception {
        // Initialize the database
        navbarRepository.saveAndFlush(navbar);
        navbarSearchRepository.save(navbar);
        int databaseSizeBeforeUpdate = navbarRepository.findAll().size();

        // Update the navbar
        Navbar updatedNavbar = navbarRepository.findOne(navbar.getId());
        // Disconnect from session so that the updates on updatedNavbar are not directly saved in db
        em.detach(updatedNavbar);
        updatedNavbar
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restNavbarMockMvc.perform(put("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNavbar)))
            .andExpect(status().isOk());

        // Validate the Navbar in the database
        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeUpdate);
        Navbar testNavbar = navbarList.get(navbarList.size() - 1);
        assertThat(testNavbar.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testNavbar.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testNavbar.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testNavbar.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testNavbar.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Navbar in Elasticsearch
        Navbar navbarEs = navbarSearchRepository.findOne(testNavbar.getId());
        assertThat(navbarEs).isEqualToIgnoringGivenFields(testNavbar);
    }

    @Test
    @Transactional
    public void updateNonExistingNavbar() throws Exception {
        int databaseSizeBeforeUpdate = navbarRepository.findAll().size();

        // Create the Navbar

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNavbarMockMvc.perform(put("/api/navbars")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(navbar)))
            .andExpect(status().isCreated());

        // Validate the Navbar in the database
        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNavbar() throws Exception {
        // Initialize the database
        navbarRepository.saveAndFlush(navbar);
        navbarSearchRepository.save(navbar);
        int databaseSizeBeforeDelete = navbarRepository.findAll().size();

        // Get the navbar
        restNavbarMockMvc.perform(delete("/api/navbars/{id}", navbar.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean navbarExistsInEs = navbarSearchRepository.exists(navbar.getId());
        assertThat(navbarExistsInEs).isFalse();

        // Validate the database is empty
        List<Navbar> navbarList = navbarRepository.findAll();
        assertThat(navbarList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchNavbar() throws Exception {
        // Initialize the database
        navbarRepository.saveAndFlush(navbar);
        navbarSearchRepository.save(navbar);

        // Search the navbar
        restNavbarMockMvc.perform(get("/api/_search/navbars?query=id:" + navbar.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(navbar.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Navbar.class);
        Navbar navbar1 = new Navbar();
        navbar1.setId(1L);
        Navbar navbar2 = new Navbar();
        navbar2.setId(navbar1.getId());
        assertThat(navbar1).isEqualTo(navbar2);
        navbar2.setId(2L);
        assertThat(navbar1).isNotEqualTo(navbar2);
        navbar1.setId(null);
        assertThat(navbar1).isNotEqualTo(navbar2);
    }
}
