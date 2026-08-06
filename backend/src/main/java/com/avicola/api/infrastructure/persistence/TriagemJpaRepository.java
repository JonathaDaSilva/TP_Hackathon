package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface TriagemJpaRepository extends JpaRepository<Triagem, Long> {
    Optional<Triagem> findByIdAndLote_Id(Long id, Long loteId);
    Optional<Triagem> findFirstByLote_IdOrderByRespondidoEmDesc(Long loteId);
}
