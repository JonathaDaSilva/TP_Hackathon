package com.avicola.api.domain.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "respostas_triagem",
        uniqueConstraints = @UniqueConstraint(columnNames = {"triagem_id", "pergunta_id"})
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RespostaTriagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "triagem_id", nullable = false)
    private Triagem triagem;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pergunta_id", nullable = false)
    private Pergunta pergunta;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "opcao_resposta_id", nullable = false)
    private OpcaoResposta opcaoResposta;

    @Column(nullable = false)
    private int pesoRegistrado;

    private RespostaTriagem(Triagem triagem, Pergunta pergunta, OpcaoResposta opcaoResposta) {
        this.triagem = triagem;
        this.pergunta = pergunta;
        this.opcaoResposta = opcaoResposta;
        this.pesoRegistrado = opcaoResposta.getPeso();
    }

    static RespostaTriagem registrar(Triagem triagem, Pergunta pergunta, OpcaoResposta opcaoResposta) {
        if (!opcaoResposta.getPergunta().getId().equals(pergunta.getId())) {
            throw new IllegalArgumentException("A opção informada não pertence à pergunta informada.");
        }
        return new RespostaTriagem(triagem, pergunta, opcaoResposta);
    }
}
