package com.application.proxy.dao;

import com.application.proxy.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserDao extends CrudRepository<User,Long> {
	User findByUsername(String username);
}
