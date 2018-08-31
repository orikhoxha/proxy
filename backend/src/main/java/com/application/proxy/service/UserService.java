package com.application.proxy.service;


import com.application.proxy.domain.User;
import com.application.proxy.domain.security.UserRole;

import java.util.Set;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles) throws Exception;
	User registerUser(User user);
	User save(User user);
	User findByUsername(String username);


}
