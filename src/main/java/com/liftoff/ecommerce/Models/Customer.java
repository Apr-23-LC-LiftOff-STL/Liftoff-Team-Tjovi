package com.liftoff.ecommerce.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;


import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="customer")
public class Customer {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @Column(name = "customer_id")
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    @Column(name = "mobile_number")
    private String mobileNumber;

    private String streetAddress;

    private String suiteNumber;

    private String city;

    private String state;

    private Long zipCode;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;

    @JsonIgnore
    private String role;

    @Column(name = "create_dt")
    private String createDt;

    @JsonIgnore
    @OneToMany(mappedBy="customer",fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Authority> authorities;

    @JsonIgnore
    @OneToMany(mappedBy = "customer", fetch=FetchType.EAGER)
    private Set<ShoppingCart> shoppingCart;

    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, String mobileNumber, String streetAddress,
                    String suiteNumber, String city, String state, Long zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.streetAddress = streetAddress;
        this.suiteNumber = suiteNumber;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSuiteNumber() {
        return suiteNumber;
    }

    public void setSuiteNumber(String suiteNumber) {
        this.suiteNumber = suiteNumber;
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

    public Long getZipCode() {
        return zipCode;
    }

    public void setZipCode(Long zipCode) {
        this.zipCode = zipCode;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getCreateDt() {
        return createDt;
    }

    public void setCreateDt(String createDt) {
        this.createDt = createDt;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void addAuthority(Authority authority) {
        if (this.authorities == null) {
            this.authorities = new HashSet<>();
        }
        this.authorities.add(authority);
        authority.setCustomer(this);
    }

    public Set<ShoppingCart> getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(Set<ShoppingCart> shoppingCart) {
        this.shoppingCart = shoppingCart;
    }
}
