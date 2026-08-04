package com.avicola.api.service;

import com.avicola.api.domain.model.Lote;
import com.avicola.api.domain.model.OpcaoResposta;
import com.avicola.api.domain.model.Pergunta;
import com.avicola.api.domain.model.RespostaEscolhida;
import com.avicola.api.domain.model.Triagem;
import com.avicola.api.domain.repository.LoteRepository;
import com.avicola.api.domain.repository.PerguntaRepository;
import com.avicola.api.domain.repository.TriagemRepository;
import com.avicola.api.dto.TriagemDtos.RespostaRequest;
import com.avicola.api.dto.TriagemDtos.SubmeterTriagemRequest;
import com.avicola.api.dto.TriagemDtos.TriagemResultResponse;
import com.avicola.api.exception.RecursoNaoEncontradoException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TriagemService {

    private final LoteRepository loteRepository;
    private final PerguntaRepository perguntaRepository;
    private final TriagemRepository triagemRepository;

    @Transactional
    public TriagemResultResponse submeter(Long loteId, SubmeterTriagemRequest request, Long usuarioId) {
        Lote lote = loteRepository.buscarPorIdEUsuarioId(loteId, usuarioId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Lote não encontrado."));

        List<Pergunta> todasAsPerguntas = perguntaRepository.listarTodasComOpcoes();
        Map<Long, Pergunta> perguntasPorId = todasAsPerguntas.stream()
                .collect(Collectors.toMap(Pergunta::getId, p -> p));

        Set<Long> idsEsperados = perguntasPorId.keySet();
        Set<Long> idsRecebidos = request.respostas().stream()
                .map(RespostaRequest::perguntaId)
                .collect(Collectors.toSet());

        if (request.respostas().size() != todasAsPerguntas.size() || !idsRecebidos.equals(idsEsperados)) {
            throw new IllegalArgumentException("Todas as perguntas devem ser respondidas exatamente uma vez.");
        }

        List<RespostaEscolhida> escolhas = request.respostas().stream()
                .map(r -> paraEscolha(r, perguntasPorId))
                .toList();

        Triagem triagem = triagemRepository.salvar(Triagem.concluir(lote, escolhas));

        return new TriagemResultResponse(
                triagem.getId(),
                lote.getId(),
                triagem.getPontuacaoTotal(),
                triagem.getCenario().name(),
                triagem.getCenario().getRotulo(),
                triagem.getRespondidoEm()
        );
    }

    private RespostaEscolhida paraEscolha(RespostaRequest resposta, Map<Long, Pergunta> perguntasPorId) {
        Pergunta pergunta = perguntasPorId.get(resposta.perguntaId());
        OpcaoResposta opcao = pergunta.getOpcoes().stream()
                .filter(o -> o.getId().equals(resposta.opcaoRespostaId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Opção informada não pertence à pergunta informada."));
        return new RespostaEscolhida(pergunta, opcao);
    }
}
