package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Buttons;
import com.spirovanni.blackshields.repository.ButtonsRepository;
import com.spirovanni.blackshields.repository.search.ButtonsSearchRepository;
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
 * Test class for the ButtonsResource REST controller.
 *
 * @see ButtonsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class ButtonsResourceIntTest {

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
    private ButtonsRepository buttonsRepository;

    @Autowired
    private ButtonsSearchRepository buttonsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restButtonsMockMvc;

    private Buttons buttons;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ButtonsResource buttonsResource = new ButtonsResource(buttonsRepository, buttonsSearchRepository);
        this.restButtonsMockMvc = MockMvcBuilders.standaloneSetup(buttonsResource)
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
    public static Buttons createEntity(EntityManager em) {
        Buttons buttons = new Buttons()
            .date(DEFAULT_DATE)
            .stage(DEFAULT_STAGE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return buttons;
    }

    @Before
    public void initTest() {
        buttonsSearchRepository.deleteAll();
        buttons = createEntity(em);
    }

    @Test
    @Transactional
    public void createButtons() throws Exception {
        int databaseSizeBeforeCreate = buttonsRepository.findAll().size();

        // Create the Buttons
        restButtonsMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isCreated());

        // Validate the Buttons in the database
        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeCreate + 1);
        Buttons testButtons = buttonsList.get(buttonsList.size() - 1);
        assertThat(testButtons.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testButtons.getStage()).isEqualTo(DEFAULT_STAGE);
        assertThat(testButtons.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testButtons.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testButtons.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Buttons in Elasticsearch
        Buttons buttonsEs = buttonsSearchRepository.findOne(testButtons.getId());
        assertThat(buttonsEs).isEqualToIgnoringGivenFields(testButtons);
    }

    @Test
    @Transactional
    public void createButtonsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = buttonsRepository.findAll().size();

        // Create the Buttons with an existing ID
        buttons.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restButtonsMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isBadRequest());

        // Validate the Buttons in the database
        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = buttonsRepository.findAll().size();
        // set the field null
        buttons.setDate(null);

        // Create the Buttons, which fails.

        restButtonsMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isBadRequest());

        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStageIsRequired() throws Exception {
        int databaseSizeBeforeTest = buttonsRepository.findAll().size();
        // set the field null
        buttons.setStage(null);

        // Create the Buttons, which fails.

        restButtonsMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isBadRequest());

        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = buttonsRepository.findAll().size();
        // set the field null
        buttons.setDescription(null);

        // Create the Buttons, which fails.

        restButtonsMockMvc.perform(post("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isBadRequest());

        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllButtons() throws Exception {
        // Initialize the database
        buttonsRepository.saveAndFlush(buttons);

        // Get all the buttonsList
        restButtonsMockMvc.perform(get("/api/buttons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buttons.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getButtons() throws Exception {
        // Initialize the database
        buttonsRepository.saveAndFlush(buttons);

        // Get the buttons
        restButtonsMockMvc.perform(get("/api/buttons/{id}", buttons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(buttons.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.stage").value(DEFAULT_STAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingButtons() throws Exception {
        // Get the buttons
        restButtonsMockMvc.perform(get("/api/buttons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateButtons() throws Exception {
        // Initialize the database
        buttonsRepository.saveAndFlush(buttons);
        buttonsSearchRepository.save(buttons);
        int databaseSizeBeforeUpdate = buttonsRepository.findAll().size();

        // Update the buttons
        Buttons updatedButtons = buttonsRepository.findOne(buttons.getId());
        // Disconnect from session so that the updates on updatedButtons are not directly saved in db
        em.detach(updatedButtons);
        updatedButtons
            .date(UPDATED_DATE)
            .stage(UPDATED_STAGE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restButtonsMockMvc.perform(put("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedButtons)))
            .andExpect(status().isOk());

        // Validate the Buttons in the database
        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeUpdate);
        Buttons testButtons = buttonsList.get(buttonsList.size() - 1);
        assertThat(testButtons.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testButtons.getStage()).isEqualTo(UPDATED_STAGE);
        assertThat(testButtons.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testButtons.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testButtons.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Buttons in Elasticsearch
        Buttons buttonsEs = buttonsSearchRepository.findOne(testButtons.getId());
        assertThat(buttonsEs).isEqualToIgnoringGivenFields(testButtons);
    }

    @Test
    @Transactional
    public void updateNonExistingButtons() throws Exception {
        int databaseSizeBeforeUpdate = buttonsRepository.findAll().size();

        // Create the Buttons

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restButtonsMockMvc.perform(put("/api/buttons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(buttons)))
            .andExpect(status().isCreated());

        // Validate the Buttons in the database
        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteButtons() throws Exception {
        // Initialize the database
        buttonsRepository.saveAndFlush(buttons);
        buttonsSearchRepository.save(buttons);
        int databaseSizeBeforeDelete = buttonsRepository.findAll().size();

        // Get the buttons
        restButtonsMockMvc.perform(delete("/api/buttons/{id}", buttons.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean buttonsExistsInEs = buttonsSearchRepository.exists(buttons.getId());
        assertThat(buttonsExistsInEs).isFalse();

        // Validate the database is empty
        List<Buttons> buttonsList = buttonsRepository.findAll();
        assertThat(buttonsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchButtons() throws Exception {
        // Initialize the database
        buttonsRepository.saveAndFlush(buttons);
        buttonsSearchRepository.save(buttons);

        // Search the buttons
        restButtonsMockMvc.perform(get("/api/_search/buttons?query=id:" + buttons.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(buttons.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Buttons.class);
        Buttons buttons1 = new Buttons();
        buttons1.setId(1L);
        Buttons buttons2 = new Buttons();
        buttons2.setId(buttons1.getId());
        assertThat(buttons1).isEqualTo(buttons2);
        buttons2.setId(2L);
        assertThat(buttons1).isNotEqualTo(buttons2);
        buttons1.setId(null);
        assertThat(buttons1).isNotEqualTo(buttons2);
    }
}
