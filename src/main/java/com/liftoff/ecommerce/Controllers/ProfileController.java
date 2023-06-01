package com.liftoff.ecommerce.Controllers;


import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/{email}")
    public ResponseEntity<?> returnCustomerInformation(@PathVariable String email){
        return customerService.returnCustomerInformation(email);
    }

    @PutMapping("/edit/{email}")
    public ResponseEntity<?> editCustomerInformation(@PathVariable String email, @RequestBody Customer customer){
        return customerService.editCustomerInformation(email, customer);
    }
}
