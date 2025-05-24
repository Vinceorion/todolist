package orion.main.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Order(2)
public class SpringSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return  http.securityMatcher("/h2-console/**","/api/task/**")
        .csrf(csrf -> csrf.disable())// Désactiver CSRF pour H2 (utile uniquement en développement)
        .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 🔥 ici on désactive les sessions
            )
        .headers(headers -> headers.frameOptions(frame -> frame.disable()))// Nécessaire pour l'affichage des frames pour H2
        .authorizeHttpRequests(auth ->{
            auth.requestMatchers("/h2-console/**").permitAll();// Nécessaire pour l'affichage des frames H2
            auth.requestMatchers("/api/task/**").authenticated();
            auth.anyRequest().authenticated();
            })
        .build();
    }

}
