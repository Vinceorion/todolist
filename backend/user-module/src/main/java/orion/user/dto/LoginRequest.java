package orion.user.dto;

import lombok.Data;

@Data
public class LoginRequest {
    String email;
    String password;

}
