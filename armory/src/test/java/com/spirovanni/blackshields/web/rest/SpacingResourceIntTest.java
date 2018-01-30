package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Spacing;
import com.spirovanni.blackshields.repository.SpacingRepository;
import com.spirovanni.blackshields.repository.search.SpacingSearchRepository;
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
 * Test class for the SpacingResource REST controller.
 *
 * @see SpacingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class SpacingResourceIntTest {

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
    private SpacingRepository spacingRepository;

    @Autowired
    private SpacingSearchRepository spacingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSpacingMockMvc;

    private Spacing spacing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpacingResource spacingResource = new SpacingResource(spacingRepository, spacingSearchRepository);
        this.restSpacingMockMvc = MockMvcBuilders.standaloneSetup(spacingResource)
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
    public static Spacing createEntity(EntityManager em) {
        Spacing spacing = new Spacing()
            .date(DEFAULT_DATE)
            .stage(DEFAULT_STAGE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return spacing;
    }

    @Before
    public void initTest() {
        spacingSearchRepository.deleteAll();
        spacing = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpacing() throws Exception {
        int databaseSizeBeforeCreate = spacingRepository.findAll().size();

        // Create the Spacing
        restSpacingMockMvc.perform(post("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isCreated());

        // Validate the Spacing in the database
        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeCreate + 1);
        Spacing testSpacing = spacingList.get(spacingList.size() - 1);
        assertThat(testSpacing.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSpacing.getStage()).isEqualTo(DEFAULT_STAGE);
        assertThat(testSpacing.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSpacing.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testSpacing.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Spacing in Elasticsearch
        Spacing spacingEs = spacingSearchRepository.findOne(testSpacing.getId());
        assertThat(spacingEs).isEqualToIgnoringGivenFields(testSpacing);
    }

    @Test
    @Transactional
    public void createSpacingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = spacingRepository.findAll().size();

        // Create the Spacing with an existing ID
        spacing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpacingMockMvc.perform(post("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isBadRequest());

        // Validate the Spacing in the database
        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = spacingRepository.findAll().size();
        // set the field null
        spacing.setDate(null);

        // Create the Spacing, which fails.

        restSpacingMockMvc.perform(post("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isBadRequest());

        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStageIsRequired() throws Exception {
        int databaseSizeBeforeTest = spacingRepository.findAll().size();
        // set the field null
        spacing.setStage(null);

        // Create the Spacing, which fails.

        restSpacingMockMvc.perform(post("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isBadRequest());

        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = spacingRepository.findAll().size();
        // set the field null
        spacing.setDescription(null);

        // Create the Spacing, which fails.

        restSpacingMockMvc.perform(post("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isBadRequest());

        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpacings() throws Exception {
        // Initialize the database
        spacingRepository.saveAndFlush(spacing);

        // Get all the spacingList
        restSpacingMockMvc.perform(get("/api/spacings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spacing.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getSpacing() throws Exception {
        // Initialize the database
        spacingRepository.saveAndFlush(spacing);

        // Get the spacing
        restSpacingMockMvc.perform(get("/api/spacings/{id}", spacing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(spacing.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.stage").value(DEFAULT_STAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingSpacing() throws Exception {
        // Get the spacing
        restSpacingMockMvc.perform(get("/api/spacings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpacing() throws Exception {
        // Initialize the database
        spacingRepository.saveAndFlush(spacing);
        spacingSearchRepository.save(spacing);
        int databaseSizeBeforeUpdate = spacingRepository.findAll().size();

        // Update the spacing
        Spacing updatedSpacing = spacingRepository.findOne(spacing.getId());
        // Disconnect from session so that the updates on updatedSpacing are not directly saved in db
        em.detach(updatedSpacing);
        updatedSpacing
            .date(UPDATED_DATE)
            .stage(UPDATED_STAGE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restSpacingMockMvc.perform(put("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpacing)))
            .andExpect(status().isOk());

        // Validate the Spacing in the database
        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeUpdate);
        Spacing testSpacing = spacingList.get(spacingList.size() - 1);
        assertThat(testSpacing.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSpacing.getStage()).isEqualTo(UPDATED_STAGE);
        assertThat(testSpacing.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSpacing.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testSpacing.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Spacing in Elasticsearch
        Spacing spacingEs = spacingSearchRepository.findOne(testSpacing.getId());
        assertThat(spacingEs).isEqualToIgnoringGivenFields(testSpacing);
    }

    @Test
    @Transactional
    public void updateNonExistingSpacing() throws Exception {
        int databaseSizeBeforeUpdate = spacingRepository.findAll().size();

        // Create the Spacing

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSpacingMockMvc.perform(put("/api/spacings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(spacing)))
            .andExpect(status().isCreated());

        // Validate the Spacing in the database
        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSpacing() throws Exception {
        // Initialize the database
        spacingRepository.saveAndFlush(spacing);
        spacingSearchRepository.save(spacing);
        int databaseSizeBeforeDelete = spacingRepository.findAll().size();

        // Get the spacing
        restSpacingMockMvc.perform(delete("/api/spacings/{id}", spacing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean spacingExistsInEs = spacingSearchRepository.exists(spacing.getId());
        assertThat(spacingExistsInEs).isFalse();

        // Validate the database is empty
        List<Spacing> spacingList = spacingRepository.findAll();
        assertThat(spacingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSpacing() throws Exception {
        // Initialize the database
        spacingRepository.saveAndFlush(spacing);
        spacingSearchRepository.save(spacing);

        // Search the spacing
        restSpacingMockMvc.perform(get("/api/_search/spacings?query=id:" + spacing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(spacing.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Spacing.class);
        Spacing spacing1 = new Spacing();
        spacing1.setId(1L);
        Spacing spacing2 = new Spacing();
        spacing2.setId(spacing1.getId());
        assertThat(spacing1).isEqualTo(spacing2);
        spacing2.setId(2L);
        assertThat(spacing1).isNotEqualTo(spacing2);
        spacing1.setId(null);
        assertThat(spacing1).isNotEqualTo(spacing2);
    }
}
