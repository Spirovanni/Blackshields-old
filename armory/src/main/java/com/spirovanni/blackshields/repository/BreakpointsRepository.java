package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Breakpoints;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Breakpoints entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BreakpointsRepository extends JpaRepository<Breakpoints, Long> {

}
