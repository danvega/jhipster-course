package com.jhipcon.web.rest;

import com.jhipcon.ConferenceApp;

import com.jhipcon.domain.Speaker;
import com.jhipcon.repository.SpeakerRepository;
import com.jhipcon.web.rest.errors.ExceptionTranslator;

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

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SpeakerResource REST controller.
 *
 * @see SpeakerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConferenceApp.class)
public class SpeakerResourceIntTest {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER = "BBBBBBBBBB";

    private static final String DEFAULT_BIO = "AAAAAAAAAA";
    private static final String UPDATED_BIO = "BBBBBBBBBB";

    @Autowired
    private SpeakerRepository speakerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSpeakerMockMvc;

    private Speaker speaker;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SpeakerResource speakerResource = new SpeakerResource(speakerRepository);
        this.restSpeakerMockMvc = MockMvcBuilders.standaloneSetup(speakerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Speaker createEntity(EntityManager em) {
        Speaker speaker = new Speaker()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .twitter(DEFAULT_TWITTER)
            .bio(DEFAULT_BIO);
        return speaker;
    }

    @Before
    public void initTest() {
        speaker = createEntity(em);
    }

    @Test
    @Transactional
    public void createSpeaker() throws Exception {
        int databaseSizeBeforeCreate = speakerRepository.findAll().size();

        // Create the Speaker
        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isCreated());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeCreate + 1);
        Speaker testSpeaker = speakerList.get(speakerList.size() - 1);
        assertThat(testSpeaker.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testSpeaker.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testSpeaker.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testSpeaker.getTwitter()).isEqualTo(DEFAULT_TWITTER);
        assertThat(testSpeaker.getBio()).isEqualTo(DEFAULT_BIO);
    }

    @Test
    @Transactional
    public void createSpeakerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = speakerRepository.findAll().size();

        // Create the Speaker with an existing ID
        speaker.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setFirstName(null);

        // Create the Speaker, which fails.

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setLastName(null);

        // Create the Speaker, which fails.

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setEmail(null);

        // Create the Speaker, which fails.

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTwitterIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setTwitter(null);

        // Create the Speaker, which fails.

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBioIsRequired() throws Exception {
        int databaseSizeBeforeTest = speakerRepository.findAll().size();
        // set the field null
        speaker.setBio(null);

        // Create the Speaker, which fails.

        restSpeakerMockMvc.perform(post("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isBadRequest());

        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSpeakers() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);

        // Get all the speakerList
        restSpeakerMockMvc.perform(get("/api/speakers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(speaker.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].twitter").value(hasItem(DEFAULT_TWITTER.toString())))
            .andExpect(jsonPath("$.[*].bio").value(hasItem(DEFAULT_BIO.toString())));
    }

    @Test
    @Transactional
    public void getSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);

        // Get the speaker
        restSpeakerMockMvc.perform(get("/api/speakers/{id}", speaker.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(speaker.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.twitter").value(DEFAULT_TWITTER.toString()))
            .andExpect(jsonPath("$.bio").value(DEFAULT_BIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSpeaker() throws Exception {
        // Get the speaker
        restSpeakerMockMvc.perform(get("/api/speakers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);
        int databaseSizeBeforeUpdate = speakerRepository.findAll().size();

        // Update the speaker
        Speaker updatedSpeaker = speakerRepository.findOne(speaker.getId());
        updatedSpeaker
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .twitter(UPDATED_TWITTER)
            .bio(UPDATED_BIO);

        restSpeakerMockMvc.perform(put("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSpeaker)))
            .andExpect(status().isOk());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeUpdate);
        Speaker testSpeaker = speakerList.get(speakerList.size() - 1);
        assertThat(testSpeaker.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testSpeaker.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testSpeaker.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testSpeaker.getTwitter()).isEqualTo(UPDATED_TWITTER);
        assertThat(testSpeaker.getBio()).isEqualTo(UPDATED_BIO);
    }

    @Test
    @Transactional
    public void updateNonExistingSpeaker() throws Exception {
        int databaseSizeBeforeUpdate = speakerRepository.findAll().size();

        // Create the Speaker

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSpeakerMockMvc.perform(put("/api/speakers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(speaker)))
            .andExpect(status().isCreated());

        // Validate the Speaker in the database
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSpeaker() throws Exception {
        // Initialize the database
        speakerRepository.saveAndFlush(speaker);
        int databaseSizeBeforeDelete = speakerRepository.findAll().size();

        // Get the speaker
        restSpeakerMockMvc.perform(delete("/api/speakers/{id}", speaker.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Speaker> speakerList = speakerRepository.findAll();
        assertThat(speakerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Speaker.class);
        Speaker speaker1 = new Speaker();
        speaker1.setId(1L);
        Speaker speaker2 = new Speaker();
        speaker2.setId(speaker1.getId());
        assertThat(speaker1).isEqualTo(speaker2);
        speaker2.setId(2L);
        assertThat(speaker1).isNotEqualTo(speaker2);
        speaker1.setId(null);
        assertThat(speaker1).isNotEqualTo(speaker2);
    }
}
