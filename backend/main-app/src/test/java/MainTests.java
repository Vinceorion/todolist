import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import orion.main.Main;
import orion.main.controller.TaskController;
import orion.user.controller.UserController;

@SpringBootTest(classes = Main.class)
public class MainTests {
    @Autowired
    private  TaskController taskController;

    @Autowired
    private  UserController userController;

    @Test
    void contextLoads(){
        assertNotNull(taskController);
        assertNotNull(userController);
    }


}
