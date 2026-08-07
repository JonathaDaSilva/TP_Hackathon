package com.avicola.api.dto;

import java.time.Instant;
import java.util.List;

public class RelatorioDtos {

    public record RelatorioResponse(
            Long triagemId,
            Long loteId,
            String loteIdentificacao,
            int pontuacaoTotal,
            String cenario,
            String cenarioRotulo,
            Instant respondidoEm,
            String resumo,
            List<String> diagnostico,
            List<String> dicas
    ) {}
}
