//package com.liftoff.ecommerce.Config;
//
//
//import com.liftoff.ecommerce.Models.Customer;
//import com.liftoff.ecommerce.Repositories.CustomerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class CustomerUserDetails implements UserDetailsService {
//
//    @Autowired
//    private CustomerRepository customerRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        String userName, password = null;
//        List<GrantedAuthority> authorities=null;
//        List<Customer> customer = customerRepository.findByEmail(username);
//        if(customer.size()==0){
//            throw new UsernameNotFoundException("User details not found for the user: " + username);
//        } else {
//            userName= customer.get(0).getEmail();
//            password= customer.get(0).getPwd();
//            authorities=new ArrayList<>();
//            authorities.add(new SimpleGrantedAuthority(customer.get(0).getRole()));
//        }
//        return new User(userName, password, authorities);
//    }
//}
