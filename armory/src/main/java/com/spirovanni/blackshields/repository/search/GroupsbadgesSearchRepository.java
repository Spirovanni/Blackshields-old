package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Groupsbadges;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Groupsbadges entity.
 */
public interface GroupsbadgesSearchRepository extends ElasticsearchRepository<Groupsbadges, Long> {
}
