package com.avicola.api.domain.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "opcoes_resposta")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OpcaoResposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pergunta_id", nullable = false)
    private Pergunta pergunta;

    @Column(nullable = false, length = 255)
    private String texto;

    @Column(nullable = false)
    private int peso;

    @Column(nullable = false)
    private int ordem;

    private OpcaoResposta(String texto, int peso, int ordem, Pergunta pergunta) {
        this.texto = validarTexto(texto);
        this.peso = validarPeso(peso);
        this.ordem = ordem;
        this.pergunta = pergunta;
    }

    public static OpcaoResposta criar(String texto, int peso, int ordem, Pergunta pergunta) {
        OpcaoResposta opcao = new OpcaoResposta(texto, peso, ordem, pergunta);
        pergunta.adicionarOpcao(opcao);
        return opcao;
    }

    private static String validarTexto(String texto) {
        if (texto == null || texto.trim().isEmpty()) {
            throw new IllegalArgumentException("Texto da opção de resposta não pode ser vazio.");
        }
        return texto.trim();
    }

    private static int validarPeso(int peso) {
        if (peso < 0 || peso > 3) {
            throw new IllegalArgumentException("Peso da opção de resposta deve estar entre 0 e 3.");
        }
        return peso;
    }
}
