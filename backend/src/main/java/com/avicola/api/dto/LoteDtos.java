package com.avicola.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.List;

public class LoteDtos {

    public record LoteRequest(
            @NotBlank @Size(min = 2, max = 120) String identificacao
    ) {}

    public record LoteResponse(Long id, String identificacao, Instant criadoEm, Long ultimaTriagemId) {}

    public record LotePaginaResponse(
            List<LoteResponse> conteudo,
            int pagina,
            int tamanho,
            long totalElementos,
            int totalPaginas
    ) {}
}
