package com.avicola.api.domain.model;

import com.avicola.api.domain.vo.Identificacao;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "lotes")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "identificacao", nullable = false, length = 120))
    private Identificacao identificacao;

    @Column(nullable = false, updatable = false)
    private Instant criadoEm = Instant.now();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private Lote(Identificacao identificacao, Usuario usuario) {
        this.identificacao = identificacao;
        this.usuario = usuario;
    }

    public static Lote criar(Identificacao identificacao, Usuario usuario) {
        return new Lote(identificacao, usuario);
    }

    public void renomear(Identificacao novaIdentificacao) {
        this.identificacao = novaIdentificacao;
    }
}
