package orion.user.dto;

import java.util.Set;

import orion.user.entity.Role;

public record UserResponse(
    String firstName, 
    String lastName, 
    String email, 
    Set<Role> roles){}
