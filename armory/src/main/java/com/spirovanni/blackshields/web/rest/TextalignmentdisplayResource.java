package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Textalignmentdisplay;

import com.spirovanni.blackshields.repository.TextalignmentdisplayRepository;
import com.spirovanni.blackshields.repository.search.TextalignmentdisplaySearchRepository;
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
 * REST controller for managing Textalignmentdisplay.
 */
@RestController
@RequestMapping("/api")
public class TextalignmentdisplayResource {

    private final Logger log = LoggerFactory.getLogger(TextalignmentdisplayResource.class);

    private static final String ENTITY_NAME = "textalignmentdisplay";

    private final TextalignmentdisplayRepository textalignmentdisplayRepository;

    private final TextalignmentdisplaySearchRepository textalignmentdisplaySearchRepository;

    public TextalignmentdisplayResource(TextalignmentdisplayRepository textalignmentdisplayRepository, TextalignmentdisplaySearchRepository textalignmentdisplaySearchRepository) {
        this.textalignmentdisplayRepository = textalignmentdisplayRepository;
        this.textalignmentdisplaySearchRepository = textalignmentdisplaySearchRepository;
    }

    /**
     * POST  /textalignmentdisplays : Create a new textalignmentdisplay.
     *
     * @param textalignmentdisplay the textalignmentdisplay to create
     * @return the ResponseEntity with status 201 (Created) and with body the new textalignmentdisplay, or with status 400 (Bad Request) if the textalignmentdisplay has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/textalignmentdisplays")
    @Timed
    public ResponseEntity<Textalignmentdisplay> createTextalignmentdisplay(@Valid @RequestBody Textalignmentdisplay textalignmentdisplay) throws URISyntaxException {
        log.debug("REST request to save Textalignmentdisplay : {}", textalignmentdisplay);
        if (textalignmentdisplay.getId() != null) {
            throw new BadRequestAlertException("A new textalignmentdisplay cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Textalignmentdisplay result = textalignmentdisplayRepository.save(textalignmentdisplay);
        textalignmentdisplaySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/textalignmentdisplays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /textalignmentdisplays : Updates an existing textalignmentdisplay.
     *
     * @param textalignmentdisplay the textalignmentdisplay to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated textalignmentdisplay,
     * or with status 400 (Bad Request) if the textalignmentdisplay is not valid,
     * or with status 500 (Internal Server Error) if the textalignmentdisplay couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/textalignmentdisplays")
    @Timed
    public ResponseEntity<Textalignmentdisplay> updateTextalignmentdisplay(@Valid @RequestBody Textalignmentdisplay textalignmentdisplay) throws URISyntaxException {
        log.debug("REST request to update Textalignmentdisplay : {}", textalignmentdisplay);
        if (textalignmentdisplay.getId() == null) {
            return createTextalignmentdisplay(textalignmentdisplay);
        }
        Textalignmentdisplay result = textalignmentdisplayRepository.save(textalignmentdisplay);
        textalignmentdisplaySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, textalignmentdisplay.getId().toString()))
            .body(result);
    }

    /**
     * GET  /textalignmentdisplays : get all the textalignmentdisplays.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of textalignmentdisplays in body
     */
    @GetMapping("/textalignmentdisplays")
    @Timed
    public ResponseEntity<List<Textalignmentdisplay>> getAllTextalignmentdisplays(Pageable pageable) {
        log.debug("REST request to get a page of Textalignmentdisplays");
        Page<Textalignmentdisplay> page = textalignmentdisplayRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/textalignmentdisplays");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /textalignmentdisplays/:id : get the "id" textalignmentdisplay.
     *
     * @param id the id of the textalignmentdisplay to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the textalignmentdisplay, or with status 404 (Not Found)
     */
    @GetMapping("/textalignmentdisplays/{id}")
    @Timed
    public ResponseEntity<Textalignmentdisplay> getTextalignmentdisplay(@PathVariable Long id) {
        log.debug("REST request to get Textalignmentdisplay : {}", id);
        Textalignmentdisplay textalignmentdisplay = textalignmentdisplayRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(textalignmentdisplay));
    }

    /**
     * DELETE  /textalignmentdisplays/:id : delete the "id" textalignmentdisplay.
     *
     * @param id the id of the textalignmentdisplay to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/textalignmentdisplays/{id}")
    @Timed
    public ResponseEntity<Void> deleteTextalignmentdisplay(@PathVariable Long id) {
        log.debug("REST request to delete Textalignmentdisplay : {}", id);
        textalignmentdisplayRepository.delete(id);
        textalignmentdisplaySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/textalignmentdisplays?query=:query : search for the textalignmentdisplay corresponding
     * to the query.
     *
     * @param query the query of the textalignmentdisplay search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/textalignmentdisplays")
    @Timed
    public ResponseEntity<List<Textalignmentdisplay>> searchTextalignmentdisplays(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Textalignmentdisplays for query {}", query);
        Page<Textalignmentdisplay> page = textalignmentdisplaySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/textalignmentdisplays");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
