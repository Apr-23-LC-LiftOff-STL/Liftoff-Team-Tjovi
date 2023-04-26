package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;


import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie,Long>, JpaSpecificationExecutor<Movie>{
}

