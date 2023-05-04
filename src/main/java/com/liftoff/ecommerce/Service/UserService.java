package com.liftoff.ecommerce.Service;

import com.liftoff.ecommerce.Models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    public User findByUserName(String userName);

}
