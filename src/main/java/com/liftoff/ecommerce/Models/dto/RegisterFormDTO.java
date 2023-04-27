package com.liftoff.ecommerce.Models.dto;

public class RegisterFormDTO extends LoginFormDTO {

    private String verifyPassword;

    private String firstName;

    private String lastName;

    private Integer phoneNumberOne;

    private Integer phoneNumberTwo;

    private Integer phoneNumberThree;

    private String phoneNumberAll;

    private String streetAddress;

    private String city;

    private String state;

    private Integer zipCode;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getPhoneNumberOne() {
        return phoneNumberOne;
    }

    public void setPhoneNumberOne(Integer phoneNumberOne) {
        this.phoneNumberOne = phoneNumberOne;
    }

    public Integer getPhoneNumberTwo() {
        return phoneNumberTwo;
    }

    public void setPhoneNumberTwo(Integer phoneNumberTwo) {
        this.phoneNumberTwo = phoneNumberTwo;
    }

    public Integer getPhoneNumberThree() {
        return phoneNumberThree;
    }

    public void setPhoneNumberThree(Integer phoneNumberThree) {
        this.phoneNumberThree = phoneNumberThree;
    }

    public String getPhoneNumberAll() {
        this.phoneNumberAll = phoneNumberOne + "-" + phoneNumberTwo + "-" + phoneNumberThree;
        return phoneNumberAll;
    }

//    public void setPhoneNumberAll(String phoneNumberAll) {
//        this.phoneNumberAll = phoneNumberOne + "-" + phoneNumberTwo + "-" + phoneNumberThree;
//
//    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }
}