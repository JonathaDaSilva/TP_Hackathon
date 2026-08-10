package com.avicola.api.controller;

import com.avicola.api.dto.LoteDtos.LotePaginaResponse;
import com.avicola.api.dto.LoteDtos.LoteRequest;
import com.avicola.api.dto.LoteDtos.LoteResponse;
import com.avicola.api.security.AuthenticatedUser;
import com.avicola.api.service.LoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/lotes")
@RequiredArgsConstructor
public class LoteController {

    private final LoteService loteService;

    @GetMapping
    public LotePaginaResponse listar(
            @RequestParam(required = false) Integer pagina,
            @RequestParam(required = false) Integer tamanho
    ) {
        return loteService.listar(AuthenticatedUser.getUsuarioId(), pagina, tamanho);
    }

    @GetMapping("/{id}")
    public LoteResponse obterPorId(@PathVariable Long id) {
        return loteService.obterPorId(id, AuthenticatedUser.getUsuarioId());
    }

    @PostMapping
    public ResponseEntity<LoteResponse> criar(@Valid @RequestBody LoteRequest request) {
        LoteResponse response = loteService.criar(request, AuthenticatedUser.getUsuarioId());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public LoteResponse atualizar(@PathVariable Long id, @Valid @RequestBody LoteRequest request) {
        return loteService.atualizar(id, request, AuthenticatedUser.getUsuarioId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable Long id) {
        loteService.remover(id, AuthenticatedUser.getUsuarioId());
        return ResponseEntity.noContent().build();
    }
}
