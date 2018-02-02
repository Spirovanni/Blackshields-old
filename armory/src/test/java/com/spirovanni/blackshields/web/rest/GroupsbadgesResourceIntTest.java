package com.spirovanni.blackshields.web.rest;

import com.spirovanni.blackshields.ArmoryApp;

import com.spirovanni.blackshields.domain.Groupsbadges;
import com.spirovanni.blackshields.repository.GroupsbadgesRepository;
import com.spirovanni.blackshields.repository.search.GroupsbadgesSearchRepository;
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
 * Test class for the GroupsbadgesResource REST controller.
 *
 * @see GroupsbadgesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ArmoryApp.class)
public class GroupsbadgesResourceIntTest {

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
    private GroupsbadgesRepository groupsbadgesRepository;

    @Autowired
    private GroupsbadgesSearchRepository groupsbadgesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGroupsbadgesMockMvc;

    private Groupsbadges groupsbadges;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupsbadgesResource groupsbadgesResource = new GroupsbadgesResource(groupsbadgesRepository, groupsbadgesSearchRepository);
        this.restGroupsbadgesMockMvc = MockMvcBuilders.standaloneSetup(groupsbadgesResource)
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
    public static Groupsbadges createEntity(EntityManager em) {
        Groupsbadges groupsbadges = new Groupsbadges()
            .date(DEFAULT_DATE)
            .status(DEFAULT_STATUS)
            .description(DEFAULT_DESCRIPTION)
            .picture(DEFAULT_PICTURE)
            .pictureContentType(DEFAULT_PICTURE_CONTENT_TYPE);
        return groupsbadges;
    }

