package com.therealdanvega.blog.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.therealdanvega.blog.domain.Blog;
import com.therealdanvega.blog.service.BlogService;
import com.therealdanvega.blog.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Blog.
 */
@RestController
@RequestMapping("/api")
public class BlogResource {

    private final Logger log = LoggerFactory.getLogger(BlogResource.class);
        
    @Inject
    private BlogService blogService;
    
    /**
     * POST  /blogs : Create a new blog.
     *
     * @param blog the blog to create
     * @return the ResponseEntity with status 201 (Created) and with body the new blog, or with status 400 (Bad Request) if the blog has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/blogs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to save Blog : {}", blog);
        if (blog.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("blog", "idexists", "A new blog cannot already have an ID")).body(null);
        }
        Blog result = blogService.save(blog);
        return ResponseEntity.created(new URI("/api/blogs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("blog", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blogs : Updates an existing blog.
     *
     * @param blog the blog to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated blog,
     * or with status 400 (Bad Request) if the blog is not valid,
     * or with status 500 (Internal Server Error) if the blog couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/blogs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Blog> updateBlog(@Valid @RequestBody Blog blog) throws URISyntaxException {
        log.debug("REST request to update Blog : {}", blog);
        if (blog.getId() == null) {
            return createBlog(blog);
        }
        Blog result = blogService.save(blog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("blog", blog.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blogs : get all the blogs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of blogs in body
     */
    @RequestMapping(value = "/blogs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Blog> getAllBlogs() {
        log.debug("REST request to get all Blogs");
        return blogService.findAll();
    }

    /**
     * GET  /blogs/:id : get the "id" blog.
     *
     * @param id the id of the blog to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the blog, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/blogs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Blog> getBlog(@PathVariable Long id) {
        log.debug("REST request to get Blog : {}", id);
        Blog blog = blogService.findOne(id);
        return Optional.ofNullable(blog)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /blogs/:id : delete the "id" blog.
     *
     * @param id the id of the blog to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/blogs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        log.debug("REST request to delete Blog : {}", id);
        blogService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("blog", id.toString())).build();
    }

}
