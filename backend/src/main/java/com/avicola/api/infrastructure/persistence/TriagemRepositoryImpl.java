package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.repository.TriagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
class TriagemRepositoryImpl implements TriagemRepository {

    private final TriagemJpaRepository jpaRepository;

    @Override
    public Triagem salvar(Triagem triagem) {
        return jpaRepository.save(triagem);
    }

    @Override
    public Optional<Triagem> buscarPorIdELoteId(Long id, Long loteId) {
        return jpaRepository.findByIdAndLote_Id(id, loteId);
    }

    @Override
    public Optional<Triagem> buscarMaisRecentePorLoteId(Long loteId) {
        return jpaRepository.findFirstByLote_IdOrderByRespondidoEmDesc(loteId);
    }
}
