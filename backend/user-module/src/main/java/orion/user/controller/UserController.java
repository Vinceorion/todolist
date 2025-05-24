package orion.user.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import orion.user.configuration.CustomUserDetailsService;
import orion.user.dto.LoginRequest;
import orion.user.dto.UserRequest;
import orion.user.dto.UserResponse;
import orion.user.entity.Role;
import orion.user.entity.UserApp;
import orion.user.services.UserAppService;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserAppService userAppService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response ){
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            // Si l'authentification réussit, vous pouvez générer un token JWT ou une réponse appropriée
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            userAppService.addJwtCookieToResponse(userDetails, response);

            // Retourner une réponse JSON
            Map<String, String> body = new HashMap<>();
            body.put("message", "Login successful");
            return ResponseEntity.ok(body);
        } catch (AuthenticationException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String,String>> register(@RequestBody @Valid UserRequest userRequest, HttpServletResponse response ){
        if(userAppService.existsByEmail(userRequest.getEmail())){
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid request");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        UserApp user = UserApp.of(
            userRequest.getFirstName(),
            userRequest.getLastName(),
            userRequest.getEmail(),
            passwordEncoder.encode(userRequest.getPassword()),
            Set.of(Role.USER));
        userAppService.saveUser(user);

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getEmail());
        userAppService.addJwtCookieToResponse(userDetails, response);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message","User registered successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    @PostMapping("/logout")
public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
    // Supprimer le cookie en le vidant et en mettant maxAge à 0
    Cookie cookie = new Cookie("jwt", "");
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(0); // expire immédiatement
    response.addCookie(cookie);

    Map<String, String> responseBody = new HashMap<>();
    responseBody.put("message", "Logged out successfully");
    return ResponseEntity.ok(responseBody);
}

@Transactional
@GetMapping("/me")
public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
    // Assurer que l'utilisateur est authentifié
    String email = ((User)authentication.getPrincipal()).getUsername();
    UserApp user = userAppService.findByEmail(email);

    return ResponseEntity.ok(new UserResponse(
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getRoles()
    ));

}
}
