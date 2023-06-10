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

    private final ShoppingCartRepository shoppingCartRepository;
    private final CompletedOrderRepository completedOrderRepository;
    private final CompletedOrderedItemRepository completedOrderedItemRepository;
    private final MovieRepository movieRepository;

    @Autowired
    public OrderService(ShoppingCartRepository shoppingCartRepository,
                        CompletedOrderRepository completedOrderRepository,
                        CompletedOrderedItemRepository completedOrderedItemRepository,
                        MovieRepository movieRepository){
        this.shoppingCartRepository = shoppingCartRepository;
        this.completedOrderRepository = completedOrderRepository;
        this.completedOrderedItemRepository = completedOrderedItemRepository;
        this.movieRepository = movieRepository;
    }

    public ResponseEntity<?> createNewOrder(Customer customer) {
        CompletedOrder newOrder = new CompletedOrder(customer, customer.getEmail());
        newOrder.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));
        completedOrderRepository.save(newOrder);

        long totalOrderQuantity = 0;
        List<ShoppingCart> cartItemsToOrder = shoppingCartRepository.findByCustomerId(customer.getId());

        if (cartItemsToOrder.isEmpty()) {
            return new ResponseEntity<>(NO_CARTS_FOUND, HttpStatus.NOT_FOUND);
        }
        for (ShoppingCart currentCart : cartItemsToOrder) {
            Movie orderedMovie = movieRepository.findById(currentCart.getMovieId())
                    .orElseThrow(() -> new RuntimeException(NO_MOVIES_FOUND));

            String orderedMovieTitle = orderedMovie.getTitle();
            CompletedOrderItem orderItem = new CompletedOrderItem(newOrder, currentCart.getMovieId(), orderedMovieTitle,
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

    public ResponseEntity<?> returnAllCompletedOrders(){
        List<CompletedOrder> allCompletedOrders = (List<CompletedOrder>) completedOrderRepository.findAll();

        if(allCompletedOrders.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(allCompletedOrders, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> returnAllCompletedOrdersByCustomer(Long customerId){
        List<CompletedOrder> allCompletedCustomerOrders = completedOrderRepository.findByCustomerId(customerId);

        if(allCompletedCustomerOrders.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(allCompletedCustomerOrders, HttpStatus.OK);
        }
    }

    public ResponseEntity<?> returnMostRecentCompletedOrder(Long customerId){
        List<CompletedOrder> mostRecentCompletedOrder = completedOrderRepository.findByCustomerId(customerId);

        if(mostRecentCompletedOrder.isEmpty()){
            return new ResponseEntity<>(NO_ORDERS_FOUND, HttpStatus.NOT_FOUND);
        } else{
            return new ResponseEntity<>(mostRecentCompletedOrder, HttpStatus.OK);
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
