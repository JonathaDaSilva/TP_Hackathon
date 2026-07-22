package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.MensagemContato;
import com.avicola.api.domain.repository.MensagemContatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
class MensagemContatoRepositoryImpl implements MensagemContatoRepository {

    private final MensagemContatoJpaRepository jpaRepository;

    @Override
    public MensagemContato salvar(MensagemContato mensagem) {
        return jpaRepository.save(mensagem);
    }
}
