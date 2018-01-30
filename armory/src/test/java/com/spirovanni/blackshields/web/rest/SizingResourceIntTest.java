package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Sizing;
import com.spirovanni.blackshields.repository.SizingRepository;
import com.spirovanni.blackshields.repository.search.SizingSearchRepository;
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
 * Test class for the SizingResource REST controller.
 *
 * @see SizingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class SizingResourceIntTest {

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
    private SizingRepository sizingRepository;

    @Autowired
    private SizingSearchRepository sizingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSizingMockMvc;

    private Sizing sizing;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SizingResource sizingResource = new SizingResource(sizingRepository, sizingSearchRepository);
        this.restSizingMockMvc = MockMvcBuilders.standaloneSetup(sizingResource)
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
    public static Sizing createEntity(EntityManager em) {
        Sizing sizing = new Sizing()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return sizing;
    }

    @Before
    public void initTest() {
        sizingSearchRepository.deleteAll();
        sizing = createEntity(em);
    }

    @Test
    @Transactional
    public void createSizing() throws Exception {
        int databaseSizeBeforeCreate = sizingRepository.findAll().size();

        // Create the Sizing
        restSizingMockMvc.perform(post("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isCreated());

        // Validate the Sizing in the database
        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeCreate + 1);
        Sizing testSizing = sizingList.get(sizingList.size() - 1);
        assertThat(testSizing.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSizing.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testSizing.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testSizing.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testSizing.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Sizing in Elasticsearch
        Sizing sizingEs = sizingSearchRepository.findOne(testSizing.getId());
        assertThat(sizingEs).isEqualToIgnoringGivenFields(testSizing);
    }

    @Test
    @Transactional
    public void createSizingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sizingRepository.findAll().size();

        // Create the Sizing with an existing ID
        sizing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSizingMockMvc.perform(post("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isBadRequest());

        // Validate the Sizing in the database
        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = sizingRepository.findAll().size();
        // set the field null
        sizing.setDate(null);

        // Create the Sizing, which fails.

        restSizingMockMvc.perform(post("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isBadRequest());

        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = sizingRepository.findAll().size();
        // set the field null
        sizing.setStatus(null);

        // Create the Sizing, which fails.

        restSizingMockMvc.perform(post("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isBadRequest());

        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = sizingRepository.findAll().size();
        // set the field null
        sizing.setDescription(null);

        // Create the Sizing, which fails.

        restSizingMockMvc.perform(post("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isBadRequest());

        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSizings() throws Exception {
        // Initialize the database
        sizingRepository.saveAndFlush(sizing);

        // Get all the sizingList
        restSizingMockMvc.perform(get("/api/sizings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sizing.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getSizing() throws Exception {
        // Initialize the database
        sizingRepository.saveAndFlush(sizing);

        // Get the sizing
        restSizingMockMvc.perform(get("/api/sizings/{id}", sizing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sizing.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingSizing() throws Exception {
        // Get the sizing
        restSizingMockMvc.perform(get("/api/sizings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSizing() throws Exception {
        // Initialize the database
        sizingRepository.saveAndFlush(sizing);
        sizingSearchRepository.save(sizing);
        int databaseSizeBeforeUpdate = sizingRepository.findAll().size();

        // Update the sizing
        Sizing updatedSizing = sizingRepository.findOne(sizing.getId());
        // Disconnect from session so that the updates on updatedSizing are not directly saved in db
        em.detach(updatedSizing);
        updatedSizing
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restSizingMockMvc.perform(put("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSizing)))
            .andExpect(status().isOk());

        // Validate the Sizing in the database
        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeUpdate);
        Sizing testSizing = sizingList.get(sizingList.size() - 1);
        assertThat(testSizing.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSizing.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testSizing.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testSizing.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testSizing.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Sizing in Elasticsearch
        Sizing sizingEs = sizingSearchRepository.findOne(testSizing.getId());
        assertThat(sizingEs).isEqualToIgnoringGivenFields(testSizing);
    }

    @Test
    @Transactional
    public void updateNonExistingSizing() throws Exception {
        int databaseSizeBeforeUpdate = sizingRepository.findAll().size();

        // Create the Sizing

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSizingMockMvc.perform(put("/api/sizings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sizing)))
            .andExpect(status().isCreated());

        // Validate the Sizing in the database
        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSizing() throws Exception {
        // Initialize the database
        sizingRepository.saveAndFlush(sizing);
        sizingSearchRepository.save(sizing);
        int databaseSizeBeforeDelete = sizingRepository.findAll().size();

        // Get the sizing
        restSizingMockMvc.perform(delete("/api/sizings/{id}", sizing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean sizingExistsInEs = sizingSearchRepository.exists(sizing.getId());
        assertThat(sizingExistsInEs).isFalse();

        // Validate the database is empty
        List<Sizing> sizingList = sizingRepository.findAll();
        assertThat(sizingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSizing() throws Exception {
        // Initialize the database
        sizingRepository.saveAndFlush(sizing);
        sizingSearchRepository.save(sizing);

        // Search the sizing
        restSizingMockMvc.perform(get("/api/_search/sizings?query=id:" + sizing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sizing.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sizing.class);
        Sizing sizing1 = new Sizing();
        sizing1.setId(1L);
        Sizing sizing2 = new Sizing();
        sizing2.setId(sizing1.getId());
        assertThat(sizing1).isEqualTo(sizing2);
        sizing2.setId(2L);
        assertThat(sizing1).isNotEqualTo(sizing2);
        sizing1.setId(null);
        assertThat(sizing1).isNotEqualTo(sizing2);
    }
}
