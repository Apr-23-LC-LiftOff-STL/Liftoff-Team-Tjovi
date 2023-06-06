package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.CompletedOrder;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface CompletedOrderRepository extends CrudRepository<CompletedOrder, Long> {

    List<CompletedOrder> findByCustomerId(Long id);

}
