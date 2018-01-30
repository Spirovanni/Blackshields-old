package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Floatsposition;

import com.spirovanni.blackshields.repository.FloatspositionRepository;
import com.spirovanni.blackshields.repository.search.FloatspositionSearchRepository;
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
 * REST controller for managing Floatsposition.
 */
@RestController
@RequestMapping("/api")
public class FloatspositionResource {

    private final Logger log = LoggerFactory.getLogger(FloatspositionResource.class);

    private static final String ENTITY_NAME = "floatsposition";

    private final FloatspositionRepository floatspositionRepository;

    private final FloatspositionSearchRepository floatspositionSearchRepository;

    public FloatspositionResource(FloatspositionRepository floatspositionRepository, FloatspositionSearchRepository floatspositionSearchRepository) {
        this.floatspositionRepository = floatspositionRepository;
        this.floatspositionSearchRepository = floatspositionSearchRepository;
    }

    /**
     * POST  /floatspositions : Create a new floatsposition.
     *
     * @param floatsposition the floatsposition to create
     * @return the ResponseEntity with status 201 (Created) and with body the new floatsposition, or with status 400 (Bad Request) if the floatsposition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/floatspositions")
    @Timed
    public ResponseEntity<Floatsposition> createFloatsposition(@Valid @RequestBody Floatsposition floatsposition) throws URISyntaxException {
        log.debug("REST request to save Floatsposition : {}", floatsposition);
        if (floatsposition.getId() != null) {
            throw new BadRequestAlertException("A new floatsposition cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Floatsposition result = floatspositionRepository.save(floatsposition);
        floatspositionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/floatspositions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /floatspositions : Updates an existing floatsposition.
     *
     * @param floatsposition the floatsposition to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated floatsposition,
     * or with status 400 (Bad Request) if the floatsposition is not valid,
     * or with status 500 (Internal Server Error) if the floatsposition couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/floatspositions")
    @Timed
    public ResponseEntity<Floatsposition> updateFloatsposition(@Valid @RequestBody Floatsposition floatsposition) throws URISyntaxException {
        log.debug("REST request to update Floatsposition : {}", floatsposition);
        if (floatsposition.getId() == null) {
            return createFloatsposition(floatsposition);
        }
        Floatsposition result = floatspositionRepository.save(floatsposition);
        floatspositionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, floatsposition.getId().toString()))
            .body(result);
    }

    /**
     * GET  /floatspositions : get all the floatspositions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of floatspositions in body
     */
    @GetMapping("/floatspositions")
    @Timed
    public ResponseEntity<List<Floatsposition>> getAllFloatspositions(Pageable pageable) {
        log.debug("REST request to get a page of Floatspositions");
        Page<Floatsposition> page = floatspositionRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/floatspositions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /floatspositions/:id : get the "id" floatsposition.
     *
     * @param id the id of the floatsposition to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the floatsposition, or with status 404 (Not Found)
     */
    @GetMapping("/floatspositions/{id}")
    @Timed
    public ResponseEntity<Floatsposition> getFloatsposition(@PathVariable Long id) {
        log.debug("REST request to get Floatsposition : {}", id);
        Floatsposition floatsposition = floatspositionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(floatsposition));
    }

    /**
     * DELETE  /floatspositions/:id : delete the "id" floatsposition.
     *
     * @param id the id of the floatsposition to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/floatspositions/{id}")
    @Timed
    public ResponseEntity<Void> deleteFloatsposition(@PathVariable Long id) {
        log.debug("REST request to delete Floatsposition : {}", id);
        floatspositionRepository.delete(id);
        floatspositionSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/floatspositions?query=:query : search for the floatsposition corresponding
     * to the query.
     *
     * @param query the query of the floatsposition search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/floatspositions")
    @Timed
    public ResponseEntity<List<Floatsposition>> searchFloatspositions(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Floatspositions for query {}", query);
        Page<Floatsposition> page = floatspositionSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/floatspositions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
