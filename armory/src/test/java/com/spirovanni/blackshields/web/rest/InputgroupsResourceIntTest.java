package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Inputgroups;
import com.spirovanni.blackshields.repository.InputgroupsRepository;
import com.spirovanni.blackshields.repository.search.InputgroupsSearchRepository;
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
 * Test class for the InputgroupsResource REST controller.
 *
 * @see InputgroupsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class InputgroupsResourceIntTest {

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
    private InputgroupsRepository inputgroupsRepository;

    @Autowired
    private InputgroupsSearchRepository inputgroupsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInputgroupsMockMvc;

    private Inputgroups inputgroups;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InputgroupsResource inputgroupsResource = new InputgroupsResource(inputgroupsRepository, inputgroupsSearchRepository);
        this.restInputgroupsMockMvc = MockMvcBuilders.standaloneSetup(inputgroupsResource)
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
    public static Inputgroups createEntity(EntityManager em) {
        Inputgroups inputgroups = new Inputgroups()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return inputgroups;
    }

    @Before
    public void initTest() {
        inputgroupsSearchRepository.deleteAll();
        inputgroups = createEntity(em);
    }

    @Test
    @Transactional
    public void createInputgroups() throws Exception {
        int databaseSizeBeforeCreate = inputgroupsRepository.findAll().size();

        // Create the Inputgroups
        restInputgroupsMockMvc.perform(post("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isCreated());

        // Validate the Inputgroups in the database
        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeCreate + 1);
        Inputgroups testInputgroups = inputgroupsList.get(inputgroupsList.size() - 1);
        assertThat(testInputgroups.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testInputgroups.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testInputgroups.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testInputgroups.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testInputgroups.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Inputgroups in Elasticsearch
        Inputgroups inputgroupsEs = inputgroupsSearchRepository.findOne(testInputgroups.getId());
        assertThat(inputgroupsEs).isEqualToIgnoringGivenFields(testInputgroups);
    }

    @Test
    @Transactional
    public void createInputgroupsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inputgroupsRepository.findAll().size();

        // Create the Inputgroups with an existing ID
        inputgroups.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInputgroupsMockMvc.perform(post("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isBadRequest());

        // Validate the Inputgroups in the database
        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = inputgroupsRepository.findAll().size();
        // set the field null
        inputgroups.setDate(null);

        // Create the Inputgroups, which fails.

        restInputgroupsMockMvc.perform(post("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isBadRequest());

        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = inputgroupsRepository.findAll().size();
        // set the field null
        inputgroups.setStatus(null);

        // Create the Inputgroups, which fails.

        restInputgroupsMockMvc.perform(post("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isBadRequest());

        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = inputgroupsRepository.findAll().size();
        // set the field null
        inputgroups.setDescription(null);

        // Create the Inputgroups, which fails.

        restInputgroupsMockMvc.perform(post("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isBadRequest());

        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInputgroups() throws Exception {
        // Initialize the database
        inputgroupsRepository.saveAndFlush(inputgroups);

        // Get all the inputgroupsList
        restInputgroupsMockMvc.perform(get("/api/inputgroups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inputgroups.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getInputgroups() throws Exception {
        // Initialize the database
        inputgroupsRepository.saveAndFlush(inputgroups);

        // Get the inputgroups
        restInputgroupsMockMvc.perform(get("/api/inputgroups/{id}", inputgroups.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inputgroups.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingInputgroups() throws Exception {
        // Get the inputgroups
        restInputgroupsMockMvc.perform(get("/api/inputgroups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInputgroups() throws Exception {
        // Initialize the database
        inputgroupsRepository.saveAndFlush(inputgroups);
        inputgroupsSearchRepository.save(inputgroups);
        int databaseSizeBeforeUpdate = inputgroupsRepository.findAll().size();

        // Update the inputgroups
        Inputgroups updatedInputgroups = inputgroupsRepository.findOne(inputgroups.getId());
        // Disconnect from session so that the updates on updatedInputgroups are not directly saved in db
        em.detach(updatedInputgroups);
        updatedInputgroups
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restInputgroupsMockMvc.perform(put("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInputgroups)))
            .andExpect(status().isOk());

        // Validate the Inputgroups in the database
        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeUpdate);
        Inputgroups testInputgroups = inputgroupsList.get(inputgroupsList.size() - 1);
        assertThat(testInputgroups.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testInputgroups.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testInputgroups.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testInputgroups.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testInputgroups.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Inputgroups in Elasticsearch
        Inputgroups inputgroupsEs = inputgroupsSearchRepository.findOne(testInputgroups.getId());
        assertThat(inputgroupsEs).isEqualToIgnoringGivenFields(testInputgroups);
    }

    @Test
    @Transactional
    public void updateNonExistingInputgroups() throws Exception {
        int databaseSizeBeforeUpdate = inputgroupsRepository.findAll().size();

        // Create the Inputgroups

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInputgroupsMockMvc.perform(put("/api/inputgroups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inputgroups)))
            .andExpect(status().isCreated());

        // Validate the Inputgroups in the database
        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInputgroups() throws Exception {
        // Initialize the database
        inputgroupsRepository.saveAndFlush(inputgroups);
        inputgroupsSearchRepository.save(inputgroups);
        int databaseSizeBeforeDelete = inputgroupsRepository.findAll().size();

        // Get the inputgroups
        restInputgroupsMockMvc.perform(delete("/api/inputgroups/{id}", inputgroups.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean inputgroupsExistsInEs = inputgroupsSearchRepository.exists(inputgroups.getId());
        assertThat(inputgroupsExistsInEs).isFalse();

        // Validate the database is empty
        List<Inputgroups> inputgroupsList = inputgroupsRepository.findAll();
        assertThat(inputgroupsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchInputgroups() throws Exception {
        // Initialize the database
        inputgroupsRepository.saveAndFlush(inputgroups);
        inputgroupsSearchRepository.save(inputgroups);

        // Search the inputgroups
        restInputgroupsMockMvc.perform(get("/api/_search/inputgroups?query=id:" + inputgroups.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inputgroups.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inputgroups.class);
        Inputgroups inputgroups1 = new Inputgroups();
        inputgroups1.setId(1L);
        Inputgroups inputgroups2 = new Inputgroups();
        inputgroups2.setId(inputgroups1.getId());
        assertThat(inputgroups1).isEqualTo(inputgroups2);
        inputgroups2.setId(2L);
        assertThat(inputgroups1).isNotEqualTo(inputgroups2);
        inputgroups1.setId(null);
        assertThat(inputgroups1).isNotEqualTo(inputgroups2);
    }
}
