package com.avicola.api.domain.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "triagens")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Triagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lote_id", nullable = false)
    private Lote lote;

    @Column(nullable = false)
    private int pontuacaoTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Cenario cenario;

    @Column(nullable = false, updatable = false)
    private Instant respondidoEm = Instant.now();

    @OneToMany(mappedBy = "triagem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RespostaTriagem> respostas = new ArrayList<>();

    private Triagem(Lote lote) {
        this.lote = lote;
    }

    public static Triagem concluir(Lote lote, List<RespostaEscolhida> escolhas) {
        if (escolhas == null || escolhas.isEmpty()) {
            throw new IllegalArgumentException("A triagem deve ter ao menos uma resposta.");
        }

        Triagem triagem = new Triagem(lote);

        int total = 0;
        for (RespostaEscolhida escolha : escolhas) {
            triagem.respostas.add(RespostaTriagem.registrar(triagem, escolha.pergunta(), escolha.opcaoResposta()));
            total += escolha.opcaoResposta().getPeso();
        }

        triagem.pontuacaoTotal = total;
        triagem.cenario = Cenario.calcular(total);

        return triagem;
    }
}
