package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Lote;
import com.avicola.api.domain.repository.LoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
class LoteRepositoryImpl implements LoteRepository {

    private final LoteJpaRepository jpaRepository;

    @Override
    public Lote salvar(Lote lote) {
        return jpaRepository.save(lote);
    }

    @Override
    public List<Lote> buscarPorUsuarioId(Long usuarioId) {
        return jpaRepository.findByUsuario_IdOrderByCriadoEmDesc(usuarioId);
    }

    @Override
    public Optional<Lote> buscarPorIdEUsuarioId(Long id, Long usuarioId) {
        return jpaRepository.findByIdAndUsuario_Id(id, usuarioId);
    }

    @Override
    public void remover(Lote lote) {
        jpaRepository.delete(lote);
    }
}
