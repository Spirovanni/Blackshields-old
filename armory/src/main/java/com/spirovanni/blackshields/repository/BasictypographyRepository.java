package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Basictypography;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Basictypography entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BasictypographyRepository extends JpaRepository<Basictypography, Long> {

}
