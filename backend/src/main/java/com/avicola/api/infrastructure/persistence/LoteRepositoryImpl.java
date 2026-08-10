package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Lote;
import com.avicola.api.domain.repository.LoteRepository;
import com.avicola.api.domain.repository.Pagina;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

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
    public Pagina<Lote> buscarPorUsuarioId(Long usuarioId, int pagina, int tamanho) {
        Page<Lote> resultado = jpaRepository.findByUsuario_IdOrderByCriadoEmDesc(usuarioId, PageRequest.of(pagina, tamanho));
        return new Pagina<>(
                resultado.getContent(),
                resultado.getNumber(),
                resultado.getSize(),
                resultado.getTotalElements(),
                resultado.getTotalPages()
        );
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
