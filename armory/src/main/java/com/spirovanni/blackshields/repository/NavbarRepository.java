package com.spirovanni.blackshields.repository;

import com.spirovanni.blackshields.domain.Navbar;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Navbar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NavbarRepository extends JpaRepository<Navbar, Long> {

}
