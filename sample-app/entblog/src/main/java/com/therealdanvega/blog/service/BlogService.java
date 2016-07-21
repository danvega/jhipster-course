package com.therealdanvega.blog.service;

import com.therealdanvega.blog.domain.Blog;

import java.util.List;

/**
 * Service Interface for managing Blog.
 */
public interface BlogService {

    /**
     * Save a blog.
     * 
     * @param blog the entity to save
     * @return the persisted entity
     */
    Blog save(Blog blog);

    /**
     *  Get all the blogs.
     *  
     *  @return the list of entities
     */
    List<Blog> findAll();

    /**
     *  Get the "id" blog.
     *  
     *  @param id the id of the entity
     *  @return the entity
     */
    Blog findOne(Long id);

    /**
     *  Delete the "id" blog.
     *  
     *  @param id the id of the entity
     */
    void delete(Long id);
}
