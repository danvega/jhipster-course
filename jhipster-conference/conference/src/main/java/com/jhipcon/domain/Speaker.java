package com.jhipcon.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Speaker.
 */
@Entity
@Table(name = "speaker")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Speaker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "twitter", nullable = false)
    private String twitter;

    @NotNull
    @Column(name = "bio", nullable = false)
    private String bio;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "speaker_sessions",
               joinColumns = @JoinColumn(name="speakers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="sessions_id", referencedColumnName="id"))
    private Set<Session> sessions = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Speaker firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Speaker lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Speaker email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTwitter() {
        return twitter;
    }

    public Speaker twitter(String twitter) {
        this.twitter = twitter;
        return this;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getBio() {
        return bio;
    }

    public Speaker bio(String bio) {
        this.bio = bio;
        return this;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Set<Session> getSessions() {
        return sessions;
    }

    public Speaker sessions(Set<Session> sessions) {
        this.sessions = sessions;
        return this;
    }

    public Speaker addSessions(Session session) {
        this.sessions.add(session);
        session.getSpeakers().add(this);
        return this;
    }

    public Speaker removeSessions(Session session) {
        this.sessions.remove(session);
        session.getSpeakers().remove(this);
        return this;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Speaker speaker = (Speaker) o;
        if (speaker.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), speaker.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Speaker{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", twitter='" + getTwitter() + "'" +
            ", bio='" + getBio() + "'" +
            "}";
    }
}
