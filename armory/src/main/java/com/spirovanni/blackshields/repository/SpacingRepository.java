package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Spacing;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Spacing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpacingRepository extends JpaRepository<Spacing, Long> {

}
