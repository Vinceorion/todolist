package orion.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"orion.main", "orion.user"})
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}