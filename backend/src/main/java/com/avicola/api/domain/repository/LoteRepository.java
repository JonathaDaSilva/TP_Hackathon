package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Lote;

import java.util.List;
import java.util.Optional;

public interface LoteRepository {
    Lote salvar(Lote lote);
    List<Lote> buscarPorUsuarioId(Long usuarioId);
    Optional<Lote> buscarPorIdEUsuarioId(Long id, Long usuarioId);
    void remover(Lote lote);
}
