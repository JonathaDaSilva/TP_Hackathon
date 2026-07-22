package com.avicola.api.controller;

import com.avicola.api.dto.ContatoDtos.ContatoRequest;
import com.avicola.api.service.ContatoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/contato")
@RequiredArgsConstructor
public class ContatoController {

    private final ContatoService contatoService;

    @PostMapping
    public Map<String, String> enviar(@Valid @RequestBody ContatoRequest request) {
        contatoService.enviar(request);
        return Map.of("mensagem", "Mensagem enviada com sucesso. Em breve entraremos em contato.");
    }
}
