package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Textalignmentdisplay;
import com.spirovanni.blackshields.repository.TextalignmentdisplayRepository;
import com.spirovanni.blackshields.repository.search.TextalignmentdisplaySearchRepository;
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
 * Test class for the TextalignmentdisplayResource REST controller.
 *
 * @see TextalignmentdisplayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class TextalignmentdisplayResourceIntTest {

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
    private TextalignmentdisplayRepository textalignmentdisplayRepository;

    @Autowired
    private TextalignmentdisplaySearchRepository textalignmentdisplaySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTextalignmentdisplayMockMvc;

    private Textalignmentdisplay textalignmentdisplay;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TextalignmentdisplayResource textalignmentdisplayResource = new TextalignmentdisplayResource(textalignmentdisplayRepository, textalignmentdisplaySearchRepository);
        this.restTextalignmentdisplayMockMvc = MockMvcBuilders.standaloneSetup(textalignmentdisplayResource)
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
    public static Textalignmentdisplay createEntity(EntityManager em) {
        Textalignmentdisplay textalignmentdisplay = new Textalignmentdisplay()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return textalignmentdisplay;
    }

    @Before
    public void initTest() {
        textalignmentdisplaySearchRepository.deleteAll();
        textalignmentdisplay = createEntity(em);
    }

    @Test
    @Transactional
    public void createTextalignmentdisplay() throws Exception {
        int databaseSizeBeforeCreate = textalignmentdisplayRepository.findAll().size();

        // Create the Textalignmentdisplay
        restTextalignmentdisplayMockMvc.perform(post("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isCreated());

        // Validate the Textalignmentdisplay in the database
        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeCreate + 1);
        Textalignmentdisplay testTextalignmentdisplay = textalignmentdisplayList.get(textalignmentdisplayList.size() - 1);
        assertThat(testTextalignmentdisplay.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testTextalignmentdisplay.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testTextalignmentdisplay.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTextalignmentdisplay.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testTextalignmentdisplay.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Textalignmentdisplay in Elasticsearch
        Textalignmentdisplay textalignmentdisplayEs = textalignmentdisplaySearchRepository.findOne(testTextalignmentdisplay.getId());
        assertThat(textalignmentdisplayEs).isEqualToIgnoringGivenFields(testTextalignmentdisplay);
    }

    @Test
    @Transactional
    public void createTextalignmentdisplayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = textalignmentdisplayRepository.findAll().size();

        // Create the Textalignmentdisplay with an existing ID
        textalignmentdisplay.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTextalignmentdisplayMockMvc.perform(post("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isBadRequest());

        // Validate the Textalignmentdisplay in the database
        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = textalignmentdisplayRepository.findAll().size();
        // set the field null
        textalignmentdisplay.setDate(null);

        // Create the Textalignmentdisplay, which fails.

        restTextalignmentdisplayMockMvc.perform(post("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isBadRequest());

        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = textalignmentdisplayRepository.findAll().size();
        // set the field null
        textalignmentdisplay.setStatus(null);

        // Create the Textalignmentdisplay, which fails.

        restTextalignmentdisplayMockMvc.perform(post("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isBadRequest());

        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = textalignmentdisplayRepository.findAll().size();
        // set the field null
        textalignmentdisplay.setDescription(null);

        // Create the Textalignmentdisplay, which fails.

        restTextalignmentdisplayMockMvc.perform(post("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isBadRequest());

        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTextalignmentdisplays() throws Exception {
        // Initialize the database
        textalignmentdisplayRepository.saveAndFlush(textalignmentdisplay);

        // Get all the textalignmentdisplayList
        restTextalignmentdisplayMockMvc.perform(get("/api/textalignmentdisplays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(textalignmentdisplay.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getTextalignmentdisplay() throws Exception {
        // Initialize the database
        textalignmentdisplayRepository.saveAndFlush(textalignmentdisplay);

        // Get the textalignmentdisplay
        restTextalignmentdisplayMockMvc.perform(get("/api/textalignmentdisplays/{id}", textalignmentdisplay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(textalignmentdisplay.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingTextalignmentdisplay() throws Exception {
        // Get the textalignmentdisplay
        restTextalignmentdisplayMockMvc.perform(get("/api/textalignmentdisplays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTextalignmentdisplay() throws Exception {
        // Initialize the database
        textalignmentdisplayRepository.saveAndFlush(textalignmentdisplay);
        textalignmentdisplaySearchRepository.save(textalignmentdisplay);
        int databaseSizeBeforeUpdate = textalignmentdisplayRepository.findAll().size();

        // Update the textalignmentdisplay
        Textalignmentdisplay updatedTextalignmentdisplay = textalignmentdisplayRepository.findOne(textalignmentdisplay.getId());
        // Disconnect from session so that the updates on updatedTextalignmentdisplay are not directly saved in db
        em.detach(updatedTextalignmentdisplay);
        updatedTextalignmentdisplay
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restTextalignmentdisplayMockMvc.perform(put("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTextalignmentdisplay)))
            .andExpect(status().isOk());

        // Validate the Textalignmentdisplay in the database
        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeUpdate);
        Textalignmentdisplay testTextalignmentdisplay = textalignmentdisplayList.get(textalignmentdisplayList.size() - 1);
        assertThat(testTextalignmentdisplay.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testTextalignmentdisplay.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testTextalignmentdisplay.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTextalignmentdisplay.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testTextalignmentdisplay.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Textalignmentdisplay in Elasticsearch
        Textalignmentdisplay textalignmentdisplayEs = textalignmentdisplaySearchRepository.findOne(testTextalignmentdisplay.getId());
        assertThat(textalignmentdisplayEs).isEqualToIgnoringGivenFields(testTextalignmentdisplay);
    }

    @Test
    @Transactional
    public void updateNonExistingTextalignmentdisplay() throws Exception {
        int databaseSizeBeforeUpdate = textalignmentdisplayRepository.findAll().size();

        // Create the Textalignmentdisplay

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTextalignmentdisplayMockMvc.perform(put("/api/textalignmentdisplays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(textalignmentdisplay)))
            .andExpect(status().isCreated());

        // Validate the Textalignmentdisplay in the database
        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTextalignmentdisplay() throws Exception {
        // Initialize the database
        textalignmentdisplayRepository.saveAndFlush(textalignmentdisplay);
        textalignmentdisplaySearchRepository.save(textalignmentdisplay);
        int databaseSizeBeforeDelete = textalignmentdisplayRepository.findAll().size();

        // Get the textalignmentdisplay
        restTextalignmentdisplayMockMvc.perform(delete("/api/textalignmentdisplays/{id}", textalignmentdisplay.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean textalignmentdisplayExistsInEs = textalignmentdisplaySearchRepository.exists(textalignmentdisplay.getId());
        assertThat(textalignmentdisplayExistsInEs).isFalse();

        // Validate the database is empty
        List<Textalignmentdisplay> textalignmentdisplayList = textalignmentdisplayRepository.findAll();
        assertThat(textalignmentdisplayList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchTextalignmentdisplay() throws Exception {
        // Initialize the database
        textalignmentdisplayRepository.saveAndFlush(textalignmentdisplay);
        textalignmentdisplaySearchRepository.save(textalignmentdisplay);

        // Search the textalignmentdisplay
        restTextalignmentdisplayMockMvc.perform(get("/api/_search/textalignmentdisplays?query=id:" + textalignmentdisplay.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(textalignmentdisplay.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Textalignmentdisplay.class);
        Textalignmentdisplay textalignmentdisplay1 = new Textalignmentdisplay();
        textalignmentdisplay1.setId(1L);
        Textalignmentdisplay textalignmentdisplay2 = new Textalignmentdisplay();
        textalignmentdisplay2.setId(textalignmentdisplay1.getId());
        assertThat(textalignmentdisplay1).isEqualTo(textalignmentdisplay2);
        textalignmentdisplay2.setId(2L);
        assertThat(textalignmentdisplay1).isNotEqualTo(textalignmentdisplay2);
        textalignmentdisplay1.setId(null);
        assertThat(textalignmentdisplay1).isNotEqualTo(textalignmentdisplay2);
    }
}
