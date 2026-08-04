package com.avicola.api.dto;

import java.util.List;

public class QuestionarioDtos {

    public record OpcaoRespostaResponse(Long id, String texto) {}

    public record PerguntaResponse(Long id, String enunciado, List<OpcaoRespostaResponse> opcoes) {}

    public record CategoriaComPerguntasResponse(Long id, String nome, List<PerguntaResponse> perguntas) {}
}
