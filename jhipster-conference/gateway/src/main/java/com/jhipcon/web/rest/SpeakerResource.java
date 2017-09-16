package com.jhipcon.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.jhipcon.domain.Speaker;

import com.jhipcon.repository.SpeakerRepository;
import com.jhipcon.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Speaker.
 */
@RestController
@RequestMapping("/api")
public class SpeakerResource {

    private final Logger log = LoggerFactory.getLogger(SpeakerResource.class);

    private static final String ENTITY_NAME = "speaker";

    private final SpeakerRepository speakerRepository;
    public SpeakerResource(SpeakerRepository speakerRepository) {
        this.speakerRepository = speakerRepository;
    }

    /**
     * POST  /speakers : Create a new speaker.
     *
     * @param speaker the speaker to create
     * @return the ResponseEntity with status 201 (Created) and with body the new speaker, or with status 400 (Bad Request) if the speaker has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/speakers")
    @Timed
    public ResponseEntity<Speaker> createSpeaker(@Valid @RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to save Speaker : {}", speaker);
        if (speaker.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new speaker cannot already have an ID")).body(null);
        }
        Speaker result = speakerRepository.save(speaker);
        return ResponseEntity.created(new URI("/api/speakers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /speakers : Updates an existing speaker.
     *
     * @param speaker the speaker to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated speaker,
     * or with status 400 (Bad Request) if the speaker is not valid,
     * or with status 500 (Internal Server Error) if the speaker couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/speakers")
    @Timed
    public ResponseEntity<Speaker> updateSpeaker(@Valid @RequestBody Speaker speaker) throws URISyntaxException {
        log.debug("REST request to update Speaker : {}", speaker);
        if (speaker.getId() == null) {
            return createSpeaker(speaker);
        }
        Speaker result = speakerRepository.save(speaker);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, speaker.getId().toString()))
            .body(result);
    }

    /**
     * GET  /speakers : get all the speakers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of speakers in body
     */
    @GetMapping("/speakers")
    @Timed
    public List<Speaker> getAllSpeakers() {
        log.debug("REST request to get all Speakers");
        return speakerRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /speakers/:id : get the "id" speaker.
     *
     * @param id the id of the speaker to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the speaker, or with status 404 (Not Found)
     */
    @GetMapping("/speakers/{id}")
    @Timed
    public ResponseEntity<Speaker> getSpeaker(@PathVariable Long id) {
        log.debug("REST request to get Speaker : {}", id);
        Speaker speaker = speakerRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(speaker));
    }

    /**
     * DELETE  /speakers/:id : delete the "id" speaker.
     *
     * @param id the id of the speaker to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/speakers/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpeaker(@PathVariable Long id) {
        log.debug("REST request to delete Speaker : {}", id);
        speakerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
