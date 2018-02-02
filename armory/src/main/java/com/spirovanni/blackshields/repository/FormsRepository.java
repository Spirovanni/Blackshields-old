package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Forms;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Forms entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormsRepository extends JpaRepository<Forms, Long> {

}
