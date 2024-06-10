package com.devlearning.devlerning.service;

import org.springframework.stereotype.Service;

import com.devlearning.devlerning.dto.AutenticationDTO;
import com.devlearning.devlerning.dto.UserDTO;
import com.devlearning.devlerning.entity.User;
import com.devlearning.devlerning.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    
    public void register(UserDTO userDTO){
        User user = new User();
        
        user.setUsername(userDTO.name());
        user.setPassword(userDTO.password());
        user.setEmail(userDTO.email());

        userRepository.save(user);
    }

    public UserDTO autication(AutenticationDTO autenticationDTO){
        var userOpitonal = userRepository.findByEmailAndPassword(autenticationDTO.email(), autenticationDTO.password());
        if(userOpitonal.isPresent()){
            User user = userOpitonal.get();
            UserDTO userDTO = new UserDTO(user.getUsername(), user.getEmail(), null);
            return userDTO;
        }
        return null;
    }
}
