package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Colorsbackground;

import com.spirovanni.blackshields.repository.ColorsbackgroundRepository;
import com.spirovanni.blackshields.repository.search.ColorsbackgroundSearchRepository;
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
 * REST controller for managing Colorsbackground.
 */
@RestController
@RequestMapping("/api")
public class ColorsbackgroundResource {

    private final Logger log = LoggerFactory.getLogger(ColorsbackgroundResource.class);

    private static final String ENTITY_NAME = "colorsbackground";

    private final ColorsbackgroundRepository colorsbackgroundRepository;

    private final ColorsbackgroundSearchRepository colorsbackgroundSearchRepository;

    public ColorsbackgroundResource(ColorsbackgroundRepository colorsbackgroundRepository, ColorsbackgroundSearchRepository colorsbackgroundSearchRepository) {
        this.colorsbackgroundRepository = colorsbackgroundRepository;
        this.colorsbackgroundSearchRepository = colorsbackgroundSearchRepository;
    }

    /**
     * POST  /colorsbackgrounds : Create a new colorsbackground.
     *
     * @param colorsbackground the colorsbackground to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colorsbackground, or with status 400 (Bad Request) if the colorsbackground has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colorsbackgrounds")
    @Timed
    public ResponseEntity<Colorsbackground> createColorsbackground(@Valid @RequestBody Colorsbackground colorsbackground) throws URISyntaxException {
        log.debug("REST request to save Colorsbackground : {}", colorsbackground);
        if (colorsbackground.getId() != null) {
            throw new BadRequestAlertException("A new colorsbackground cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colorsbackground result = colorsbackgroundRepository.save(colorsbackground);
        colorsbackgroundSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/colorsbackgrounds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colorsbackgrounds : Updates an existing colorsbackground.
     *
     * @param colorsbackground the colorsbackground to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colorsbackground,
     * or with status 400 (Bad Request) if the colorsbackground is not valid,
     * or with status 500 (Internal Server Error) if the colorsbackground couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colorsbackgrounds")
    @Timed
    public ResponseEntity<Colorsbackground> updateColorsbackground(@Valid @RequestBody Colorsbackground colorsbackground) throws URISyntaxException {
        log.debug("REST request to update Colorsbackground : {}", colorsbackground);
        if (colorsbackground.getId() == null) {
            return createColorsbackground(colorsbackground);
        }
        Colorsbackground result = colorsbackgroundRepository.save(colorsbackground);
        colorsbackgroundSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colorsbackground.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colorsbackgrounds : get all the colorsbackgrounds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of colorsbackgrounds in body
     */
    @GetMapping("/colorsbackgrounds")
    @Timed
    public ResponseEntity<List<Colorsbackground>> getAllColorsbackgrounds(Pageable pageable) {
        log.debug("REST request to get a page of Colorsbackgrounds");
        Page<Colorsbackground> page = colorsbackgroundRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/colorsbackgrounds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /colorsbackgrounds/:id : get the "id" colorsbackground.
     *
     * @param id the id of the colorsbackground to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colorsbackground, or with status 404 (Not Found)
     */
    @GetMapping("/colorsbackgrounds/{id}")
    @Timed
    public ResponseEntity<Colorsbackground> getColorsbackground(@PathVariable Long id) {
        log.debug("REST request to get Colorsbackground : {}", id);
        Colorsbackground colorsbackground = colorsbackgroundRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(colorsbackground));
    }

    /**
     * DELETE  /colorsbackgrounds/:id : delete the "id" colorsbackground.
     *
     * @param id the id of the colorsbackground to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colorsbackgrounds/{id}")
    @Timed
    public ResponseEntity<Void> deleteColorsbackground(@PathVariable Long id) {
        log.debug("REST request to delete Colorsbackground : {}", id);
        colorsbackgroundRepository.delete(id);
        colorsbackgroundSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/colorsbackgrounds?query=:query : search for the colorsbackground corresponding
     * to the query.
     *
     * @param query the query of the colorsbackground search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/colorsbackgrounds")
    @Timed
    public ResponseEntity<List<Colorsbackground>> searchColorsbackgrounds(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Colorsbackgrounds for query {}", query);
        Page<Colorsbackground> page = colorsbackgroundSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/colorsbackgrounds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
