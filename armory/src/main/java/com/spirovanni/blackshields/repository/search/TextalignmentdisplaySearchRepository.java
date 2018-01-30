package com.spirovanni.blackshields.repository.search;

import com.spirovanni.blackshields.domain.Textalignmentdisplay;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Textalignmentdisplay entity.
 */
public interface TextalignmentdisplaySearchRepository extends ElasticsearchRepository<Textalignmentdisplay, Long> {
}
