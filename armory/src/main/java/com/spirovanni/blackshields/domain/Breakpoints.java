package com.spirovanni.blackshields.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.spirovanni.blackshields.domain.enumeration.Stage;

/**
 * A Breakpoints.
 */
@Entity
@Table(name = "breakpoints")
@Document(indexName = "breakpoints")
public class Breakpoints implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "stage", nullable = false)
    private Stage stage;

    @NotNull
    @Size(max = 65)
    @Column(name = "description", length = 65, nullable = false)
    private String description;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Breakpoints date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Stage getStage() {
        return stage;
    }

    public Breakpoints stage(Stage stage) {
        this.stage = stage;
        return this;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public String getDescription() {
        return description;
    }

    public Breakpoints description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Breakpoints picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Breakpoints pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Breakpoints breakpoints = (Breakpoints) o;
        if (breakpoints.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), breakpoints.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Breakpoints{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", stage='" + getStage() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            "}";
    }
}
