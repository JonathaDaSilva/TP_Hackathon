package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Pergunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

interface PerguntaJpaRepository extends JpaRepository<Pergunta, Long> {

    @Query("SELECT DISTINCT p FROM Pergunta p "
            + "JOIN FETCH p.categoria c "
            + "JOIN FETCH p.opcoes "
            + "ORDER BY c.ordem ASC, p.ordem ASC")
    List<Pergunta> findAllComOpcoesOrdenado();
}
