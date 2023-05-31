//package com.liftoff.ecommerce.Service;
//
//import com.liftoff.ecommerce.Models.Customer;
//import com.liftoff.ecommerce.Models.OrderHistory;
//import com.liftoff.ecommerce.Models.PurchasedCartItem;
//import com.liftoff.ecommerce.Models.ShoppingCart;
//import com.liftoff.ecommerce.Repositories.OrderHistoryRepository;
//import com.liftoff.ecommerce.Repositories.PurchasedCartItemRepository;
//import com.liftoff.ecommerce.Repositories.ShoppingCartRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class PurchasedItemService {
//
//    @Autowired
//    private ShoppingCartRepository shoppingCartRepository;
//
//    @Autowired
//    private OrderHistoryRepository orderHistoryRepository;
//
//    @Autowired
//    private PurchasedCartItemRepository purchasedCartItemRepository;
//
//    public ResponseEntity<?> createPurchasedItem(Customer customer){
//        OrderHistory orderHistory = new OrderHistory();
//        orderHistoryRepository.save(orderHistory);
//
//        List<ShoppingCart> cartItemsToPurchase = shoppingCartRepository.findByCustomerId(customer.getId());
//        for (ShoppingCart currentCart:cartItemsToPurchase){
//            PurchasedCartItem purchasedCartItem = (PurchasedCartItem) currentCart;
//            purchasedCartItem.setOrderHistory(orderHistory);
//            purchasedCartItemRepository.save(purchasedCartItem);
//        }
//    return ResponseEntity.ok(HttpStatus.CREATED);
//    }
//}
