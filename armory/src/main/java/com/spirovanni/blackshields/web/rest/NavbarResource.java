package com.spirovanni.blackshields.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.spirovanni.blackshields.domain.Navbar;

import com.spirovanni.blackshields.repository.NavbarRepository;
import com.spirovanni.blackshields.repository.search.NavbarSearchRepository;
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
 * REST controller for managing Navbar.
 */
@RestController
@RequestMapping("/api")
public class NavbarResource {

    private final Logger log = LoggerFactory.getLogger(NavbarResource.class);

    private static final String ENTITY_NAME = "navbar";

    private final NavbarRepository navbarRepository;

    private final NavbarSearchRepository navbarSearchRepository;

    public NavbarResource(NavbarRepository navbarRepository, NavbarSearchRepository navbarSearchRepository) {
        this.navbarRepository = navbarRepository;
        this.navbarSearchRepository = navbarSearchRepository;
    }

    /**
     * POST  /navbars : Create a new navbar.
     *
     * @param navbar the navbar to create
     * @return the ResponseEntity with status 201 (Created) and with body the new navbar, or with status 400 (Bad Request) if the navbar has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/navbars")
    @Timed
    public ResponseEntity<Navbar> createNavbar(@Valid @RequestBody Navbar navbar) throws URISyntaxException {
        log.debug("REST request to save Navbar : {}", navbar);
        if (navbar.getId() != null) {
            throw new BadRequestAlertException("A new navbar cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Navbar result = navbarRepository.save(navbar);
        navbarSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/navbars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /navbars : Updates an existing navbar.
     *
     * @param navbar the navbar to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated navbar,
     * or with status 400 (Bad Request) if the navbar is not valid,
     * or with status 500 (Internal Server Error) if the navbar couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/navbars")
    @Timed
    public ResponseEntity<Navbar> updateNavbar(@Valid @RequestBody Navbar navbar) throws URISyntaxException {
        log.debug("REST request to update Navbar : {}", navbar);
        if (navbar.getId() == null) {
            return createNavbar(navbar);
        }
        Navbar result = navbarRepository.save(navbar);
        navbarSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, navbar.getId().toString()))
            .body(result);
    }

    /**
     * GET  /navbars : get all the navbars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of navbars in body
     */
    @GetMapping("/navbars")
    @Timed
    public ResponseEntity<List<Navbar>> getAllNavbars(Pageable pageable) {
        log.debug("REST request to get a page of Navbars");
        Page<Navbar> page = navbarRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/navbars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /navbars/:id : get the "id" navbar.
     *
     * @param id the id of the navbar to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the navbar, or with status 404 (Not Found)
     */
    @GetMapping("/navbars/{id}")
    @Timed
    public ResponseEntity<Navbar> getNavbar(@PathVariable Long id) {
        log.debug("REST request to get Navbar : {}", id);
        Navbar navbar = navbarRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(navbar));
    }

    /**
     * DELETE  /navbars/:id : delete the "id" navbar.
     *
     * @param id the id of the navbar to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/navbars/{id}")
    @Timed
    public ResponseEntity<Void> deleteNavbar(@PathVariable Long id) {
        log.debug("REST request to delete Navbar : {}", id);
        navbarRepository.delete(id);
        navbarSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/navbars?query=:query : search for the navbar corresponding
     * to the query.
     *
     * @param query the query of the navbar search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/navbars")
    @Timed
    public ResponseEntity<List<Navbar>> searchNavbars(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Navbars for query {}", query);
        Page<Navbar> page = navbarSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/navbars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
