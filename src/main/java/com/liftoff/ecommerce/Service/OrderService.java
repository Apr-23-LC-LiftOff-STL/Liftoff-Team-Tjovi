package com.liftoff.ecommerce.Service;


import com.liftoff.ecommerce.Models.*;
import com.liftoff.ecommerce.Repositories.CompletedOrderRepository;
import com.liftoff.ecommerce.Repositories.CompletedOrderedItemRepository;
import com.liftoff.ecommerce.Repositories.MovieRepository;
import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.DecimalFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CompletedOrderRepository completedOrderRepository;

    @Autowired
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<?> createNewOrder(Customer customer){
        CompletedOrder newOrder = new CompletedOrder(customer, customer.getEmail());
        newOrder.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
        completedOrderRepository.save(newOrder);
        long totalOrderQuantity = 0;

        List<ShoppingCart> cartItemsToOrder = shoppingCartRepository.findByCustomerId(customer.getId());
        for(ShoppingCart currentCart:cartItemsToOrder){
            CompletedOrderItem orderItem = new CompletedOrderItem(newOrder, currentCart.getMovieId(),
                    movieRepository.findById(currentCart.getMovieId()).get().getTitle(),
                    currentCart.getQuantity(), currentCart.getTotalPrice());
            totalOrderQuantity += currentCart.getQuantity();
            completedOrderedItemRepository.save(orderItem);
            shoppingCartRepository.delete(currentCart);
        }

        newOrder.setTotalOrderQuantity(totalOrderQuantity);
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

    public ResponseEntity<?> returnMostRecentCompletedOrder(Long customerId){
        List<CompletedOrder> completedOrders = completedOrderRepository.findByCustomerId(customerId);
        if(completedOrders.size()>0){
            return new ResponseEntity<>(completedOrders.get(completedOrders.size()-1), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public void setTotalOrderPrice(CompletedOrder completedOrder){
        Double totalOrderPrice=0.0;
        DecimalFormat decimalFormat = new DecimalFormat("0.00");

        List<CompletedOrderItem> orderItems = completedOrderedItemRepository.findByCompletedOrderId(completedOrder.getId());

        for(CompletedOrderItem currentItem:orderItems){
            totalOrderPrice += currentItem.getTotalPrice();
        }

        Double finalPrice = Double.parseDouble(decimalFormat.format(totalOrderPrice));
        completedOrder.setTotalOrderPrice(finalPrice);
    }
}
