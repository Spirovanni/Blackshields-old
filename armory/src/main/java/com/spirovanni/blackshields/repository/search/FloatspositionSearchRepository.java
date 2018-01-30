package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Floatsposition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Floatsposition entity.
 */
public interface FloatspositionSearchRepository extends ElasticsearchRepository<Floatsposition, Long> {
}
