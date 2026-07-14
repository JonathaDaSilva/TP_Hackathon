package com.avicola.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public class AuthDtos {

    public record RegistrarRequest(
            @NotBlank @Size(min = 2, max = 120) String nome,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 100) String senha
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String senha
    ) {}

    public record UsuarioResponse(Long id, String nome, String email) {}

    public record AuthResponse(String token, Instant expiraEm, UsuarioResponse usuario) {}
}
