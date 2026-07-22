package com.avicola.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public class LoteDtos {

    public record LoteRequest(
            @NotBlank @Size(min = 2, max = 120) String identificacao
    ) {}

    public record LoteResponse(Long id, String identificacao, Instant criadoEm) {}
}
