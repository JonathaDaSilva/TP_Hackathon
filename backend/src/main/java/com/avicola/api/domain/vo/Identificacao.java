package com.avicola.api.domain.vo;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class Identificacao {

    private String valor;

    protected Identificacao() {
        // exigido pelo JPA
    }

    public Identificacao(String valor) {
        if (valor == null || valor.trim().length() < 2 || valor.trim().length() > 120) {
            throw new IllegalArgumentException("Identificação do lote deve ter entre 2 e 120 caracteres.");
        }

        this.valor = valor.trim();
    }

    public String getValor() {
        return valor;
    }

    @Override
    public String toString() {
        return valor;
    }
}
