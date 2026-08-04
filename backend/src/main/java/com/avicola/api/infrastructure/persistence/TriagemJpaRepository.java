package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Triagem;
import org.springframework.data.jpa.repository.JpaRepository;

interface TriagemJpaRepository extends JpaRepository<Triagem, Long> {
}
