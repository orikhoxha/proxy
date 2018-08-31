package com.application.proxy.dao;

import com.application.proxy.domain.security.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleDao extends CrudRepository<Role,Long> {
	Role findByName(String name);
}
