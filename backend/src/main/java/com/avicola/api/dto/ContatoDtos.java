package com.avicola.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContatoDtos {

    public record ContatoRequest(
            @NotBlank @Size(min = 2, max = 120) String nome,
            @NotBlank @Email String email,
            @NotBlank @Size(min = 5, max = 2000) String mensagem
    ) {}
}
