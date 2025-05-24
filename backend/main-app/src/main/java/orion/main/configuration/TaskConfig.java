package orion.main.configuration;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "orion.main.repository")
@EntityScan(basePackages = "orion.main.entity")
public class TaskConfig {

}

