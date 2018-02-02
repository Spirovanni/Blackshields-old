package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Inputgroups;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Inputgroups entity.
 */
public interface InputgroupsSearchRepository extends ElasticsearchRepository<Inputgroups, Long> {
}
