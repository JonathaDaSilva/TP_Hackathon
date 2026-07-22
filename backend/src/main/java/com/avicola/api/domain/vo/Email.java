package com.avicola.api.domain.vo;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.util.regex.Pattern;

@Embeddable
@EqualsAndHashCode
public class Email {

    private static final Pattern FORMATO = Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$");

    private String valor;

    protected Email() {
        // exigido pelo JPA
    }

    public Email(String valor) {
        if (valor == null || valor.isBlank()) {
            throw new IllegalArgumentException("E-mail não pode ser vazio.");
        }

        String normalizado = valor.trim().toLowerCase();
        if (!FORMATO.matcher(normalizado).matches()) {
            throw new IllegalArgumentException("E-mail em formato inválido: " + valor);
        }

        this.valor = normalizado;
    }

    public String getValor() {
        return valor;
    }

    @Override
    public String toString() {
        return valor;
    }
}
