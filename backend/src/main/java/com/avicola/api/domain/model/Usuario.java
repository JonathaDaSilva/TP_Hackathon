package com.avicola.api.domain.model;

import com.avicola.api.domain.vo.Email;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usuarios")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Embedded
    @AttributeOverride(name = "valor", column = @Column(name = "email", nullable = false, unique = true, length = 180))
    private Email email;

    @Column(nullable = false)
    private String senhaHash;

    @Column(nullable = false, updatable = false)
    private Instant criadoEm = Instant.now();

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lote> lotes = new ArrayList<>();

    private Usuario(String nome, Email email, String senhaHash) {
        this.nome = validarNome(nome);
        this.email = email;
        this.senhaHash = senhaHash;
    }

    public static Usuario registrar(String nome, Email email, String senhaHash) {
        return new Usuario(nome, email, senhaHash);
    }

    private static String validarNome(String nome) {
        if (nome == null || nome.trim().length() < 2) {
            throw new IllegalArgumentException("Nome deve ter ao menos 2 caracteres.");
        }
        return nome.trim();
    }
}
