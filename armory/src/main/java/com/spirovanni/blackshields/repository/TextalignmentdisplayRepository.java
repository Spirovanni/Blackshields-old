package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Textalignmentdisplay;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Textalignmentdisplay entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TextalignmentdisplayRepository extends JpaRepository<Textalignmentdisplay, Long> {

}
