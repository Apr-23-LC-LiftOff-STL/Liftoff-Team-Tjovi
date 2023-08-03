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
import java.util.List;

@Service
public class OrderService {

    private static final String NO_ORDERS_FOUND = "No orders matching your criteria were found";
    private static final String NO_CARTS_FOUND = "No carts matching your criteria were found";
    private static final String NO_MOVIES_FOUND = "No movies matching your criteria were found";

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private CompletedOrderRepository completedOrderRepository;

    @Autowired
    private CompletedOrderedItemRepository completedOrderedItemRepository;

    @Autowired
    private MovieRepository movieRepository;

    public ResponseEntity<?> createNewOrder(Customer customer) {
        long totalOrderQuantity = 0;

// Find all shoppingCarts associated with customer and return them in a List<ShoppingCart> cartItemsToOrder
        List<ShoppingCart> cartItemsToOrder = shoppingCartRepository.findByCustomerId(customer.getId());
        if (cartItemsToOrder.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        }

// If returned List<ShoppingCart> is not empty. Initialize new CompletedOrder object newOrder, set newOrder date,
// and save newOrder to completedOrderRepo
        CompletedOrder newOrder = new CompletedOrder(customer, customer.getEmail());
        newOrder.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
        completedOrderRepository.save(newOrder);

// Loop through the List<ShoppingCart> of cartItemsToOrder
        for (ShoppingCart currentCart : cartItemsToOrder) {

// In each iteration:
    // 1) Search movieRepository by movieId passing currentCart.getMovieId() and assign to orderedMovie
            Movie orderedMovie = movieRepository.findById(currentCart.getMovieId())
                    .orElseThrow(() -> new RuntimeException(NO_MOVIES_FOUND));

    // 2) Get title from orderedMovie and assign to variable orderMovieTitle
            String orderedMovieTitle = orderedMovie.getTitle();

    // 3) Initialize new parameterized CompletedOrderItem as orderItem - assign to newOrder - other parameters
    // pulled from newly created and from current cart iteration
            CompletedOrderItem orderItem = new CompletedOrderItem(newOrder, currentCart.getMovieId(), orderedMovieTitle,
                    currentCart.getQuantity(), currentCart.getTotalPrice());

    // 4) pull quantity from current cart and add to totalOrderQuantity
            totalOrderQuantity += currentCart.getQuantity();

    // 5) Save orderItem to completedOrderedItemRepository
            completedOrderedItemRepository.save(orderItem);

    // 6) Delete currentCart from shoppingCartRepository
            shoppingCartRepository.delete(currentCart);
        }

// Set newOrder's totalOrderQuantity by passing it method variable totalOrderQuantity
        newOrder.setTotalOrderQuantity(totalOrderQuantity);

// Pass newOrder to service helper method this.setTotalOrderPrice to set the totalOrderPrice
        this.setTotalOrderPrice(newOrder);

// save newOrder to completedOrderRepository
        completedOrderRepository.save(newOrder);

// return new ResponseEntity<>
        return new ResponseEntity<> (HttpStatus.CREATED);
    }

    public ResponseEntity<?> returnAllCompletedOrders(){
        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();

        if(allCompletedOrders.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(allCompletedOrders, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> returnAllCompletedOrdersByCustomerId(Long customerId){
        List<CompletedOrder> allCompletedCustomerOrders = completedOrderRepository.findByCustomerId(customerId);

        if(allCompletedCustomerOrders.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(allCompletedCustomerOrders, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> returnMostRecentCompletedOrder(Long customerId){
        List<CompletedOrder> completedOrders = completedOrderRepository.findByCustomerId(customerId);

        if(completedOrders.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            CompletedOrder mostRecentOrder = completedOrders.get(completedOrders.size()-1);
            return new ResponseEntity<>(mostRecentOrder, HttpStatus.OK);

        }
    }

    public void setTotalOrderPrice(CompletedOrder completedOrder){
        Double totalOrderPrice=0.0;
        DecimalFormat decimalFormat = new DecimalFormat("0.00");

        List<CompletedOrderItem> orderItems = completedOrderedItemRepository.findByCompletedOrderId(completedOrder.getId());

        if(orderItems.size()>0){
            for(CompletedOrderItem currentItem:orderItems){
                totalOrderPrice += currentItem.getTotalPrice();
            }
            Double finalPrice = Double.parseDouble(decimalFormat.format(totalOrderPrice));
            completedOrder.setTotalOrderPrice(finalPrice);
        } else{
            throw new RuntimeException("Order items not found");
        }
    }
}
