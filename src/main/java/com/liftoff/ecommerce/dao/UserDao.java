package com.liftoff.ecommerce.dao;

import com.liftoff.ecommerce.Models.User;

public interface UserDao {

    User findByUserName(String userName);
}
