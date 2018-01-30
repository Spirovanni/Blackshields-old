package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Floatsposition;
import com.spirovanni.blackshields.repository.FloatspositionRepository;
import com.spirovanni.blackshields.repository.search.FloatspositionSearchRepository;
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
 * Test class for the FloatspositionResource REST controller.
 *
 * @see FloatspositionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class FloatspositionResourceIntTest {

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
    private FloatspositionRepository floatspositionRepository;

    @Autowired
    private FloatspositionSearchRepository floatspositionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFloatspositionMockMvc;

    private Floatsposition floatsposition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FloatspositionResource floatspositionResource = new FloatspositionResource(floatspositionRepository, floatspositionSearchRepository);
        this.restFloatspositionMockMvc = MockMvcBuilders.standaloneSetup(floatspositionResource)
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
    public static Floatsposition createEntity(EntityManager em) {
        Floatsposition floatsposition = new Floatsposition()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return floatsposition;
    }

    @Before
    public void initTest() {
        floatspositionSearchRepository.deleteAll();
        floatsposition = createEntity(em);
    }

    @Test
    @Transactional
    public void createFloatsposition() throws Exception {
        int databaseSizeBeforeCreate = floatspositionRepository.findAll().size();

        // Create the Floatsposition
        restFloatspositionMockMvc.perform(post("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isCreated());

        // Validate the Floatsposition in the database
        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeCreate + 1);
        Floatsposition testFloatsposition = floatspositionList.get(floatspositionList.size() - 1);
        assertThat(testFloatsposition.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testFloatsposition.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFloatsposition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFloatsposition.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testFloatsposition.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Floatsposition in Elasticsearch
        Floatsposition floatspositionEs = floatspositionSearchRepository.findOne(testFloatsposition.getId());
        assertThat(floatspositionEs).isEqualToIgnoringGivenFields(testFloatsposition);
    }

    @Test
    @Transactional
    public void createFloatspositionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = floatspositionRepository.findAll().size();

        // Create the Floatsposition with an existing ID
        floatsposition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFloatspositionMockMvc.perform(post("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isBadRequest());

        // Validate the Floatsposition in the database
        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = floatspositionRepository.findAll().size();
        // set the field null
        floatsposition.setDate(null);

        // Create the Floatsposition, which fails.

        restFloatspositionMockMvc.perform(post("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isBadRequest());

        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = floatspositionRepository.findAll().size();
        // set the field null
        floatsposition.setStatus(null);

        // Create the Floatsposition, which fails.

        restFloatspositionMockMvc.perform(post("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isBadRequest());

        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = floatspositionRepository.findAll().size();
        // set the field null
        floatsposition.setDescription(null);

        // Create the Floatsposition, which fails.

        restFloatspositionMockMvc.perform(post("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isBadRequest());

        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFloatspositions() throws Exception {
        // Initialize the database
        floatspositionRepository.saveAndFlush(floatsposition);

        // Get all the floatspositionList
        restFloatspositionMockMvc.perform(get("/api/floatspositions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(floatsposition.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getFloatsposition() throws Exception {
        // Initialize the database
        floatspositionRepository.saveAndFlush(floatsposition);

        // Get the floatsposition
        restFloatspositionMockMvc.perform(get("/api/floatspositions/{id}", floatsposition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(floatsposition.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingFloatsposition() throws Exception {
        // Get the floatsposition
        restFloatspositionMockMvc.perform(get("/api/floatspositions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFloatsposition() throws Exception {
        // Initialize the database
        floatspositionRepository.saveAndFlush(floatsposition);
        floatspositionSearchRepository.save(floatsposition);
        int databaseSizeBeforeUpdate = floatspositionRepository.findAll().size();

        // Update the floatsposition
        Floatsposition updatedFloatsposition = floatspositionRepository.findOne(floatsposition.getId());
        // Disconnect from session so that the updates on updatedFloatsposition are not directly saved in db
        em.detach(updatedFloatsposition);
        updatedFloatsposition
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restFloatspositionMockMvc.perform(put("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFloatsposition)))
            .andExpect(status().isOk());

        // Validate the Floatsposition in the database
        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeUpdate);
        Floatsposition testFloatsposition = floatspositionList.get(floatspositionList.size() - 1);
        assertThat(testFloatsposition.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testFloatsposition.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFloatsposition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFloatsposition.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testFloatsposition.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Floatsposition in Elasticsearch
        Floatsposition floatspositionEs = floatspositionSearchRepository.findOne(testFloatsposition.getId());
        assertThat(floatspositionEs).isEqualToIgnoringGivenFields(testFloatsposition);
    }

    @Test
    @Transactional
    public void updateNonExistingFloatsposition() throws Exception {
        int databaseSizeBeforeUpdate = floatspositionRepository.findAll().size();

        // Create the Floatsposition

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFloatspositionMockMvc.perform(put("/api/floatspositions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(floatsposition)))
            .andExpect(status().isCreated());

        // Validate the Floatsposition in the database
        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFloatsposition() throws Exception {
        // Initialize the database
        floatspositionRepository.saveAndFlush(floatsposition);
        floatspositionSearchRepository.save(floatsposition);
        int databaseSizeBeforeDelete = floatspositionRepository.findAll().size();

        // Get the floatsposition
        restFloatspositionMockMvc.perform(delete("/api/floatspositions/{id}", floatsposition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean floatspositionExistsInEs = floatspositionSearchRepository.exists(floatsposition.getId());
        assertThat(floatspositionExistsInEs).isFalse();

        // Validate the database is empty
        List<Floatsposition> floatspositionList = floatspositionRepository.findAll();
        assertThat(floatspositionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFloatsposition() throws Exception {
        // Initialize the database
        floatspositionRepository.saveAndFlush(floatsposition);
        floatspositionSearchRepository.save(floatsposition);

        // Search the floatsposition
        restFloatspositionMockMvc.perform(get("/api/_search/floatspositions?query=id:" + floatsposition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(floatsposition.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Floatsposition.class);
        Floatsposition floatsposition1 = new Floatsposition();
        floatsposition1.setId(1L);
        Floatsposition floatsposition2 = new Floatsposition();
        floatsposition2.setId(floatsposition1.getId());
        assertThat(floatsposition1).isEqualTo(floatsposition2);
        floatsposition2.setId(2L);
        assertThat(floatsposition1).isNotEqualTo(floatsposition2);
        floatsposition1.setId(null);
        assertThat(floatsposition1).isNotEqualTo(floatsposition2);
    }
}
