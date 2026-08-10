package com.avicola.api.service;

import com.avicola.api.domain.model.Lote;
import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.repository.LoteRepository;
import com.avicola.api.domain.repository.Pagina;
import com.avicola.api.domain.repository.TriagemRepository;
import com.avicola.api.domain.repository.UsuarioRepository;
import com.avicola.api.domain.vo.Identificacao;
import com.avicola.api.dto.LoteDtos.LotePaginaResponse;
import com.avicola.api.dto.LoteDtos.LoteRequest;
import com.avicola.api.dto.LoteDtos.LoteResponse;
import com.avicola.api.exception.RecursoNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoteService {

    private static final int TAMANHO_PADRAO = 10;
    private static final int TAMANHO_MAXIMO = 100;

    private final LoteRepository loteRepository;
    private final UsuarioRepository usuarioRepository;
    private final TriagemRepository triagemRepository;

    @Transactional(readOnly = true)
    public LotePaginaResponse listar(Long usuarioId, Integer pagina, Integer tamanho) {
        int paginaValida = (pagina == null || pagina < 0) ? 0 : pagina;
        int tamanhoValido = (tamanho == null || tamanho < 1) ? TAMANHO_PADRAO : Math.min(tamanho, TAMANHO_MAXIMO);

        Pagina<Lote> paginaLotes = loteRepository.buscarPorUsuarioId(usuarioId, paginaValida, tamanhoValido);

        // Busca a última triagem de todos os lotes da página em uma única
        // consulta, em vez de uma consulta por lote (evita N+1 — ver
        // TriagemRepository.buscarUltimasTriagensPorLoteIds).
        List<Long> loteIds = paginaLotes.conteudo().stream().map(Lote::getId).toList();
        Map<Long, Long> ultimasTriagensPorLoteId = triagemRepository.buscarUltimasTriagensPorLoteIds(loteIds);

        List<LoteResponse> conteudo = paginaLotes.conteudo().stream()
                .map(lote -> paraResponse(lote, ultimasTriagensPorLoteId.get(lote.getId())))
                .toList();

        return new LotePaginaResponse(
                conteudo,
                paginaLotes.pagina(),
                paginaLotes.tamanho(),
                paginaLotes.totalElementos(),
                paginaLotes.totalPaginas()
        );
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
        return paraResponse(lote, ultimaTriagemId);
    }

    private LoteResponse paraResponse(Lote lote, Long ultimaTriagemId) {
        return new LoteResponse(lote.getId(), lote.getIdentificacao().getValor(), lote.getCriadoEm(), ultimaTriagemId);
    }
}
