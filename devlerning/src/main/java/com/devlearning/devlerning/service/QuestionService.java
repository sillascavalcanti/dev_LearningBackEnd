package com.devlearning.devlerning.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.devlearning.devlerning.dto.QuestionDTO;
import com.devlearning.devlerning.entity.Question;
import com.devlearning.devlerning.repository.QuestionRepository;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public ResponseEntity<QuestionDTO> getQuestion(long id){
        try {
            Question question = questionRepository.findById(id).get();
            QuestionDTO questionDTO = new QuestionDTO(question.getContent(),
            List.of(question.getAnswer1(),
                    question.getAnswer2(),
                    question.getAnswer3(),
                    question.getAnswer4()
                    ));
                    return ResponseEntity.ok().body(questionDTO);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
