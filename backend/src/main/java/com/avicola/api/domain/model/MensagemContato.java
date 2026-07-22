package com.avicola.api.domain.model;

import com.avicola.api.domain.vo.Email;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Table(name = "mensagens_contato")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MensagemContato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "email", nullable = false, length = 180))
    private Email email;

    @Column(nullable = false, length = 2000)
    private String mensagem;

    @Column(nullable = false, updatable = false)
    private Instant enviadoEm = Instant.now();

    private MensagemContato(String nome, Email email, String mensagem) {
        this.nome = validarNome(nome);
        this.email = email;
        this.mensagem = validarMensagem(mensagem);
    }

    public static MensagemContato registrar(String nome, Email email, String mensagem) {
        return new MensagemContato(nome, email, mensagem);
    }

    private static String validarNome(String nome) {
        if (nome == null || nome.trim().length() < 2) {
            throw new IllegalArgumentException("Nome deve ter ao menos 2 caracteres.");
        }
        return nome.trim();
    }

    private static String validarMensagem(String mensagem) {
        if (mensagem == null || mensagem.trim().length() < 5) {
            throw new IllegalArgumentException("Mensagem deve ter ao menos 5 caracteres.");
        }
        return mensagem.trim();
    }
}
