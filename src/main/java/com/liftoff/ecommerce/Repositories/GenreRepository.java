package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
