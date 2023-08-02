package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.ShoppingCart;

import jakarta.persistence.Table;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long> {

    List<ShoppingCart> findByCustomerId(Long customerId);

}