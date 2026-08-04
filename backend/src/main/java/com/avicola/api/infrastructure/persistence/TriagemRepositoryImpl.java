package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.repository.TriagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
class TriagemRepositoryImpl implements TriagemRepository {

    private final TriagemJpaRepository jpaRepository;

    @Override
    public Triagem salvar(Triagem triagem) {
        return jpaRepository.save(triagem);
    }
}
