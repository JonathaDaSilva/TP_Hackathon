package com.avicola.api.domain.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "perguntas")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Pergunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @Column(nullable = false, length = 500)
    private String enunciado;

    @Column(nullable = false)
    private int ordem;

    @OneToMany(mappedBy = "pergunta", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("ordem ASC")
    private List<OpcaoResposta> opcoes = new ArrayList<>();

    private Pergunta(String enunciado, int ordem, Categoria categoria) {
        this.enunciado = validarEnunciado(enunciado);
        this.ordem = ordem;
        this.categoria = categoria;
    }

    public static Pergunta criar(String enunciado, int ordem, Categoria categoria) {
        return new Pergunta(enunciado, ordem, categoria);
    }

    void adicionarOpcao(OpcaoResposta opcao) {
        this.opcoes.add(opcao);
    }

    private static String validarEnunciado(String enunciado) {
        if (enunciado == null || enunciado.trim().isEmpty()) {
            throw new IllegalArgumentException("Enunciado da pergunta não pode ser vazio.");
        }
        return enunciado.trim();
    }
}
