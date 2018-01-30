package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Colorsbackground;
import com.spirovanni.blackshields.repository.ColorsbackgroundRepository;
import com.spirovanni.blackshields.repository.search.ColorsbackgroundSearchRepository;
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
 * Test class for the ColorsbackgroundResource REST controller.
 *
 * @see ColorsbackgroundResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class ColorsbackgroundResourceIntTest {

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
    private ColorsbackgroundRepository colorsbackgroundRepository;

    @Autowired
    private ColorsbackgroundSearchRepository colorsbackgroundSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restColorsbackgroundMockMvc;

    private Colorsbackground colorsbackground;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColorsbackgroundResource colorsbackgroundResource = new ColorsbackgroundResource(colorsbackgroundRepository, colorsbackgroundSearchRepository);
        this.restColorsbackgroundMockMvc = MockMvcBuilders.standaloneSetup(colorsbackgroundResource)
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
    public static Colorsbackground createEntity(EntityManager em) {
        Colorsbackground colorsbackground = new Colorsbackground()
            .date(DEFAULT_DATE)
            .stage(DEFAULT_STAGE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return colorsbackground;
    }

    @Before
    public void initTest() {
        colorsbackgroundSearchRepository.deleteAll();
        colorsbackground = createEntity(em);
    }

    @Test
    @Transactional
    public void createColorsbackground() throws Exception {
        int databaseSizeBeforeCreate = colorsbackgroundRepository.findAll().size();

        // Create the Colorsbackground
        restColorsbackgroundMockMvc.perform(post("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isCreated());

        // Validate the Colorsbackground in the database
        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeCreate + 1);
        Colorsbackground testColorsbackground = colorsbackgroundList.get(colorsbackgroundList.size() - 1);
        assertThat(testColorsbackground.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testColorsbackground.getStage()).isEqualTo(DEFAULT_STAGE);
        assertThat(testColorsbackground.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testColorsbackground.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testColorsbackground.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Colorsbackground in Elasticsearch
        Colorsbackground colorsbackgroundEs = colorsbackgroundSearchRepository.findOne(testColorsbackground.getId());
        assertThat(colorsbackgroundEs).isEqualToIgnoringGivenFields(testColorsbackground);
    }

    @Test
    @Transactional
    public void createColorsbackgroundWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colorsbackgroundRepository.findAll().size();

        // Create the Colorsbackground with an existing ID
        colorsbackground.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColorsbackgroundMockMvc.perform(post("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isBadRequest());

        // Validate the Colorsbackground in the database
        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = colorsbackgroundRepository.findAll().size();
        // set the field null
        colorsbackground.setDate(null);

        // Create the Colorsbackground, which fails.

        restColorsbackgroundMockMvc.perform(post("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isBadRequest());

        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStageIsRequired() throws Exception {
        int databaseSizeBeforeTest = colorsbackgroundRepository.findAll().size();
        // set the field null
        colorsbackground.setStage(null);

        // Create the Colorsbackground, which fails.

        restColorsbackgroundMockMvc.perform(post("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isBadRequest());

        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = colorsbackgroundRepository.findAll().size();
        // set the field null
        colorsbackground.setDescription(null);

        // Create the Colorsbackground, which fails.

        restColorsbackgroundMockMvc.perform(post("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isBadRequest());

        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllColorsbackgrounds() throws Exception {
        // Initialize the database
        colorsbackgroundRepository.saveAndFlush(colorsbackground);

        // Get all the colorsbackgroundList
        restColorsbackgroundMockMvc.perform(get("/api/colorsbackgrounds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colorsbackground.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getColorsbackground() throws Exception {
        // Initialize the database
        colorsbackgroundRepository.saveAndFlush(colorsbackground);

        // Get the colorsbackground
        restColorsbackgroundMockMvc.perform(get("/api/colorsbackgrounds/{id}", colorsbackground.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colorsbackground.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.stage").value(DEFAULT_STAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingColorsbackground() throws Exception {
        // Get the colorsbackground
        restColorsbackgroundMockMvc.perform(get("/api/colorsbackgrounds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColorsbackground() throws Exception {
        // Initialize the database
        colorsbackgroundRepository.saveAndFlush(colorsbackground);
        colorsbackgroundSearchRepository.save(colorsbackground);
        int databaseSizeBeforeUpdate = colorsbackgroundRepository.findAll().size();

        // Update the colorsbackground
        Colorsbackground updatedColorsbackground = colorsbackgroundRepository.findOne(colorsbackground.getId());
        // Disconnect from session so that the updates on updatedColorsbackground are not directly saved in db
        em.detach(updatedColorsbackground);
        updatedColorsbackground
            .date(UPDATED_DATE)
            .stage(UPDATED_STAGE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restColorsbackgroundMockMvc.perform(put("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColorsbackground)))
            .andExpect(status().isOk());

        // Validate the Colorsbackground in the database
        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeUpdate);
        Colorsbackground testColorsbackground = colorsbackgroundList.get(colorsbackgroundList.size() - 1);
        assertThat(testColorsbackground.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testColorsbackground.getStage()).isEqualTo(UPDATED_STAGE);
        assertThat(testColorsbackground.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testColorsbackground.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testColorsbackground.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Colorsbackground in Elasticsearch
        Colorsbackground colorsbackgroundEs = colorsbackgroundSearchRepository.findOne(testColorsbackground.getId());
        assertThat(colorsbackgroundEs).isEqualToIgnoringGivenFields(testColorsbackground);
    }

    @Test
    @Transactional
    public void updateNonExistingColorsbackground() throws Exception {
        int databaseSizeBeforeUpdate = colorsbackgroundRepository.findAll().size();

        // Create the Colorsbackground

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restColorsbackgroundMockMvc.perform(put("/api/colorsbackgrounds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorsbackground)))
            .andExpect(status().isCreated());

        // Validate the Colorsbackground in the database
        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteColorsbackground() throws Exception {
        // Initialize the database
        colorsbackgroundRepository.saveAndFlush(colorsbackground);
        colorsbackgroundSearchRepository.save(colorsbackground);
        int databaseSizeBeforeDelete = colorsbackgroundRepository.findAll().size();

        // Get the colorsbackground
        restColorsbackgroundMockMvc.perform(delete("/api/colorsbackgrounds/{id}", colorsbackground.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean colorsbackgroundExistsInEs = colorsbackgroundSearchRepository.exists(colorsbackground.getId());
        assertThat(colorsbackgroundExistsInEs).isFalse();

        // Validate the database is empty
        List<Colorsbackground> colorsbackgroundList = colorsbackgroundRepository.findAll();
        assertThat(colorsbackgroundList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchColorsbackground() throws Exception {
        // Initialize the database
        colorsbackgroundRepository.saveAndFlush(colorsbackground);
        colorsbackgroundSearchRepository.save(colorsbackground);

        // Search the colorsbackground
        restColorsbackgroundMockMvc.perform(get("/api/_search/colorsbackgrounds?query=id:" + colorsbackground.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colorsbackground.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colorsbackground.class);
        Colorsbackground colorsbackground1 = new Colorsbackground();
        colorsbackground1.setId(1L);
        Colorsbackground colorsbackground2 = new Colorsbackground();
        colorsbackground2.setId(colorsbackground1.getId());
        assertThat(colorsbackground1).isEqualTo(colorsbackground2);
        colorsbackground2.setId(2L);
        assertThat(colorsbackground1).isNotEqualTo(colorsbackground2);
        colorsbackground1.setId(null);
        assertThat(colorsbackground1).isNotEqualTo(colorsbackground2);
    }
}
