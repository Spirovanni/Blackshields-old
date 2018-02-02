package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Forms;
import com.spirovanni.blackshields.repository.FormsRepository;
import com.spirovanni.blackshields.repository.search.FormsSearchRepository;
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

/**
 * Test class for the FormsResource REST controller.
 *
 * @see FormsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class FormsResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PICTURE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PICTURE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PICTURE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PICTURE_CONTENT_TYPE = "image/png";

    @Autowired
    private FormsRepository formsRepository;

    @Autowired
    private FormsSearchRepository formsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFormsMockMvc;

    private Forms forms;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormsResource formsResource = new FormsResource(formsRepository, formsSearchRepository);
        this.restFormsMockMvc = MockMvcBuilders.standaloneSetup(formsResource)
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
    public static Forms createEntity(EntityManager em) {
        Forms forms = new Forms()
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return forms;
    }

    @Before
    public void initTest() {
        formsSearchRepository.deleteAll();
        forms = createEntity(em);
    }

    @Test
    @Transactional
    public void createForms() throws Exception {
        int databaseSizeBeforeCreate = formsRepository.findAll().size();

        // Create the Forms
        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isCreated());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeCreate + 1);
        Forms testForms = formsList.get(formsList.size() - 1);
        assertThat(testForms.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testForms.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testForms.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testForms.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Forms in Elasticsearch
        Forms formsEs = formsSearchRepository.findOne(testForms.getId());
        assertThat(formsEs).isEqualToIgnoringGivenFields(testForms);
    }

    @Test
    @Transactional
    public void createFormsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formsRepository.findAll().size();

        // Create the Forms with an existing ID
        forms.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isBadRequest());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = formsRepository.findAll().size();
        // set the field null
        forms.setDate(null);

        // Create the Forms, which fails.

        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isBadRequest());

        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = formsRepository.findAll().size();
        // set the field null
        forms.setDescription(null);

        // Create the Forms, which fails.

        restFormsMockMvc.perform(post("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isBadRequest());

        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        // Get all the formsList
        restFormsMockMvc.perform(get("/api/forms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forms.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);

        // Get the forms
        restFormsMockMvc.perform(get("/api/forms/{id}", forms.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(forms.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingForms() throws Exception {
        // Get the forms
        restFormsMockMvc.perform(get("/api/forms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);
        formsSearchRepository.save(forms);
        int databaseSizeBeforeUpdate = formsRepository.findAll().size();

        // Update the forms
        Forms updatedForms = formsRepository.findOne(forms.getId());
        // Disconnect from session so that the updates on updatedForms are not directly saved in db
        em.detach(updatedForms);
        updatedForms
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restFormsMockMvc.perform(put("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedForms)))
            .andExpect(status().isOk());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeUpdate);
        Forms testForms = formsList.get(formsList.size() - 1);
        assertThat(testForms.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testForms.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testForms.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testForms.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Forms in Elasticsearch
        Forms formsEs = formsSearchRepository.findOne(testForms.getId());
        assertThat(formsEs).isEqualToIgnoringGivenFields(testForms);
    }

    @Test
    @Transactional
    public void updateNonExistingForms() throws Exception {
        int databaseSizeBeforeUpdate = formsRepository.findAll().size();

        // Create the Forms

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFormsMockMvc.perform(put("/api/forms")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(forms)))
            .andExpect(status().isCreated());

        // Validate the Forms in the database
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);
        formsSearchRepository.save(forms);
        int databaseSizeBeforeDelete = formsRepository.findAll().size();

        // Get the forms
        restFormsMockMvc.perform(delete("/api/forms/{id}", forms.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean formsExistsInEs = formsSearchRepository.exists(forms.getId());
        assertThat(formsExistsInEs).isFalse();

        // Validate the database is empty
        List<Forms> formsList = formsRepository.findAll();
        assertThat(formsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchForms() throws Exception {
        // Initialize the database
        formsRepository.saveAndFlush(forms);
        formsSearchRepository.save(forms);

        // Search the forms
        restFormsMockMvc.perform(get("/api/_search/forms?query=id:" + forms.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(forms.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Forms.class);
        Forms forms1 = new Forms();
        forms1.setId(1L);
        Forms forms2 = new Forms();
        forms2.setId(forms1.getId());
        assertThat(forms1).isEqualTo(forms2);
        forms2.setId(2L);
        assertThat(forms1).isNotEqualTo(forms2);
        forms1.setId(null);
        assertThat(forms1).isNotEqualTo(forms2);
    }
}
