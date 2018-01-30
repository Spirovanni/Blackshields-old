package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Sizing;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Sizing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SizingRepository extends JpaRepository<Sizing, Long> {

}
