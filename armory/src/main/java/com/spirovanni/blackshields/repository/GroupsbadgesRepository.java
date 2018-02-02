package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Groupsbadges;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Groupsbadges entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupsbadgesRepository extends JpaRepository<Groupsbadges, Long> {

}
