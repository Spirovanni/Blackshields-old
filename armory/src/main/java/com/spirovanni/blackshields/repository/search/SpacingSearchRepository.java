package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Spacing;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Spacing entity.
 */
public interface SpacingSearchRepository extends ElasticsearchRepository<Spacing, Long> {
}
