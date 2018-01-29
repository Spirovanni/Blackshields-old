package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Basictypography;
import com.spirovanni.blackshields.repository.BasictypographyRepository;
import com.spirovanni.blackshields.repository.search.BasictypographySearchRepository;
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

import com.spirovanni.blackshields.domain.enumeration.Stage;
/**
 * Test class for the BasictypographyResource REST controller.
 *
 * @see BasictypographyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class BasictypographyResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Stage DEFAULT_STAGE = Stage.ALPHA;
    private static final Stage UPDATED_STAGE = Stage.BETA;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    @Autowired
    private BasictypographyRepository basictypographyRepository;

    @Autowired
    private BasictypographySearchRepository basictypographySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBasictypographyMockMvc;

    private Basictypography basictypography;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BasictypographyResource basictypographyResource = new BasictypographyResource(basictypographyRepository, basictypographySearchRepository);
        this.restBasictypographyMockMvc = MockMvcBuilders.standaloneSetup(basictypographyResource)
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
    public static Basictypography createEntity(EntityManager em) {
        Basictypography basictypography = new Basictypography()
            .date(DEFAULT_DATE)
            .stage(DEFAULT_STAGE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return basictypography;
    }

    @Before
    public void initTest() {
        basictypographySearchRepository.deleteAll();
        basictypography = createEntity(em);
    }

    @Test
    @Transactional
    public void createBasictypography() throws Exception {
        int databaseSizeBeforeCreate = basictypographyRepository.findAll().size();

        // Create the Basictypography
        restBasictypographyMockMvc.perform(post("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isCreated());

        // Validate the Basictypography in the database
        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeCreate + 1);
        Basictypography testBasictypography = basictypographyList.get(basictypographyList.size() - 1);
        assertThat(testBasictypography.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testBasictypography.getStage()).isEqualTo(DEFAULT_STAGE);
        assertThat(testBasictypography.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBasictypography.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testBasictypography.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Basictypography in Elasticsearch
        Basictypography basictypographyEs = basictypographySearchRepository.findOne(testBasictypography.getId());
        assertThat(basictypographyEs).isEqualToIgnoringGivenFields(testBasictypography);
    }

    @Test
    @Transactional
    public void createBasictypographyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = basictypographyRepository.findAll().size();

        // Create the Basictypography with an existing ID
        basictypography.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBasictypographyMockMvc.perform(post("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isBadRequest());

        // Validate the Basictypography in the database
        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = basictypographyRepository.findAll().size();
        // set the field null
        basictypography.setDate(null);

        // Create the Basictypography, which fails.

        restBasictypographyMockMvc.perform(post("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isBadRequest());

        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStageIsRequired() throws Exception {
        int databaseSizeBeforeTest = basictypographyRepository.findAll().size();
        // set the field null
        basictypography.setStage(null);

        // Create the Basictypography, which fails.

        restBasictypographyMockMvc.perform(post("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isBadRequest());

        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = basictypographyRepository.findAll().size();
        // set the field null
        basictypography.setDescription(null);

        // Create the Basictypography, which fails.

        restBasictypographyMockMvc.perform(post("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isBadRequest());

        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBasictypographies() throws Exception {
        // Initialize the database
        basictypographyRepository.saveAndFlush(basictypography);

        // Get all the basictypographyList
        restBasictypographyMockMvc.perform(get("/api/basictypographies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basictypography.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getBasictypography() throws Exception {
        // Initialize the database
        basictypographyRepository.saveAndFlush(basictypography);

        // Get the basictypography
        restBasictypographyMockMvc.perform(get("/api/basictypographies/{id}", basictypography.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(basictypography.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.stage").value(DEFAULT_STAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingBasictypography() throws Exception {
        // Get the basictypography
        restBasictypographyMockMvc.perform(get("/api/basictypographies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBasictypography() throws Exception {
        // Initialize the database
        basictypographyRepository.saveAndFlush(basictypography);
        basictypographySearchRepository.save(basictypography);
        int databaseSizeBeforeUpdate = basictypographyRepository.findAll().size();

        // Update the basictypography
        Basictypography updatedBasictypography = basictypographyRepository.findOne(basictypography.getId());
        // Disconnect from session so that the updates on updatedBasictypography are not directly saved in db
        em.detach(updatedBasictypography);
        updatedBasictypography
            .date(UPDATED_DATE)
            .stage(UPDATED_STAGE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restBasictypographyMockMvc.perform(put("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBasictypography)))
            .andExpect(status().isOk());

        // Validate the Basictypography in the database
        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeUpdate);
        Basictypography testBasictypography = basictypographyList.get(basictypographyList.size() - 1);
        assertThat(testBasictypography.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testBasictypography.getStage()).isEqualTo(UPDATED_STAGE);
        assertThat(testBasictypography.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBasictypography.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testBasictypography.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Basictypography in Elasticsearch
        Basictypography basictypographyEs = basictypographySearchRepository.findOne(testBasictypography.getId());
        assertThat(basictypographyEs).isEqualToIgnoringGivenFields(testBasictypography);
    }

    @Test
    @Transactional
    public void updateNonExistingBasictypography() throws Exception {
        int databaseSizeBeforeUpdate = basictypographyRepository.findAll().size();

        // Create the Basictypography

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBasictypographyMockMvc.perform(put("/api/basictypographies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(basictypography)))
            .andExpect(status().isCreated());

        // Validate the Basictypography in the database
        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBasictypography() throws Exception {
        // Initialize the database
        basictypographyRepository.saveAndFlush(basictypography);
        basictypographySearchRepository.save(basictypography);
        int databaseSizeBeforeDelete = basictypographyRepository.findAll().size();

        // Get the basictypography
        restBasictypographyMockMvc.perform(delete("/api/basictypographies/{id}", basictypography.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean basictypographyExistsInEs = basictypographySearchRepository.exists(basictypography.getId());
        assertThat(basictypographyExistsInEs).isFalse();

        // Validate the database is empty
        List<Basictypography> basictypographyList = basictypographyRepository.findAll();
        assertThat(basictypographyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchBasictypography() throws Exception {
        // Initialize the database
        basictypographyRepository.saveAndFlush(basictypography);
        basictypographySearchRepository.save(basictypography);

        // Search the basictypography
        restBasictypographyMockMvc.perform(get("/api/_search/basictypographies?query=id:" + basictypography.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(basictypography.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Basictypography.class);
        Basictypography basictypography1 = new Basictypography();
        basictypography1.setId(1L);
        Basictypography basictypography2 = new Basictypography();
        basictypography2.setId(basictypography1.getId());
        assertThat(basictypography1).isEqualTo(basictypography2);
        basictypography2.setId(2L);
        assertThat(basictypography1).isNotEqualTo(basictypography2);
        basictypography1.setId(null);
        assertThat(basictypography1).isNotEqualTo(basictypography2);
    }
}
