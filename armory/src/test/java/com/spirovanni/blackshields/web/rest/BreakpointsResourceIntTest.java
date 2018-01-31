package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Breakpoints;
import com.spirovanni.blackshields.repository.BreakpointsRepository;
import com.spirovanni.blackshields.repository.search.BreakpointsSearchRepository;
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
 * Test class for the BreakpointsResource REST controller.
 *
 * @see BreakpointsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class BreakpointsResourceIntTest {

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
    private BreakpointsRepository breakpointsRepository;

    @Autowired
    private BreakpointsSearchRepository breakpointsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBreakpointsMockMvc;

    private Breakpoints breakpoints;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BreakpointsResource breakpointsResource = new BreakpointsResource(breakpointsRepository, breakpointsSearchRepository);
        this.restBreakpointsMockMvc = MockMvcBuilders.standaloneSetup(breakpointsResource)
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
    public static Breakpoints createEntity(EntityManager em) {
        Breakpoints breakpoints = new Breakpoints()
            .date(DEFAULT_DATE)
            .stage(DEFAULT_STAGE)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return breakpoints;
    }

    @Before
    public void initTest() {
        breakpointsSearchRepository.deleteAll();
        breakpoints = createEntity(em);
    }

    @Test
    @Transactional
    public void createBreakpoints() throws Exception {
        int databaseSizeBeforeCreate = breakpointsRepository.findAll().size();

        // Create the Breakpoints
        restBreakpointsMockMvc.perform(post("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isCreated());

        // Validate the Breakpoints in the database
        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeCreate + 1);
        Breakpoints testBreakpoints = breakpointsList.get(breakpointsList.size() - 1);
        assertThat(testBreakpoints.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testBreakpoints.getStage()).isEqualTo(DEFAULT_STAGE);
        assertThat(testBreakpoints.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testBreakpoints.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testBreakpoints.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Breakpoints in Elasticsearch
        Breakpoints breakpointsEs = breakpointsSearchRepository.findOne(testBreakpoints.getId());
        assertThat(breakpointsEs).isEqualToIgnoringGivenFields(testBreakpoints);
    }

    @Test
    @Transactional
    public void createBreakpointsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = breakpointsRepository.findAll().size();

        // Create the Breakpoints with an existing ID
        breakpoints.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBreakpointsMockMvc.perform(post("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isBadRequest());

        // Validate the Breakpoints in the database
        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = breakpointsRepository.findAll().size();
        // set the field null
        breakpoints.setDate(null);

        // Create the Breakpoints, which fails.

        restBreakpointsMockMvc.perform(post("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isBadRequest());

        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStageIsRequired() throws Exception {
        int databaseSizeBeforeTest = breakpointsRepository.findAll().size();
        // set the field null
        breakpoints.setStage(null);

        // Create the Breakpoints, which fails.

        restBreakpointsMockMvc.perform(post("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isBadRequest());

        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = breakpointsRepository.findAll().size();
        // set the field null
        breakpoints.setDescription(null);

        // Create the Breakpoints, which fails.

        restBreakpointsMockMvc.perform(post("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isBadRequest());

        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllBreakpoints() throws Exception {
        // Initialize the database
        breakpointsRepository.saveAndFlush(breakpoints);

        // Get all the breakpointsList
        restBreakpointsMockMvc.perform(get("/api/breakpoints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(breakpoints.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getBreakpoints() throws Exception {
        // Initialize the database
        breakpointsRepository.saveAndFlush(breakpoints);

        // Get the breakpoints
        restBreakpointsMockMvc.perform(get("/api/breakpoints/{id}", breakpoints.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(breakpoints.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.stage").value(DEFAULT_STAGE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingBreakpoints() throws Exception {
        // Get the breakpoints
        restBreakpointsMockMvc.perform(get("/api/breakpoints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBreakpoints() throws Exception {
        // Initialize the database
        breakpointsRepository.saveAndFlush(breakpoints);
        breakpointsSearchRepository.save(breakpoints);
        int databaseSizeBeforeUpdate = breakpointsRepository.findAll().size();

        // Update the breakpoints
        Breakpoints updatedBreakpoints = breakpointsRepository.findOne(breakpoints.getId());
        // Disconnect from session so that the updates on updatedBreakpoints are not directly saved in db
        em.detach(updatedBreakpoints);
        updatedBreakpoints
            .date(UPDATED_DATE)
            .stage(UPDATED_STAGE)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restBreakpointsMockMvc.perform(put("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBreakpoints)))
            .andExpect(status().isOk());

        // Validate the Breakpoints in the database
        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeUpdate);
        Breakpoints testBreakpoints = breakpointsList.get(breakpointsList.size() - 1);
        assertThat(testBreakpoints.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testBreakpoints.getStage()).isEqualTo(UPDATED_STAGE);
        assertThat(testBreakpoints.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testBreakpoints.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testBreakpoints.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Breakpoints in Elasticsearch
        Breakpoints breakpointsEs = breakpointsSearchRepository.findOne(testBreakpoints.getId());
        assertThat(breakpointsEs).isEqualToIgnoringGivenFields(testBreakpoints);
    }

    @Test
    @Transactional
    public void updateNonExistingBreakpoints() throws Exception {
        int databaseSizeBeforeUpdate = breakpointsRepository.findAll().size();

        // Create the Breakpoints

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBreakpointsMockMvc.perform(put("/api/breakpoints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(breakpoints)))
            .andExpect(status().isCreated());

        // Validate the Breakpoints in the database
        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBreakpoints() throws Exception {
        // Initialize the database
        breakpointsRepository.saveAndFlush(breakpoints);
        breakpointsSearchRepository.save(breakpoints);
        int databaseSizeBeforeDelete = breakpointsRepository.findAll().size();

        // Get the breakpoints
        restBreakpointsMockMvc.perform(delete("/api/breakpoints/{id}", breakpoints.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean breakpointsExistsInEs = breakpointsSearchRepository.exists(breakpoints.getId());
        assertThat(breakpointsExistsInEs).isFalse();

        // Validate the database is empty
        List<Breakpoints> breakpointsList = breakpointsRepository.findAll();
        assertThat(breakpointsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchBreakpoints() throws Exception {
        // Initialize the database
        breakpointsRepository.saveAndFlush(breakpoints);
        breakpointsSearchRepository.save(breakpoints);

        // Search the breakpoints
        restBreakpointsMockMvc.perform(get("/api/_search/breakpoints?query=id:" + breakpoints.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(breakpoints.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].stage").value(hasItem(DEFAULT_STAGE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Breakpoints.class);
        Breakpoints breakpoints1 = new Breakpoints();
        breakpoints1.setId(1L);
        Breakpoints breakpoints2 = new Breakpoints();
        breakpoints2.setId(breakpoints1.getId());
        assertThat(breakpoints1).isEqualTo(breakpoints2);
        breakpoints2.setId(2L);
        assertThat(breakpoints1).isNotEqualTo(breakpoints2);
        breakpoints1.setId(null);
        assertThat(breakpoints1).isNotEqualTo(breakpoints2);
    }
}
