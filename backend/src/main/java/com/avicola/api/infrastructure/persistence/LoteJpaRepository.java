package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Lote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface LoteJpaRepository extends JpaRepository<Lote, Long> {
    Page<Lote> findByUsuario_IdOrderByCriadoEmDesc(Long usuarioId, Pageable pageable);
    Optional<Lote> findByIdAndUsuario_Id(Long id, Long usuarioId);
}
