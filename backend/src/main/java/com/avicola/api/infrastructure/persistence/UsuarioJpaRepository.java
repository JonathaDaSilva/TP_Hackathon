package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface UsuarioJpaRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail_Valor(String valor);
    boolean existsByEmail_Valor(String valor);
}
