package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Floatsposition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Floatsposition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FloatspositionRepository extends JpaRepository<Floatsposition, Long> {

}
