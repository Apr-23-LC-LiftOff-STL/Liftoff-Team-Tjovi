package com.liftoff.ecommerce.Models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginFormDTO {

    @NotNull
//    @NotBlank
//    @Email
    private String username;

    @NotNull
//    @NotBlank
//    @Size(min=8, max=16, message = "Invalid password. Must be between 8 and 16 characters.")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String email) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
