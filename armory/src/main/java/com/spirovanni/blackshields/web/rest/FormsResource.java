package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Forms;

import com.spirovanni.blackshields.repository.FormsRepository;
import com.spirovanni.blackshields.repository.search.FormsSearchRepository;
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
 * REST controller for managing Forms.
 */
@RestController
@RequestMapping("/api")
public class FormsResource {

    private final Logger log = LoggerFactory.getLogger(FormsResource.class);

    private static final String ENTITY_NAME = "forms";

    private final FormsRepository formsRepository;

    private final FormsSearchRepository formsSearchRepository;

    public FormsResource(FormsRepository formsRepository, FormsSearchRepository formsSearchRepository) {
        this.formsRepository = formsRepository;
        this.formsSearchRepository = formsSearchRepository;
    }

    /**
     * POST  /forms : Create a new forms.
     *
     * @param forms the forms to create
     * @return the ResponseEntity with status 201 (Created) and with body the new forms, or with status 400 (Bad Request) if the forms has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/forms")
    @Timed
    public ResponseEntity<Forms> createForms(@Valid @RequestBody Forms forms) throws URISyntaxException {
        log.debug("REST request to save Forms : {}", forms);
        if (forms.getId() != null) {
            throw new BadRequestAlertException("A new forms cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Forms result = formsRepository.save(forms);
        formsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/forms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /forms : Updates an existing forms.
     *
     * @param forms the forms to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated forms,
     * or with status 400 (Bad Request) if the forms is not valid,
     * or with status 500 (Internal Server Error) if the forms couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/forms")
    @Timed
    public ResponseEntity<Forms> updateForms(@Valid @RequestBody Forms forms) throws URISyntaxException {
        log.debug("REST request to update Forms : {}", forms);
        if (forms.getId() == null) {
            return createForms(forms);
        }
        Forms result = formsRepository.save(forms);
        formsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, forms.getId().toString()))
            .body(result);
    }

    /**
     * GET  /forms : get all the forms.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of forms in body
     */
    @GetMapping("/forms")
    @Timed
    public ResponseEntity<List<Forms>> getAllForms(Pageable pageable) {
        log.debug("REST request to get a page of Forms");
        Page<Forms> page = formsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/forms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /forms/:id : get the "id" forms.
     *
     * @param id the id of the forms to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the forms, or with status 404 (Not Found)
     */
    @GetMapping("/forms/{id}")
    @Timed
    public ResponseEntity<Forms> getForms(@PathVariable Long id) {
        log.debug("REST request to get Forms : {}", id);
        Forms forms = formsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(forms));
    }

    /**
     * DELETE  /forms/:id : delete the "id" forms.
     *
     * @param id the id of the forms to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/forms/{id}")
    @Timed
    public ResponseEntity<Void> deleteForms(@PathVariable Long id) {
        log.debug("REST request to delete Forms : {}", id);
        formsRepository.delete(id);
        formsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/forms?query=:query : search for the forms corresponding
     * to the query.
     *
     * @param query the query of the forms search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/forms")
    @Timed
    public ResponseEntity<List<Forms>> searchForms(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Forms for query {}", query);
        Page<Forms> page = formsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/forms");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
