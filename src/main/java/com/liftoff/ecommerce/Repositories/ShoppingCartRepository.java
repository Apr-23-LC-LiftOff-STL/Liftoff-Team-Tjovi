package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.ShoppingCart;
import org.springframework.data.repository.CrudRepository;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart,Integer> {
}
