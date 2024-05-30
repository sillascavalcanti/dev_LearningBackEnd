package com.devlearning.devlerning.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.devlearning.devlerning.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
