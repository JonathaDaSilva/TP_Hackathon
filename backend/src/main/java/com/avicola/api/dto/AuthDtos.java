package com.avicola.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public class AuthDtos {

    public record RegistrarRequest(
            @NotBlank @Size(min = 2, max = 120) String nome,
            @NotBlank @Email String email,
            @NotBlank
            @Pattern(
                    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{10,15}$",
                    message = "A senha deve ter entre 10 e 15 caracteres e incluir letra maiúscula, "
                            + "letra minúscula, número e caractere especial."
            )
            String senha
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String senha
    ) {}

    public record UsuarioResponse(Long id, String nome, String email) {}

    public record AuthResponse(String token, Instant expiraEm, UsuarioResponse usuario) {}
}
