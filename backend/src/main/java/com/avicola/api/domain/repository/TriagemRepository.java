package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Triagem;

import java.util.Optional;

public interface TriagemRepository {
    Triagem salvar(Triagem triagem);
    Optional<Triagem> buscarPorIdELoteId(Long id, Long loteId);
    Optional<Triagem> buscarMaisRecentePorLoteId(Long loteId);
}
