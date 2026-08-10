package com.avicola.api.controller;

import com.avicola.api.dto.RelatorioDtos.RelatorioResponse;
import com.avicola.api.dto.TriagemDtos.SubmeterTriagemRequest;
import com.avicola.api.dto.TriagemDtos.TriagemResultResponse;
import com.avicola.api.security.AuthenticatedUser;
import com.avicola.api.service.RelatorioPdfService;
import com.avicola.api.service.TriagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lotes/{loteId}/triagens")
@RequiredArgsConstructor
public class TriagemController {

    private final TriagemService triagemService;
    private final RelatorioPdfService relatorioPdfService;

    @PostMapping
    public ResponseEntity<TriagemResultResponse> submeter(
            @PathVariable Long loteId,
            @Valid @RequestBody SubmeterTriagemRequest request
    ) {
        TriagemResultResponse resultado = triagemService.submeter(loteId, request, AuthenticatedUser.getUsuarioId());
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/{triagemId}")
    public RelatorioResponse obterRelatorio(@PathVariable Long loteId, @PathVariable Long triagemId) {
        return triagemService.buscarRelatorio(loteId, triagemId, AuthenticatedUser.getUsuarioId());
    }

    @GetMapping("/{triagemId}/relatorio.pdf")
    public ResponseEntity<byte[]> baixarRelatorioPdf(@PathVariable Long loteId, @PathVariable Long triagemId) {
        RelatorioResponse relatorio = triagemService.buscarRelatorio(loteId, triagemId, AuthenticatedUser.getUsuarioId());
        byte[] pdf = relatorioPdfService.gerar(relatorio);

        ContentDisposition disposicao = ContentDisposition.attachment()
                .filename("relatorio-triagem-" + triagemId + ".pdf")
                .build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, disposicao.toString())
                .body(pdf);
    }
}
