package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MovieRepository extends JpaRepository<Movie,Long>, JpaSpecificationExecutor<Movie>{
}

