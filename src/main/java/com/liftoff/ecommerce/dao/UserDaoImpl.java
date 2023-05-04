package com.liftoff.ecommerce.dao;

import com.liftoff.ecommerce.Models.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{

    private EntityManager entityManager;

    public UserDaoImpl(EntityManager theEntityManager){
        this.entityManager = theEntityManager;
    }

    @Override
    public User findByUserName(String theUserName){
    TypedQuery<User> theQuery = entityManager.createQuery("fromUser where userName=:uName", User.class);
    theQuery.setParameter("uName", theUserName);

    User theUser=null;
    try {
        theUser = theQuery.getSingleResult();
    } catch (Exception e) {
        theUser=null;
    }
    return theUser;
    }

}
