package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findByUsername(String username);

}
