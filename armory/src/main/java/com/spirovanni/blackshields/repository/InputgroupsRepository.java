package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Inputgroups;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Inputgroups entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InputgroupsRepository extends JpaRepository<Inputgroups, Long> {

}
