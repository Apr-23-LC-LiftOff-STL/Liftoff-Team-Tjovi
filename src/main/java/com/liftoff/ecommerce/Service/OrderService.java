package com.liftoff.ecommerce.Service;


import com.liftoff.ecommerce.Models.CompletedOrder;
import com.liftoff.ecommerce.Models.CompletedOrderItem;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Models.ShoppingCart;
import com.liftoff.ecommerce.Repositories.CompletedOrderRepository;
import com.liftoff.ecommerce.Repositories.CompletedOrderedItemRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.DecimalFormat;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CompletedOrderRepository completedOrderRepository;

    @Autowired
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    public ResponseEntity<?> createNewOrder(Customer customer){
        CompletedOrder newOrder = new CompletedOrder(customer);
        newOrder.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
        completedOrderRepository.save(newOrder);

        List<ShoppingCart> cartItemsToOrder = shoppingCartRepository.findByCustomerId(customer.getId());
        for(ShoppingCart currentCart:cartItemsToOrder){
            CompletedOrderItem orderItem = new CompletedOrderItem(newOrder, currentCart.getMovieId(),
                    currentCart.getQuantity(), currentCart.getTotalPrice());
            completedOrderedItemRepository.save(orderItem);
        }

        setTotalOrderPrice(newOrder);
        completedOrderRepository.save(newOrder);

        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    public ResponseEntity<?> returnAllCompletedOrders(Long customerId){
        List<CompletedOrder> completedOrders = completedOrderRepository.findByCustomerId(customerId);
        if(completedOrders.size()>0){
            return new ResponseEntity<>(completedOrders, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void setTotalOrderPrice(CompletedOrder completedOrder){
        Double totalOrderPrice=0.0;

        List<CompletedOrderItem> orderItems = completedOrderedItemRepository.findByCompletedOrderId(completedOrder.getId());

        for(CompletedOrderItem currentItem:orderItems){
            totalOrderPrice += currentItem.getTotalPrice();
        }

        completedOrder.setTotalOrderPrice(totalOrderPrice);
    }
}
