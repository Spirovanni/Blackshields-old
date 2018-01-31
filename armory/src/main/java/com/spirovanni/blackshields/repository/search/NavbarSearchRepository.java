package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Navbar;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Navbar entity.
 */
public interface NavbarSearchRepository extends ElasticsearchRepository<Navbar, Long> {
}
