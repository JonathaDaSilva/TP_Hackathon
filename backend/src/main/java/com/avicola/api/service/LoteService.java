package com.avicola.api.service;

import com.avicola.api.domain.model.Lote;
import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.repository.LoteRepository;
import com.avicola.api.domain.repository.TriagemRepository;
import com.avicola.api.domain.repository.UsuarioRepository;
import com.avicola.api.domain.vo.Identificacao;
import com.avicola.api.dto.LoteDtos.LoteRequest;
import com.avicola.api.dto.LoteDtos.LoteResponse;
import com.avicola.api.exception.RecursoNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoteService {

    private final LoteRepository loteRepository;
    private final UsuarioRepository usuarioRepository;
    private final TriagemRepository triagemRepository;

    @Transactional(readOnly = true)
    public List<LoteResponse> listar(Long usuarioId) {
        return loteRepository.buscarPorUsuarioId(usuarioId)
                .stream()
                .map(this::paraResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public LoteResponse obterPorId(Long id, Long usuarioId) {
        return paraResponse(buscarOuFalhar(id, usuarioId));
    }

    @Transactional
    public LoteResponse criar(LoteRequest request, Long usuarioId) {
        Usuario usuario = usuarioRepository.buscarPorId(usuarioId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        Lote lote = Lote.criar(new Identificacao(request.identificacao()), usuario);
        loteRepository.salvar(lote);

        return paraResponse(lote);
    }

    @Transactional
    public LoteResponse atualizar(Long id, LoteRequest request, Long usuarioId) {
        Lote lote = buscarOuFalhar(id, usuarioId);
        lote.renomear(new Identificacao(request.identificacao()));
        return paraResponse(lote);
    }

    @Transactional
    public void remover(Long id, Long usuarioId) {
        loteRepository.remover(buscarOuFalhar(id, usuarioId));
    }

    private Lote buscarOuFalhar(Long id, Long usuarioId) {
        return loteRepository.buscarPorIdEUsuarioId(id, usuarioId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Lote não encontrado."));
    }

    private LoteResponse paraResponse(Lote lote) {
        Long ultimaTriagemId = triagemRepository.buscarMaisRecentePorLoteId(lote.getId())
                .map(Triagem::getId)
                .orElse(null);
        return new LoteResponse(lote.getId(), lote.getIdentificacao().getValor(), lote.getCriadoEm(), ultimaTriagemId);
    }
}
