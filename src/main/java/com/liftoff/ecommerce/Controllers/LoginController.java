package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.Authority;
import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
public class LoginController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Customer customer) {
        Customer savedCustomer = null;
        ResponseEntity response = null;
        List<Customer> duplicateEmailCheck = customerRepository.findByEmail(customer.getEmail());

        if(duplicateEmailCheck.size()>0){
            response = ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body("An account is already registered with this email");
        } else {
            try {
                String hashPwd = passwordEncoder.encode(customer.getPwd());
                customer.setPwd(hashPwd);
                customer.setCreateDt(String.valueOf(new Date(System.currentTimeMillis())));

                Authority userAuthority = new Authority();
                userAuthority.setName("ROLE_USER");
                customer.addAuthority(userAuthority);

                savedCustomer = customerRepository.save(customer);


                if (savedCustomer.getId() > 0) {
                    response = ResponseEntity
                            .status(HttpStatus.CREATED)
                            .body("Given user details are successfully registered");
                }
            } catch (Exception ex) {
                response = ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An exception occured due to " + ex.getMessage());
            }
        }
        return response;
    }

    @RequestMapping("/user")
    public Customer getUserDetailsAfterLogin(Authentication authentication) {
        List<Customer> customers = customerRepository.findByEmail(authentication.getName());
        if (customers.size() > 0) {
            return customers.get(0);
        } else {
            return null;
        }

    }

}
