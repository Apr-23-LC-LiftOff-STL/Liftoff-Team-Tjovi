package com.liftoff.ecommerce.Controllers;


import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins="http://localhost:3000")
@RestController
public class LoginController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Customer customer){
        Customer savedCustomer=null;
        ResponseEntity response=null;
        try{
            String hashPwd = passwordEncoder.encode(customer.getPwd());
            customer.setPassword(hashPwd);
            savedCustomer=customerRepository.save(customer);
            if (savedCustomer.getId() > 0) {
                response=ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body("Given user details are successfully register");
            }
        }catch(Exception ex){
            response=ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An exception occurred due to " + ex.getMessage());
        }
        return response;
    }
}