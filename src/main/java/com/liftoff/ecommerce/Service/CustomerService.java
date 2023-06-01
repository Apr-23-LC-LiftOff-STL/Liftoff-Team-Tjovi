package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.Customer;
import com.liftoff.ecommerce.Repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @Autowired
    private CustomerRepository customerRepository;

    public ResponseEntity<?> returnCustomerInformation(String email){
        Customer customer = shoppingCartService.findCustomer(email);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    public ResponseEntity<?> editCustomerInformation(String email, Customer customer){
        Customer customerInformationToBeEdited = shoppingCartService.findCustomer(email);

        customerInformationToBeEdited.setEmail(customer.getEmail());
        customerInformationToBeEdited.setFirstName(customer.getFirstName());
        customerInformationToBeEdited.setLastName(customer.getLastName());
        customerInformationToBeEdited.setMobileNumber(customer.getMobileNumber());
        customerInformationToBeEdited.setStreetAddress(customer.getStreetAddress());
        customerInformationToBeEdited.setSuiteNumber(customer.getSuiteNumber());
        customerInformationToBeEdited.setCity(customer.getCity());
        customerInformationToBeEdited.setState(customer.getState());
        customerInformationToBeEdited.setZipCode(customer.getZipCode());

        customerRepository.save(customerInformationToBeEdited);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
