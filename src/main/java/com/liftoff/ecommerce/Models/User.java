package com.liftoff.ecommerce.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Entity
public class User extends AbstractEntity{

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

//    @Email
    @NotNull
    private String username;

    @NotNull
    private String pwHash;

    public User(){}

    public User(String email, String password) {
        this.username = email;
        this.pwHash = encoder.encode(password);
    }


    public String getEmail() {
        return username;
    }

    public boolean isMatchingPassword(String password){
        return encoder.matches(password, pwHash);
    }
}
