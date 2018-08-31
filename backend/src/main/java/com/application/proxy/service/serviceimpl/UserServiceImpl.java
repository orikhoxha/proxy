package com.application.proxy.service.serviceimpl;


import com.application.proxy.dao.RoleDao;
import com.application.proxy.dao.UserDao;
import com.application.proxy.domain.User;
import com.application.proxy.domain.security.Role;
import com.application.proxy.domain.security.UserRole;
import com.application.proxy.service.UserService;
import com.application.proxy.utility.SecurityUtility;
import org.apache.catalina.security.SecurityUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
public class UserServiceImpl implements UserService {

	private static final Logger LOG = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private RoleDao roleDao;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) {
		User localUser = userDao.findByUsername(user.getUsername());
		LOG.info("getting in here");

		if (localUser != null) {
			LOG.info("user {} already exists. Nothing will be done.", user.getUsername());
		} else {
			for (UserRole ur : userRoles) {
				roleDao.save(ur.getRole());
			}



			user.getUserRoles().addAll(userRoles);

			localUser = userDao.save(user);
		}

		return localUser;
	}

    @Override
    public User registerUser(User user) {

	    user.setPassword(SecurityUtility.passwordEncoder().encode(user.getPassword()));
        Role role1 = new Role();
        role1.setRoleId(0);
        role1.setName("ROLE_USER");

        Set<UserRole> userRoles = new HashSet<>();

        userRoles.add(new UserRole(user, role1));

        user.getUserRoles().addAll(userRoles);

        return userDao.save(user);
    }

    @Override
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}

}