package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

interface TriagemJpaRepository extends JpaRepository<Triagem, Long> {
    Optional<Triagem> findByIdAndLote_Id(Long id, Long loteId);
    Optional<Triagem> findFirstByLote_IdOrderByRespondidoEmDesc(Long loteId);

    /**
     * Busca a triagem mais recente de cada lote informado em uma única
     * consulta (DISTINCT ON é específico do Postgres). Evita repetir
     * findFirstByLote_IdOrderByRespondidoEmDesc uma vez por lote (N+1) ao
     * listar vários lotes de uma vez.
     */
    @Query(value = "SELECT DISTINCT ON (lote_id) lote_id AS loteId, id AS triagemId "
            + "FROM triagens WHERE lote_id IN (:loteIds) "
            + "ORDER BY lote_id, respondido_em DESC",
            nativeQuery = true)
    List<UltimaTriagemProjecao> findUltimasTriagensPorLoteIds(@Param("loteIds") List<Long> loteIds);

    interface UltimaTriagemProjecao {
        Long getLoteId();
        Long getTriagemId();
    }
}
