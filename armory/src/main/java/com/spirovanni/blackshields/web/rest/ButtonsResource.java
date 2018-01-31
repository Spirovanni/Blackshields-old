package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Buttons;

import com.spirovanni.blackshields.repository.ButtonsRepository;
import com.spirovanni.blackshields.repository.search.ButtonsSearchRepository;
import com.spirovanni.blackshields.web.rest.errors.BadRequestAlertException;
import com.spirovanni.blackshields.web.rest.util.HeaderUtil;
import com.spirovanni.blackshields.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Buttons.
 */
@RestController
@RequestMapping("/api")
public class ButtonsResource {

    private final Logger log = LoggerFactory.getLogger(ButtonsResource.class);

    private static final String ENTITY_NAME = "buttons";

    private final ButtonsRepository buttonsRepository;

    private final ButtonsSearchRepository buttonsSearchRepository;

    public ButtonsResource(ButtonsRepository buttonsRepository, ButtonsSearchRepository buttonsSearchRepository) {
        this.buttonsRepository = buttonsRepository;
        this.buttonsSearchRepository = buttonsSearchRepository;
    }

    /**
     * POST  /buttons : Create a new buttons.
     *
     * @param buttons the buttons to create
     * @return the ResponseEntity with status 201 (Created) and with body the new buttons, or with status 400 (Bad Request) if the buttons has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/buttons")
    @Timed
    public ResponseEntity<Buttons> createButtons(@Valid @RequestBody Buttons buttons) throws URISyntaxException {
        log.debug("REST request to save Buttons : {}", buttons);
        if (buttons.getId() != null) {
            throw new BadRequestAlertException("A new buttons cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Buttons result = buttonsRepository.save(buttons);
        buttonsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/buttons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /buttons : Updates an existing buttons.
     *
     * @param buttons the buttons to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated buttons,
     * or with status 400 (Bad Request) if the buttons is not valid,
     * or with status 500 (Internal Server Error) if the buttons couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/buttons")
    @Timed
    public ResponseEntity<Buttons> updateButtons(@Valid @RequestBody Buttons buttons) throws URISyntaxException {
        log.debug("REST request to update Buttons : {}", buttons);
        if (buttons.getId() == null) {
            return createButtons(buttons);
        }
        Buttons result = buttonsRepository.save(buttons);
        buttonsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, buttons.getId().toString()))
            .body(result);
    }

    /**
     * GET  /buttons : get all the buttons.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of buttons in body
     */
    @GetMapping("/buttons")
    @Timed
    public ResponseEntity<List<Buttons>> getAllButtons(Pageable pageable) {
        log.debug("REST request to get a page of Buttons");
        Page<Buttons> page = buttonsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/buttons");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /buttons/:id : get the "id" buttons.
     *
     * @param id the id of the buttons to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the buttons, or with status 404 (Not Found)
     */
    @GetMapping("/buttons/{id}")
    @Timed
    public ResponseEntity<Buttons> getButtons(@PathVariable Long id) {
        log.debug("REST request to get Buttons : {}", id);
        Buttons buttons = buttonsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(buttons));
    }

    /**
     * DELETE  /buttons/:id : delete the "id" buttons.
     *
     * @param id the id of the buttons to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/buttons/{id}")
    @Timed
    public ResponseEntity<Void> deleteButtons(@PathVariable Long id) {
        log.debug("REST request to delete Buttons : {}", id);
        buttonsRepository.delete(id);
        buttonsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/buttons?query=:query : search for the buttons corresponding
     * to the query.
     *
     * @param query the query of the buttons search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/buttons")
    @Timed
    public ResponseEntity<List<Buttons>> searchButtons(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Buttons for query {}", query);
        Page<Buttons> page = buttonsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/buttons");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
