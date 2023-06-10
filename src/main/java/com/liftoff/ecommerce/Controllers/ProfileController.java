package com.liftoff.ecommerce.Controllers;


import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import com.liftoff.ecommerce.Service.CustomerService;
import com.liftoff.ecommerce.Service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private PasswordEncoder passwordEncoder;
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

    @RequestMapping("/isUser")
    public ResponseEntity<?> isUser(@PathVariable String email) {
        Customer customer = shoppingCartService.findCustomer(email);

        if (!customer.equals(null)){
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@PathVariable String email, @RequestBody String newPassword){
        Customer customer = shoppingCartService.findCustomer(email);
        String hashPwd = passwordEncoder.encode(newPassword);

        customer.setPwd(hashPwd);

        customerRepository.save(customer);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
