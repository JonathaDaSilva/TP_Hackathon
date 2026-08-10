package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Pergunta;
import com.avicola.api.domain.repository.PerguntaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
class PerguntaRepositoryImpl implements PerguntaRepository {

    private final PerguntaJpaRepository jpaRepository;

    @Override
    public Pergunta salvar(Pergunta pergunta) {
        return jpaRepository.save(pergunta);
    }

    @Override
    public List<Pergunta> listarTodasComOpcoes() {
        return jpaRepository.findAllComOpcoesOrdenado();
    }
}
