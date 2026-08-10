package com.avicola.api.service;

import com.avicola.api.domain.model.Categoria;
import com.avicola.api.domain.model.Pergunta;
import com.avicola.api.domain.repository.PerguntaRepository;
import com.avicola.api.dto.QuestionarioDtos.CategoriaComPerguntasResponse;
import com.avicola.api.dto.QuestionarioDtos.OpcaoRespostaResponse;
import com.avicola.api.dto.QuestionarioDtos.PerguntaResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionarioService {

    private final PerguntaRepository perguntaRepository;

    public List<CategoriaComPerguntasResponse> listarQuestionario() {
        List<Pergunta> perguntas = perguntaRepository.listarTodasComOpcoes();

        Map<Long, String> nomePorCategoria = new LinkedHashMap<>();
        Map<Long, List<PerguntaResponse>> perguntasPorCategoria = new LinkedHashMap<>();

        for (Pergunta pergunta : perguntas) {
            Categoria categoria = pergunta.getCategoria();
            nomePorCategoria.putIfAbsent(categoria.getId(), categoria.getNome());

            List<OpcaoRespostaResponse> opcoes = pergunta.getOpcoes().stream()
                    .map(o -> new OpcaoRespostaResponse(o.getId(), o.getTexto()))
                    .toList();

            perguntasPorCategoria
                    .computeIfAbsent(categoria.getId(), id -> new ArrayList<>())
                    .add(new PerguntaResponse(pergunta.getId(), pergunta.getEnunciado(), opcoes));
        }

        return nomePorCategoria.entrySet().stream()
                .map(entry -> new CategoriaComPerguntasResponse(
                        entry.getKey(), entry.getValue(), perguntasPorCategoria.get(entry.getKey())))
                .toList();
    }
}