    @Before
    public void initTest() {
        groupsbadgesSearchRepository.deleteAll();
        groupsbadges = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupsbadges() throws Exception {
        int databaseSizeBeforeCreate = groupsbadgesRepository.findAll().size();

        // Create the Groupsbadges
        restGroupsbadgesMockMvc.perform(post("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isCreated());

        // Validate the Groupsbadges in the database
        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeCreate + 1);
        Groupsbadges testGroupsbadges = groupsbadgesList.get(groupsbadgesList.size() - 1);
        assertThat(testGroupsbadges.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testGroupsbadges.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testGroupsbadges.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGroupsbadges.getPicture()).isEqualTo(DEFAULT_PICTURE);
        assertThat(testGroupsbadges.getPictureContentType()).isEqualTo(DEFAULT_PICTURE_CONTENT_TYPE);

        // Validate the Groupsbadges in Elasticsearch
        Groupsbadges groupsbadgesEs = groupsbadgesSearchRepository.findOne(testGroupsbadges.getId());
        assertThat(groupsbadgesEs).isEqualToIgnoringGivenFields(testGroupsbadges);
    }

    @Test
    @Transactional
    public void createGroupsbadgesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupsbadgesRepository.findAll().size();

        // Create the Groupsbadges with an existing ID
        groupsbadges.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupsbadgesMockMvc.perform(post("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isBadRequest());

        // Validate the Groupsbadges in the database
        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupsbadgesRepository.findAll().size();
        // set the field null
        groupsbadges.setDate(null);

        // Create the Groupsbadges, which fails.

        restGroupsbadgesMockMvc.perform(post("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isBadRequest());

        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupsbadgesRepository.findAll().size();
        // set the field null
        groupsbadges.setStatus(null);

        // Create the Groupsbadges, which fails.

        restGroupsbadgesMockMvc.perform(post("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isBadRequest());

        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupsbadgesRepository.findAll().size();
        // set the field null
        groupsbadges.setDescription(null);

        // Create the Groupsbadges, which fails.

        restGroupsbadgesMockMvc.perform(post("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isBadRequest());

        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGroupsbadges() throws Exception {
        // Initialize the database
        groupsbadgesRepository.saveAndFlush(groupsbadges);

        // Get all the groupsbadgesList
        restGroupsbadgesMockMvc.perform(get("/api/groupsbadges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupsbadges.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void getGroupsbadges() throws Exception {
        // Initialize the database
        groupsbadgesRepository.saveAndFlush(groupsbadges);

        // Get the groupsbadges
        restGroupsbadgesMockMvc.perform(get("/api/groupsbadges/{id}", groupsbadges.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupsbadges.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pictureContentType").value(DEFAULT_PICTURE_CONTENT_TYPE))
            .andExpect(jsonPath("$.picture").value(Base64Utils.encodeToString(DEFAULT_PICTURE)));
    }

    @Test
    @Transactional
    public void getNonExistingGroupsbadges() throws Exception {
        // Get the groupsbadges
        restGroupsbadgesMockMvc.perform(get("/api/groupsbadges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupsbadges() throws Exception {
        // Initialize the database
        groupsbadgesRepository.saveAndFlush(groupsbadges);
        groupsbadgesSearchRepository.save(groupsbadges);
        int databaseSizeBeforeUpdate = groupsbadgesRepository.findAll().size();

        // Update the groupsbadges
        Groupsbadges updatedGroupsbadges = groupsbadgesRepository.findOne(groupsbadges.getId());
        // Disconnect from session so that the updates on updatedGroupsbadges are not directly saved in db
        em.detach(updatedGroupsbadges);
        updatedGroupsbadges
            .date(UPDATED_DATE)
            .status(UPDATED_STATUS)
            .description(UPDATED_DESCRIPTION)
            .picture(UPDATED_PICTURE)
            .pictureContentType(UPDATED_PICTURE_CONTENT_TYPE);

        restGroupsbadgesMockMvc.perform(put("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupsbadges)))
            .andExpect(status().isOk());

        // Validate the Groupsbadges in the database
        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeUpdate);
        Groupsbadges testGroupsbadges = groupsbadgesList.get(groupsbadgesList.size() - 1);
        assertThat(testGroupsbadges.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testGroupsbadges.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testGroupsbadges.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGroupsbadges.getPicture()).isEqualTo(UPDATED_PICTURE);
        assertThat(testGroupsbadges.getPictureContentType()).isEqualTo(UPDATED_PICTURE_CONTENT_TYPE);

        // Validate the Groupsbadges in Elasticsearch
        Groupsbadges groupsbadgesEs = groupsbadgesSearchRepository.findOne(testGroupsbadges.getId());
        assertThat(groupsbadgesEs).isEqualToIgnoringGivenFields(testGroupsbadges);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupsbadges() throws Exception {
        int databaseSizeBeforeUpdate = groupsbadgesRepository.findAll().size();

        // Create the Groupsbadges

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGroupsbadgesMockMvc.perform(put("/api/groupsbadges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupsbadges)))
            .andExpect(status().isCreated());

        // Validate the Groupsbadges in the database
        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGroupsbadges() throws Exception {
        // Initialize the database
        groupsbadgesRepository.saveAndFlush(groupsbadges);
        groupsbadgesSearchRepository.save(groupsbadges);
        int databaseSizeBeforeDelete = groupsbadgesRepository.findAll().size();

        // Get the groupsbadges
        restGroupsbadgesMockMvc.perform(delete("/api/groupsbadges/{id}", groupsbadges.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean groupsbadgesExistsInEs = groupsbadgesSearchRepository.exists(groupsbadges.getId());
        assertThat(groupsbadgesExistsInEs).isFalse();

        // Validate the database is empty
        List<Groupsbadges> groupsbadgesList = groupsbadgesRepository.findAll();
        assertThat(groupsbadgesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGroupsbadges() throws Exception {
        // Initialize the database
        groupsbadgesRepository.saveAndFlush(groupsbadges);
        groupsbadgesSearchRepository.save(groupsbadges);

        // Search the groupsbadges
        restGroupsbadgesMockMvc.perform(get("/api/_search/groupsbadges?query=id:" + groupsbadges.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupsbadges.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pictureContentType").value(hasItem(DEFAULT_PICTURE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].picture").value(hasItem(Base64Utils.encodeToString(DEFAULT_PICTURE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Groupsbadges.class);
        Groupsbadges groupsbadges1 = new Groupsbadges();
        groupsbadges1.setId(1L);
        Groupsbadges groupsbadges2 = new Groupsbadges();
        groupsbadges2.setId(groupsbadges1.getId());
        assertThat(groupsbadges1).isEqualTo(groupsbadges2);
        groupsbadges2.setId(2L);
        assertThat(groupsbadges1).isNotEqualTo(groupsbadges2);
        groupsbadges1.setId(null);
        assertThat(groupsbadges1).isNotEqualTo(groupsbadges2);
    }
}
