package com.application.proxy;

import com.application.proxy.dao.RoleDao;
import com.application.proxy.domain.User;
import com.application.proxy.domain.security.Role;
import com.application.proxy.domain.security.UserRole;
import com.application.proxy.service.UserService;
import com.application.proxy.utility.SecurityUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ProxyApplication implements CommandLineRunner {

	@Autowired
	UserService userService;

	@Autowired
	RoleDao roleDao;

	public static void main(String[] args) {
		SpringApplication.run(ProxyApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User user1 = new User();
		user1.setEnabled(true);
		user1.setUsername("omar");


		user1.setPassword(SecurityUtility.passwordEncoder().encode("omar"));

		Role role1 = new Role();
		role1.setRoleId(0);
		role1.setName("ROLE_ADMIN");

		Set<UserRole> userRoles = new HashSet<>();

		userRoles.add(new UserRole(user1, role1));
		userService.createUser(user1, userRoles);

		Role role2 = new Role();
		role2.setRoleId(1);
		role2.setName("ROLE_USER");
		roleDao.save(role2);
	}
}
