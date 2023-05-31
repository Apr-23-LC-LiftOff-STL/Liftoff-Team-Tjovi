package com.liftoff.ecommerce.Models;

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
    private Long completedOrderId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "date_created")
    private String createDt;

    private Long totalOrderPrice;

    @OneToMany(mappedBy="completedOrderId", fetch=FetchType.EAGER)
    private Set<CompletedOrderItem> completedOrderItems;

    public Long getCompletedOrderId() {
        return completedOrderId;
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

    public Long getTotalOrderPrice() {
        return totalOrderPrice;
    }

    public void setTotalOrderPrice(Long totalOrderPrice) {
        this.totalOrderPrice = totalOrderPrice;
    }
}
