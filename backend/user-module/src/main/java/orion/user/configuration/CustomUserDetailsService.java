package orion.user.configuration;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import orion.user.entity.Role;
import orion.user.entity.UserApp;
import orion.user.repository.UserAppRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserAppRepository userAppRepository;
    @Transactional
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserApp user = userAppRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        Set<String> roles = user.getRoles().stream()
        .map(Role::name)
        .collect(Collectors.toSet());
        return new User(
            user.getEmail(),
            user.getPassword(),
            roles.stream()
                .map(SimpleGrantedAuthority::new)
                .toList()
        );
    }

}
