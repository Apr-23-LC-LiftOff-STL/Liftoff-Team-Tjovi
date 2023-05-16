package com.liftoff.ecommerce.Controllers;

import com.liftoff.ecommerce.Models.User;
import com.liftoff.ecommerce.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public void register(@RequestBody User user) {
        user.setPwd(passwordEncoder.encode(user.getPwd()));
        userRepository.save(user);
    }
}
