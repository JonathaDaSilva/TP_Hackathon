package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.MensagemContato;
import org.springframework.data.jpa.repository.JpaRepository;

interface MensagemContatoJpaRepository extends JpaRepository<MensagemContato, Long> {
}
