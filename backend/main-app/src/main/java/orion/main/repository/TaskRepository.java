package orion.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import orion.main.entity.Task;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
