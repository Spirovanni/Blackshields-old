package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Basictypography;

import com.spirovanni.blackshields.repository.BasictypographyRepository;
import com.spirovanni.blackshields.repository.search.BasictypographySearchRepository;
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
 * REST controller for managing Basictypography.
 */
@RestController
@RequestMapping("/api")
public class BasictypographyResource {

    private final Logger log = LoggerFactory.getLogger(BasictypographyResource.class);

    private static final String ENTITY_NAME = "basictypography";

    private final BasictypographyRepository basictypographyRepository;

    private final BasictypographySearchRepository basictypographySearchRepository;

    public BasictypographyResource(BasictypographyRepository basictypographyRepository, BasictypographySearchRepository basictypographySearchRepository) {
        this.basictypographyRepository = basictypographyRepository;
        this.basictypographySearchRepository = basictypographySearchRepository;
    }

    /**
     * POST  /basictypographies : Create a new basictypography.
     *
     * @param basictypography the basictypography to create
     * @return the ResponseEntity with status 201 (Created) and with body the new basictypography, or with status 400 (Bad Request) if the basictypography has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/basictypographies")
    @Timed
    public ResponseEntity<Basictypography> createBasictypography(@Valid @RequestBody Basictypography basictypography) throws URISyntaxException {
        log.debug("REST request to save Basictypography : {}", basictypography);
        if (basictypography.getId() != null) {
            throw new BadRequestAlertException("A new basictypography cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Basictypography result = basictypographyRepository.save(basictypography);
        basictypographySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/basictypographies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /basictypographies : Updates an existing basictypography.
     *
     * @param basictypography the basictypography to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated basictypography,
     * or with status 400 (Bad Request) if the basictypography is not valid,
     * or with status 500 (Internal Server Error) if the basictypography couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/basictypographies")
    @Timed
    public ResponseEntity<Basictypography> updateBasictypography(@Valid @RequestBody Basictypography basictypography) throws URISyntaxException {
        log.debug("REST request to update Basictypography : {}", basictypography);
        if (basictypography.getId() == null) {
            return createBasictypography(basictypography);
        }
        Basictypography result = basictypographyRepository.save(basictypography);
        basictypographySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, basictypography.getId().toString()))
            .body(result);
    }

    /**
     * GET  /basictypographies : get all the basictypographies.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of basictypographies in body
     */
    @GetMapping("/basictypographies")
    @Timed
    public ResponseEntity<List<Basictypography>> getAllBasictypographies(Pageable pageable) {
        log.debug("REST request to get a page of Basictypographies");
        Page<Basictypography> page = basictypographyRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/basictypographies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /basictypographies/:id : get the "id" basictypography.
     *
     * @param id the id of the basictypography to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the basictypography, or with status 404 (Not Found)
     */
    @GetMapping("/basictypographies/{id}")
    @Timed
    public ResponseEntity<Basictypography> getBasictypography(@PathVariable Long id) {
        log.debug("REST request to get Basictypography : {}", id);
        Basictypography basictypography = basictypographyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(basictypography));
    }

    /**
     * DELETE  /basictypographies/:id : delete the "id" basictypography.
     *
     * @param id the id of the basictypography to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/basictypographies/{id}")
    @Timed
    public ResponseEntity<Void> deleteBasictypography(@PathVariable Long id) {
        log.debug("REST request to delete Basictypography : {}", id);
        basictypographyRepository.delete(id);
        basictypographySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/basictypographies?query=:query : search for the basictypography corresponding
     * to the query.
     *
     * @param query the query of the basictypography search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/basictypographies")
    @Timed
    public ResponseEntity<List<Basictypography>> searchBasictypographies(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Basictypographies for query {}", query);
        Page<Basictypography> page = basictypographySearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/basictypographies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
