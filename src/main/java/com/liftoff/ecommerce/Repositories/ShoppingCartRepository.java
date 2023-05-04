package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.ShoppingCart;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;


import java.util.List;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart,Integer> {


}
