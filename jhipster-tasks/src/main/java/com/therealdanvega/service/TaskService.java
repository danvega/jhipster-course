package com.therealdanvega.service;

import com.therealdanvega.domain.Task;
import java.util.List;

/**
 * Service Interface for managing Task.
 */
public interface TaskService {

    /**
     * Save a task.
     *
     * @param task the entity to save
     * @return the persisted entity
     */
    Task save(Task task);

    /**
     *  Get all the tasks.
     *
     *  @return the list of entities
     */
    List<Task> findAll();

    /**
     *  Get the "id" task.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Task findOne(Long id);

    /**
     *  Delete the "id" task.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
