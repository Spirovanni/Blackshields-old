package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Inputgroups;

import com.spirovanni.blackshields.repository.InputgroupsRepository;
import com.spirovanni.blackshields.repository.search.InputgroupsSearchRepository;
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
 * REST controller for managing Inputgroups.
 */
@RestController
@RequestMapping("/api")
public class InputgroupsResource {

    private final Logger log = LoggerFactory.getLogger(InputgroupsResource.class);

    private static final String ENTITY_NAME = "inputgroups";

    private final InputgroupsRepository inputgroupsRepository;

    private final InputgroupsSearchRepository inputgroupsSearchRepository;

    public InputgroupsResource(InputgroupsRepository inputgroupsRepository, InputgroupsSearchRepository inputgroupsSearchRepository) {
        this.inputgroupsRepository = inputgroupsRepository;
        this.inputgroupsSearchRepository = inputgroupsSearchRepository;
    }

    /**
     * POST  /inputgroups : Create a new inputgroups.
     *
     * @param inputgroups the inputgroups to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inputgroups, or with status 400 (Bad Request) if the inputgroups has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inputgroups")
    @Timed
    public ResponseEntity<Inputgroups> createInputgroups(@Valid @RequestBody Inputgroups inputgroups) throws URISyntaxException {
        log.debug("REST request to save Inputgroups : {}", inputgroups);
        if (inputgroups.getId() != null) {
            throw new BadRequestAlertException("A new inputgroups cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inputgroups result = inputgroupsRepository.save(inputgroups);
        inputgroupsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/inputgroups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inputgroups : Updates an existing inputgroups.
     *
     * @param inputgroups the inputgroups to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inputgroups,
     * or with status 400 (Bad Request) if the inputgroups is not valid,
     * or with status 500 (Internal Server Error) if the inputgroups couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inputgroups")
    @Timed
    public ResponseEntity<Inputgroups> updateInputgroups(@Valid @RequestBody Inputgroups inputgroups) throws URISyntaxException {
        log.debug("REST request to update Inputgroups : {}", inputgroups);
        if (inputgroups.getId() == null) {
            return createInputgroups(inputgroups);
        }
        Inputgroups result = inputgroupsRepository.save(inputgroups);
        inputgroupsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inputgroups.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inputgroups : get all the inputgroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of inputgroups in body
     */
    @GetMapping("/inputgroups")
    @Timed
    public ResponseEntity<List<Inputgroups>> getAllInputgroups(Pageable pageable) {
        log.debug("REST request to get a page of Inputgroups");
        Page<Inputgroups> page = inputgroupsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/inputgroups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /inputgroups/:id : get the "id" inputgroups.
     *
     * @param id the id of the inputgroups to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inputgroups, or with status 404 (Not Found)
     */
    @GetMapping("/inputgroups/{id}")
    @Timed
    public ResponseEntity<Inputgroups> getInputgroups(@PathVariable Long id) {
        log.debug("REST request to get Inputgroups : {}", id);
        Inputgroups inputgroups = inputgroupsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inputgroups));
    }

    /**
     * DELETE  /inputgroups/:id : delete the "id" inputgroups.
     *
     * @param id the id of the inputgroups to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inputgroups/{id}")
    @Timed
    public ResponseEntity<Void> deleteInputgroups(@PathVariable Long id) {
        log.debug("REST request to delete Inputgroups : {}", id);
        inputgroupsRepository.delete(id);
        inputgroupsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/inputgroups?query=:query : search for the inputgroups corresponding
     * to the query.
     *
     * @param query the query of the inputgroups search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/inputgroups")
    @Timed
    public ResponseEntity<List<Inputgroups>> searchInputgroups(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Inputgroups for query {}", query);
        Page<Inputgroups> page = inputgroupsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/inputgroups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
