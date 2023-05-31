package com.liftoff.ecommerce.Models;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="completed_order_items")
public class CompletedOrderItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO,generator="native")
    @GenericGenerator(name = "native",strategy = "native")
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="order_id")
    private CompletedOrder completedOrder;

    @Column(name="movie_id")
    private Long movieId;

    private Long quantity;

    private Double totalPrice;

    public CompletedOrderItem() {
    }

    public CompletedOrderItem(CompletedOrder completedOrder, Long movieId, Long quantity, Double totalPrice) {
        this.completedOrder = completedOrder;
        this.movieId = movieId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
    }

    public Long getOrderedItemId() {
        return id;
    }

    public CompletedOrder getCompletedOrder() {
        return completedOrder;
    }

    public void setCompletedOrder(CompletedOrder completedOrderId) {
        this.completedOrder = completedOrder;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
