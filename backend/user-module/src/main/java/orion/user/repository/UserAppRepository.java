package orion.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import orion.user.entity.UserApp;


public interface UserAppRepository extends JpaRepository<UserApp, Integer> {
	public Optional<UserApp> findByEmail(String email);

    public boolean existsByEmail(String email);
	
}
