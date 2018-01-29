package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Basictypography;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Basictypography entity.
 */
public interface BasictypographySearchRepository extends ElasticsearchRepository<Basictypography, Long> {
}
