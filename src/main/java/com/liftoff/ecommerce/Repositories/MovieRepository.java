package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface MovieRepository extends CrudRepository<Movie,Long> {

}
