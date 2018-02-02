package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Groupsbadges;

import com.spirovanni.blackshields.repository.GroupsbadgesRepository;
import com.spirovanni.blackshields.repository.search.GroupsbadgesSearchRepository;
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
 * REST controller for managing Groupsbadges.
 */
@RestController
@RequestMapping("/api")
public class GroupsbadgesResource {

    private final Logger log = LoggerFactory.getLogger(GroupsbadgesResource.class);

    private static final String ENTITY_NAME = "groupsbadges";

    private final GroupsbadgesRepository groupsbadgesRepository;

    private final GroupsbadgesSearchRepository groupsbadgesSearchRepository;

    public GroupsbadgesResource(GroupsbadgesRepository groupsbadgesRepository, GroupsbadgesSearchRepository groupsbadgesSearchRepository) {
        this.groupsbadgesRepository = groupsbadgesRepository;
        this.groupsbadgesSearchRepository = groupsbadgesSearchRepository;
    }

    /**
     * POST  /groupsbadges : Create a new groupsbadges.
     *
     * @param groupsbadges the groupsbadges to create
     * @return the ResponseEntity with status 201 (Created) and with body the new groupsbadges, or with status 400 (Bad Request) if the groupsbadges has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/groupsbadges")
    @Timed
    public ResponseEntity<Groupsbadges> createGroupsbadges(@Valid @RequestBody Groupsbadges groupsbadges) throws URISyntaxException {
        log.debug("REST request to save Groupsbadges : {}", groupsbadges);
        if (groupsbadges.getId() != null) {
            throw new BadRequestAlertException("A new groupsbadges cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Groupsbadges result = groupsbadgesRepository.save(groupsbadges);
        groupsbadgesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/groupsbadges/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /groupsbadges : Updates an existing groupsbadges.
     *
     * @param groupsbadges the groupsbadges to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated groupsbadges,
     * or with status 400 (Bad Request) if the groupsbadges is not valid,
     * or with status 500 (Internal Server Error) if the groupsbadges couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/groupsbadges")
    @Timed
    public ResponseEntity<Groupsbadges> updateGroupsbadges(@Valid @RequestBody Groupsbadges groupsbadges) throws URISyntaxException {
        log.debug("REST request to update Groupsbadges : {}", groupsbadges);
        if (groupsbadges.getId() == null) {
            return createGroupsbadges(groupsbadges);
        }
        Groupsbadges result = groupsbadgesRepository.save(groupsbadges);
        groupsbadgesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, groupsbadges.getId().toString()))
            .body(result);
    }

    /**
     * GET  /groupsbadges : get all the groupsbadges.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of groupsbadges in body
     */
    @GetMapping("/groupsbadges")
    @Timed
    public ResponseEntity<List<Groupsbadges>> getAllGroupsbadges(Pageable pageable) {
        log.debug("REST request to get a page of Groupsbadges");
        Page<Groupsbadges> page = groupsbadgesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/groupsbadges");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /groupsbadges/:id : get the "id" groupsbadges.
     *
     * @param id the id of the groupsbadges to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the groupsbadges, or with status 404 (Not Found)
     */
    @GetMapping("/groupsbadges/{id}")
    @Timed
    public ResponseEntity<Groupsbadges> getGroupsbadges(@PathVariable Long id) {
        log.debug("REST request to get Groupsbadges : {}", id);
        Groupsbadges groupsbadges = groupsbadgesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(groupsbadges));
    }

    /**
     * DELETE  /groupsbadges/:id : delete the "id" groupsbadges.
     *
     * @param id the id of the groupsbadges to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/groupsbadges/{id}")
    @Timed
    public ResponseEntity<Void> deleteGroupsbadges(@PathVariable Long id) {
        log.debug("REST request to delete Groupsbadges : {}", id);
        groupsbadgesRepository.delete(id);
        groupsbadgesSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/groupsbadges?query=:query : search for the groupsbadges corresponding
     * to the query.
     *
     * @param query the query of the groupsbadges search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/groupsbadges")
    @Timed
    public ResponseEntity<List<Groupsbadges>> searchGroupsbadges(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Groupsbadges for query {}", query);
        Page<Groupsbadges> page = groupsbadgesSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/groupsbadges");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
