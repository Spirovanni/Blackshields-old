package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Breakpoints;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Breakpoints entity.
 */
public interface BreakpointsSearchRepository extends ElasticsearchRepository<Breakpoints, Long> {
}
