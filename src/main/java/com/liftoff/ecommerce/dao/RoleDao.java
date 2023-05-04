package com.liftoff.ecommerce.dao;

import com.liftoff.ecommerce.Models.Role;
import com.liftoff.ecommerce.Models.User;

public interface RoleDao {
    Role findById(Long id);
}
