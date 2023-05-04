package com.liftoff.ecommerce.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {

    // add support for JDBC
    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource){

        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        // define query to retrieve a user by username
        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "select user_id, pw, active from users where user_id=?");

        // define a query to retrieve teh authorities/roles by username
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "select user_id, role from roles where user_id=?");

        return jdbcUserDetailsManager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers(HttpMethod.GET, "/").hasRole("USER")
                        .requestMatchers(HttpMethod.GET, "/{id}").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.POST, "/{id}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/{id}").hasRole("ADMIN")

//                        .requestMatchers(HttpMethod.PUT, "/").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.DELETE, "/").hasRole("ADMIN")
        );
        // use HTTP Basic Authentication
        http.httpBasic();

        //disable Cross Site Request Forgery (CSRF)
        // in general, not required for stateless REST APIs that use POST, PUT, DELETE and/or PATCH
        http.csrf().disable();

        return http.build();
    }

//    @Bean
//    public InMemoryUserDetailsManager userDetailsManager(){
//
//        UserDetails john = User.builder()
//                .username("john")
//                .password("{noop}test123")
//                .roles("USER")
//                .build();
//
//        UserDetails mary = User.builder()
//                .username("mary")
//                .password("{noop}test123")
//                .roles("USER", "ADMIN")
//                .build();
//
//
//        return new InMemoryUserDetailsManager(john, mary);
//    }
}
