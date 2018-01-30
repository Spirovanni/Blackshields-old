package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Spacing;

import com.spirovanni.blackshields.repository.SpacingRepository;
import com.spirovanni.blackshields.repository.search.SpacingSearchRepository;
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
 * REST controller for managing Spacing.
 */
@RestController
@RequestMapping("/api")
public class SpacingResource {

    private final Logger log = LoggerFactory.getLogger(SpacingResource.class);

    private static final String ENTITY_NAME = "spacing";

    private final SpacingRepository spacingRepository;

    private final SpacingSearchRepository spacingSearchRepository;

    public SpacingResource(SpacingRepository spacingRepository, SpacingSearchRepository spacingSearchRepository) {
        this.spacingRepository = spacingRepository;
        this.spacingSearchRepository = spacingSearchRepository;
    }

    /**
     * POST  /spacings : Create a new spacing.
     *
     * @param spacing the spacing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new spacing, or with status 400 (Bad Request) if the spacing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/spacings")
    @Timed
    public ResponseEntity<Spacing> createSpacing(@Valid @RequestBody Spacing spacing) throws URISyntaxException {
        log.debug("REST request to save Spacing : {}", spacing);
        if (spacing.getId() != null) {
            throw new BadRequestAlertException("A new spacing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Spacing result = spacingRepository.save(spacing);
        spacingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/spacings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /spacings : Updates an existing spacing.
     *
     * @param spacing the spacing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated spacing,
     * or with status 400 (Bad Request) if the spacing is not valid,
     * or with status 500 (Internal Server Error) if the spacing couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/spacings")
    @Timed
    public ResponseEntity<Spacing> updateSpacing(@Valid @RequestBody Spacing spacing) throws URISyntaxException {
        log.debug("REST request to update Spacing : {}", spacing);
        if (spacing.getId() == null) {
            return createSpacing(spacing);
        }
        Spacing result = spacingRepository.save(spacing);
        spacingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, spacing.getId().toString()))
            .body(result);
    }

    /**
     * GET  /spacings : get all the spacings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of spacings in body
     */
    @GetMapping("/spacings")
    @Timed
    public ResponseEntity<List<Spacing>> getAllSpacings(Pageable pageable) {
        log.debug("REST request to get a page of Spacings");
        Page<Spacing> page = spacingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/spacings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /spacings/:id : get the "id" spacing.
     *
     * @param id the id of the spacing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the spacing, or with status 404 (Not Found)
     */
    @GetMapping("/spacings/{id}")
    @Timed
    public ResponseEntity<Spacing> getSpacing(@PathVariable Long id) {
        log.debug("REST request to get Spacing : {}", id);
        Spacing spacing = spacingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(spacing));
    }

    /**
     * DELETE  /spacings/:id : delete the "id" spacing.
     *
     * @param id the id of the spacing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/spacings/{id}")
    @Timed
    public ResponseEntity<Void> deleteSpacing(@PathVariable Long id) {
        log.debug("REST request to delete Spacing : {}", id);
        spacingRepository.delete(id);
        spacingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/spacings?query=:query : search for the spacing corresponding
     * to the query.
     *
     * @param query the query of the spacing search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/spacings")
    @Timed
    public ResponseEntity<List<Spacing>> searchSpacings(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Spacings for query {}", query);
        Page<Spacing> page = spacingSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/spacings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
