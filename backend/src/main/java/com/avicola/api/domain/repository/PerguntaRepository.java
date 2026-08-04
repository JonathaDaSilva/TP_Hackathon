package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Pergunta;

import java.util.List;

public interface PerguntaRepository {
    Pergunta salvar(Pergunta pergunta);
    List<Pergunta> listarTodasComOpcoes();
}
