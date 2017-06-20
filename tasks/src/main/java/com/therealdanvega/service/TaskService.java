package com.therealdanvega.service;

import com.therealdanvega.domain.Task;

public interface TaskService {

    Iterable<Task> list();

    Task save(Task task);
}
