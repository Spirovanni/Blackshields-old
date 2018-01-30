package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Sizing;

import com.spirovanni.blackshields.repository.SizingRepository;
import com.spirovanni.blackshields.repository.search.SizingSearchRepository;
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
 * REST controller for managing Sizing.
 */
@RestController
@RequestMapping("/api")
public class SizingResource {

    private final Logger log = LoggerFactory.getLogger(SizingResource.class);

    private static final String ENTITY_NAME = "sizing";

    private final SizingRepository sizingRepository;

    private final SizingSearchRepository sizingSearchRepository;

    public SizingResource(SizingRepository sizingRepository, SizingSearchRepository sizingSearchRepository) {
        this.sizingRepository = sizingRepository;
        this.sizingSearchRepository = sizingSearchRepository;
    }

    /**
     * POST  /sizings : Create a new sizing.
     *
     * @param sizing the sizing to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sizing, or with status 400 (Bad Request) if the sizing has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sizings")
    @Timed
    public ResponseEntity<Sizing> createSizing(@Valid @RequestBody Sizing sizing) throws URISyntaxException {
        log.debug("REST request to save Sizing : {}", sizing);
        if (sizing.getId() != null) {
            throw new BadRequestAlertException("A new sizing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sizing result = sizingRepository.save(sizing);
        sizingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/sizings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sizings : Updates an existing sizing.
     *
     * @param sizing the sizing to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sizing,
     * or with status 400 (Bad Request) if the sizing is not valid,
     * or with status 500 (Internal Server Error) if the sizing couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sizings")
    @Timed
    public ResponseEntity<Sizing> updateSizing(@Valid @RequestBody Sizing sizing) throws URISyntaxException {
        log.debug("REST request to update Sizing : {}", sizing);
        if (sizing.getId() == null) {
            return createSizing(sizing);
        }
        Sizing result = sizingRepository.save(sizing);
        sizingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sizing.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sizings : get all the sizings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sizings in body
     */
    @GetMapping("/sizings")
    @Timed
    public ResponseEntity<List<Sizing>> getAllSizings(Pageable pageable) {
        log.debug("REST request to get a page of Sizings");
        Page<Sizing> page = sizingRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sizings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sizings/:id : get the "id" sizing.
     *
     * @param id the id of the sizing to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sizing, or with status 404 (Not Found)
     */
    @GetMapping("/sizings/{id}")
    @Timed
    public ResponseEntity<Sizing> getSizing(@PathVariable Long id) {
        log.debug("REST request to get Sizing : {}", id);
        Sizing sizing = sizingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sizing));
    }

    /**
     * DELETE  /sizings/:id : delete the "id" sizing.
     *
     * @param id the id of the sizing to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sizings/{id}")
    @Timed
    public ResponseEntity<Void> deleteSizing(@PathVariable Long id) {
        log.debug("REST request to delete Sizing : {}", id);
        sizingRepository.delete(id);
        sizingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/sizings?query=:query : search for the sizing corresponding
     * to the query.
     *
     * @param query the query of the sizing search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/sizings")
    @Timed
    public ResponseEntity<List<Sizing>> searchSizings(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Sizings for query {}", query);
        Page<Sizing> page = sizingSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/sizings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
