package com.devlearning.devlerning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devlearning.devlerning.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByIdAndType(long id, String type);
}
