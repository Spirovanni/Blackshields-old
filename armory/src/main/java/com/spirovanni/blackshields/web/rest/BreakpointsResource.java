package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Breakpoints;

import com.spirovanni.blackshields.repository.BreakpointsRepository;
import com.spirovanni.blackshields.repository.search.BreakpointsSearchRepository;
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
 * REST controller for managing Breakpoints.
 */
@RestController
@RequestMapping("/api")
public class BreakpointsResource {

    private final Logger log = LoggerFactory.getLogger(BreakpointsResource.class);

    private static final String ENTITY_NAME = "breakpoints";

    private final BreakpointsRepository breakpointsRepository;

    private final BreakpointsSearchRepository breakpointsSearchRepository;

    public BreakpointsResource(BreakpointsRepository breakpointsRepository, BreakpointsSearchRepository breakpointsSearchRepository) {
        this.breakpointsRepository = breakpointsRepository;
        this.breakpointsSearchRepository = breakpointsSearchRepository;
    }

    /**
     * POST  /breakpoints : Create a new breakpoints.
     *
     * @param breakpoints the breakpoints to create
     * @return the ResponseEntity with status 201 (Created) and with body the new breakpoints, or with status 400 (Bad Request) if the breakpoints has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/breakpoints")
    @Timed
    public ResponseEntity<Breakpoints> createBreakpoints(@Valid @RequestBody Breakpoints breakpoints) throws URISyntaxException {
        log.debug("REST request to save Breakpoints : {}", breakpoints);
        if (breakpoints.getId() != null) {
            throw new BadRequestAlertException("A new breakpoints cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Breakpoints result = breakpointsRepository.save(breakpoints);
        breakpointsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/breakpoints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /breakpoints : Updates an existing breakpoints.
     *
     * @param breakpoints the breakpoints to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated breakpoints,
     * or with status 400 (Bad Request) if the breakpoints is not valid,
     * or with status 500 (Internal Server Error) if the breakpoints couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/breakpoints")
    @Timed
    public ResponseEntity<Breakpoints> updateBreakpoints(@Valid @RequestBody Breakpoints breakpoints) throws URISyntaxException {
        log.debug("REST request to update Breakpoints : {}", breakpoints);
        if (breakpoints.getId() == null) {
            return createBreakpoints(breakpoints);
        }
        Breakpoints result = breakpointsRepository.save(breakpoints);
        breakpointsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, breakpoints.getId().toString()))
            .body(result);
    }

    /**
     * GET  /breakpoints : get all the breakpoints.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of breakpoints in body
     */
    @GetMapping("/breakpoints")
    @Timed
    public ResponseEntity<List<Breakpoints>> getAllBreakpoints(Pageable pageable) {
        log.debug("REST request to get a page of Breakpoints");
        Page<Breakpoints> page = breakpointsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/breakpoints");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /breakpoints/:id : get the "id" breakpoints.
     *
     * @param id the id of the breakpoints to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the breakpoints, or with status 404 (Not Found)
     */
    @GetMapping("/breakpoints/{id}")
    @Timed
    public ResponseEntity<Breakpoints> getBreakpoints(@PathVariable Long id) {
        log.debug("REST request to get Breakpoints : {}", id);
        Breakpoints breakpoints = breakpointsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(breakpoints));
    }

    /**
     * DELETE  /breakpoints/:id : delete the "id" breakpoints.
     *
     * @param id the id of the breakpoints to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/breakpoints/{id}")
    @Timed
    public ResponseEntity<Void> deleteBreakpoints(@PathVariable Long id) {
        log.debug("REST request to delete Breakpoints : {}", id);
        breakpointsRepository.delete(id);
        breakpointsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/breakpoints?query=:query : search for the breakpoints corresponding
     * to the query.
     *
     * @param query the query of the breakpoints search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/breakpoints")
    @Timed
    public ResponseEntity<List<Breakpoints>> searchBreakpoints(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Breakpoints for query {}", query);
        Page<Breakpoints> page = breakpointsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/breakpoints");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
