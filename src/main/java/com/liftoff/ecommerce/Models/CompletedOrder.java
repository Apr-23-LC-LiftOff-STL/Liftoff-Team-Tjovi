package com.liftoff.ecommerce.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;

@Entity
@Table(name="completed_orders")
public class CompletedOrder {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @Column(name = "order_id")
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "date_created")
    private String createDt;

    private Double totalOrderPrice;

    @OneToMany(mappedBy="completedOrder", fetch=FetchType.EAGER)
    private Set<CompletedOrderItem> completedOrderItems;

    public CompletedOrder() {
    }

    public CompletedOrder(Customer customer) {
        this.customer = customer;
    }

    public Long getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getCreateDt() {
        return createDt;
    }

    public void setCreateDt(String createDt) {
        this.createDt = createDt;
    }

    public Double getTotalOrderPrice() {
        return totalOrderPrice;
    }

    public void setTotalOrderPrice(Double totalOrderPrice) {
        this.totalOrderPrice = totalOrderPrice;
    }

    public Set<CompletedOrderItem> getCompletedOrderItems() {
        return completedOrderItems;
    }

    public void setCompletedOrderItems(Set<CompletedOrderItem> completedOrderItems) {
        this.completedOrderItems = completedOrderItems;
    }
}
