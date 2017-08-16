package com.therealdanvega.blog.service.impl;

import com.therealdanvega.blog.service.EntryService;
import com.therealdanvega.blog.domain.Entry;
import com.therealdanvega.blog.repository.EntryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Entry.
 */
@Service
@Transactional
public class EntryServiceImpl implements EntryService{

    private final Logger log = LoggerFactory.getLogger(EntryServiceImpl.class);
    
    @Inject
    private EntryRepository entryRepository;
    
    /**
     * Save a entry.
     * 
     * @param entry the entity to save
     * @return the persisted entity
     */
    public Entry save(Entry entry) {
        log.debug("Request to save Entry : {}", entry);
        Entry result = entryRepository.save(entry);
        return result;
    }

    /**
     *  Get all the entries.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Entry> findAll(Pageable pageable) {
        log.debug("Request to get all Entries");
        Page<Entry> result = entryRepository.findAll(pageable); 
        return result;
    }

    /**
     *  Get one entry by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Entry findOne(Long id) {
        log.debug("Request to get Entry : {}", id);
        Entry entry = entryRepository.findOneWithEagerRelationships(id);
        return entry;
    }

    /**
     *  Delete the  entry by id.
     *  
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Entry : {}", id);
        entryRepository.delete(id);
    }
}
