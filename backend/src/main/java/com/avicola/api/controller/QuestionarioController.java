package com.avicola.api.controller;

import com.avicola.api.dto.QuestionarioDtos.CategoriaComPerguntasResponse;
import com.avicola.api.service.QuestionarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questionario")
@RequiredArgsConstructor
public class QuestionarioController {

    private final QuestionarioService questionarioService;

    @GetMapping
    public List<CategoriaComPerguntasResponse> listar() {
        return questionarioService.listarQuestionario();
    }
}
