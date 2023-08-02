package com.liftoff.ecommerce.Repositories;

import com.liftoff.ecommerce.Models.CompletedOrderItem;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CompletedOrderedItemRepository extends CrudRepository<CompletedOrderItem, Long> {

    List<CompletedOrderItem> findByCompletedOrderId(Long id);
}
