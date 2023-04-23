package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Movie;
import org.springframework.data.repository.CrudRepository;

public interface MovieRepository extends CrudRepository<Movie,Long> {

}
