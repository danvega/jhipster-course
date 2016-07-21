package com.therealdanvega.blog.service;

import com.therealdanvega.blog.domain.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service Interface for managing Tag.
 */
public interface TagService {

    /**
     * Save a tag.
     * 
     * @param tag the entity to save
     * @return the persisted entity
     */
    Tag save(Tag tag);

    /**
     *  Get all the tags.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<Tag> findAll(Pageable pageable);

    /**
     *  Get the "id" tag.
     *  
     *  @param id the id of the entity
     *  @return the entity
     */
    Tag findOne(Long id);

    /**
     *  Delete the "id" tag.
     *  
     *  @param id the id of the entity
     */
    void delete(Long id);
}
