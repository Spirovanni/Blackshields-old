package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Forms;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Forms entity.
 */
public interface FormsSearchRepository extends ElasticsearchRepository<Forms, Long> {
}
