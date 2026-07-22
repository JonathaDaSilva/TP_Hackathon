package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Lote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

interface LoteJpaRepository extends JpaRepository<Lote, Long> {
    List<Lote> findByUsuario_IdOrderByCriadoEmDesc(Long usuarioId);
    Optional<Lote> findByIdAndUsuario_Id(Long id, Long usuarioId);
}
