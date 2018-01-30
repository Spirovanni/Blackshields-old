package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Colorsbackground;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Colorsbackground entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColorsbackgroundRepository extends JpaRepository<Colorsbackground, Long> {

}
