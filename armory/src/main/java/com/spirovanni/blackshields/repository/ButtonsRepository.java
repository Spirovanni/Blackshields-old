package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Buttons;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Buttons entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ButtonsRepository extends JpaRepository<Buttons, Long> {

}
