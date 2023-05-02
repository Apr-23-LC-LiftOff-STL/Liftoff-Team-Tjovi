//package com.liftoff.ecommerce;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
////Annotation flags this class to Spring as containing configuration code. Implementing WebMvcConfigurer allows the call
////to the addInterceptors method during startup to register the authenticationFilter.
//@Configuration
//public class WebApplicationConfig implements WebMvcConfigurer {
//
//    //makes authenticationFilter available as a Spring-managed class
//    @Bean
//    public AuthenticationFilter authenticationFilter(){
//        return new AuthenticationFilter();
//    }
//
//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(authenticationFilter());
//    }
//
//
//}
