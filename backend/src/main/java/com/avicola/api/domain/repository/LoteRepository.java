package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Lote;

import java.util.Optional;

public interface LoteRepository {
    Lote salvar(Lote lote);
    Pagina<Lote> buscarPorUsuarioId(Long usuarioId, int pagina, int tamanho);
    Optional<Lote> buscarPorIdEUsuarioId(Long id, Long usuarioId);
    void remover(Lote lote);
}
