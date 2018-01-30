package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Colorsbackground;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Colorsbackground entity.
 */
public interface ColorsbackgroundSearchRepository extends ElasticsearchRepository<Colorsbackground, Long> {
}
