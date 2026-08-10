package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.repository.TriagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public Map<Long, Long> buscarUltimasTriagensPorLoteIds(List<Long> loteIds) {
        if (loteIds.isEmpty()) {
            return Map.of();
        }
        return jpaRepository.findUltimasTriagensPorLoteIds(loteIds).stream()
                .collect(Collectors.toMap(
                        TriagemJpaRepository.UltimaTriagemProjecao::getLoteId,
                        TriagemJpaRepository.UltimaTriagemProjecao::getTriagemId
                ));
    }
}
