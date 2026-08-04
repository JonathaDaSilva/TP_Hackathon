package com.avicola.api.controller;

import com.avicola.api.dto.TriagemDtos.SubmeterTriagemRequest;
import com.avicola.api.dto.TriagemDtos.TriagemResultResponse;
import com.avicola.api.security.AuthenticatedUser;
import com.avicola.api.service.TriagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @PostMapping
    public ResponseEntity<TriagemResultResponse> submeter(
            @PathVariable Long loteId,
            @Valid @RequestBody SubmeterTriagemRequest request
    ) {
        TriagemResultResponse resultado = triagemService.submeter(loteId, request, AuthenticatedUser.getUsuarioId());
        return ResponseEntity.ok(resultado);
    }
}
