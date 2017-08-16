package com.therealdanvega.repository;

import com.therealdanvega.domain.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository  extends CrudRepository<Task, Long> {



}
