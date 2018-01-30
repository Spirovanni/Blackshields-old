package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Sizing;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Sizing entity.
 */
public interface SizingSearchRepository extends ElasticsearchRepository<Sizing, Long> {
}
