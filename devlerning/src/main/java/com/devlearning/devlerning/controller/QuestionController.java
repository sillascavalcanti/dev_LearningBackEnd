package com.devlearning.devlerning.controller;

import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.devlearning.devlerning.dto.QuestionDTO;
import com.devlearning.devlerning.service.QuestionService;


@RestController
@RequestMapping("question")
@CrossOrigin
public class QuestionController{
    private static AtomicInteger _count = new AtomicInteger();
    // private static List<String> answer = List.of("print()", "input()", "scan()", "println()");
    // private static QuestionDTO questionDTO1 = new QuestionDTO("Qual é a função usada para imprimir algo na saída padrão?",answer);
    // private static QuestionDTO questionDTO2 = new QuestionDTO("Qual é a função usada para imprimir algo na saída padrão? esta e a 2",answer);
    // private static List<QuestionDTO> questionsDTO = List.of(questionDTO1, questionDTO2);
    private final QuestionService questionService;
    
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("count")
    public Integer test(){
        return _count.incrementAndGet();
    }

    @GetMapping("{type}/{id}")
    public ResponseEntity<QuestionDTO> getQuestion(@PathVariable long id, @PathVariable String type){
        return questionService.getQuestion(id, type);
    }
    

}

