//package com.liftoff.ecommerce.Models;
//
//import jakarta.persistence.Entity;
//import jakarta.validation.constraints.NotNull;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Entity
//public class User extends AbstractEntity {
//
//    //Will be used to create and verify password hashes
//    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//
//    @NotNull
//    private String username;
//
//    @NotNull
//    private String pwHash;
//
//    private String firstName;
//
//    private String lastName;
//
////    private int phoneNumberOne;
//////
//////    private int phoneNumberTwo;
//////
//////    private int phoneNumberThree;
//////
//////    private String phoneNumberAll;
//
//    private String phoneNumber;
//
//    private String streetAddress;
//
//    private String city;
//
//
////    private StateSelector stateSelector;
//
//    private String state;
//
//    private int zipCode;
//
//    public User() {}
//
////    public User(String username, String password, String firstName, String lastName, int phoneNumberOne, int phoneNumberTwo, int phoneNumberThree,String phoneNumberAll, String streetAddress, String city, StateSelector stateSelector, int zipCode) {
////        this.username = username;
////        this.pwHash=encoder.encode(password);
////        this.firstName = firstName;
////        this.lastName = lastName;
////        this.phoneNumberOne = phoneNumberOne;
////        this.phoneNumberTwo = phoneNumberTwo;
////        this.phoneNumberThree = phoneNumberThree;
////        this.phoneNumberAll = phoneNumberOne + "-" + phoneNumberTwo + "-" + phoneNumberThree;
////        this.streetAddress = streetAddress;
////        this.city = city;
////        this.stateSelector=stateSelector;
////        this.zipCode = zipCode;
////    }
//
//
//    public User(String username, String password, String firstName, String lastName, String phoneNumber, String streetAddress, String city, String state, int zipCode) {
//        this.username = username;
//        this.pwHash = encoder.encode(password);
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.phoneNumber = phoneNumber;
//        this.streetAddress = streetAddress;
//        this.city = city;
//        this.state=state;
//        this.zipCode = zipCode;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
////    public int getPhoneNumberOne() {
////        return phoneNumberOne;
////    }
////
////    public void setPhoneNumberOne(int phoneNumberOne) {
////        this.phoneNumberOne = phoneNumberOne;
////    }
////
////    public int getPhoneNumberTwo() {
////        return phoneNumberTwo;
////    }
////
////    public void setPhoneNumberTwo(int phoneNumberTwo) {
////        this.phoneNumberTwo = phoneNumberTwo;
////    }
////
////    public int getPhoneNumberThree() {
////        return phoneNumberThree;
////    }
////
////    public void setPhoneNumberThree(int phoneNumberThree) {
////        this.phoneNumberThree = phoneNumberThree;
////    }
//
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getStreetAddress() {
//        return streetAddress;
//    }
//
//    public void setStreetAddress(String streetAddress) {
//        this.streetAddress = streetAddress;
//    }
//
//    public String getCity() {
//        return city;
//    }
//
//    public void setCity(String city) {
//        this.city = city;
//    }
//
////    public StateSelector getStateSelector() {
////        return stateSelector;
////    }
////
////    public void setStateSelector(StateSelector stateSelector) {
////        this.stateSelector = stateSelector;
////    }
//
//
//    public String getState() {
//        return state;
//    }
//
//    public void setState(String state) {
//        this.state = state;
//    }
//
//    public int getZipCode() {
//        return zipCode;
//    }
//
//    public void setZipCode(int zipCode) {
//        this.zipCode = zipCode;
//    }
//
//    public boolean isMatchingPassword(String password) {
//        return encoder.matches(password, pwHash);
//    }
//
//}