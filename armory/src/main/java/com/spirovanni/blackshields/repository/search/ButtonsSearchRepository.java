package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Buttons;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Buttons entity.
 */
public interface ButtonsSearchRepository extends ElasticsearchRepository<Buttons, Long> {
}
