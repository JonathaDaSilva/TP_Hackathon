package com.avicola.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.util.List;

public class TriagemDtos {

    public record RespostaRequest(
            @NotNull Long perguntaId,
            @NotNull Long opcaoRespostaId
    ) {}

    public record SubmeterTriagemRequest(
            @NotEmpty @Valid List<RespostaRequest> respostas
    ) {}

    public record TriagemResultResponse(
            Long id,
            Long loteId,
            int pontuacaoTotal,
            String cenario,
            String cenarioRotulo,
            Instant respondidoEm
    ) {}
}
