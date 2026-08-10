package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Triagem;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TriagemRepository {
    Triagem salvar(Triagem triagem);
    Optional<Triagem> buscarPorIdELoteId(Long id, Long loteId);
    Optional<Triagem> buscarMaisRecentePorLoteId(Long loteId);

    /**
     * Busca, em uma única consulta, o id da triagem mais recente de cada lote
     * informado. Usado para evitar N+1 ao listar vários lotes de uma vez
     * (ver {@code LoteService.listar}) — sem isso seria uma consulta por lote.
     */
    Map<Long, Long> buscarUltimasTriagensPorLoteIds(List<Long> loteIds);
}
