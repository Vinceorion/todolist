package orion.user.services;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import orion.user.entity.UserApp;
import orion.user.repository.UserAppRepository;

@Service
@RequiredArgsConstructor
public class UserAppService {

    private final UserAppRepository userAppRepository;

    private final JwtUtil jwtUtil;

    public boolean existsByEmail(String email) {
        return userAppRepository.existsByEmail(email);
    }

    public void saveUser(UserApp user){
        userAppRepository.save(user);
    }

    public UserApp findByEmail(String email){
        return userAppRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private String jwtGenerateToken(UserDetails userDetails){
        return this.jwtUtil.generateToken(userDetails);
    }

    public void addJwtCookieToResponse(UserDetails userDetails, HttpServletResponse response) {
        String cookie = ResponseCookie.from("jwt", jwtGenerateToken(userDetails))
        .httpOnly(true)
        .secure(true)
        .path("/")
        .maxAge(24 * 60 * 60)
        .sameSite("Strict")
        .build()
        .toString();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie);
    }

}
