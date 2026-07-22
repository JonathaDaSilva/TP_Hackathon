package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.vo.Email;

import java.util.Optional;

public interface UsuarioRepository {
    Usuario salvar(Usuario usuario);
    Optional<Usuario> buscarPorId(Long id);
    Optional<Usuario> buscarPorEmail(Email email);
    boolean existePorEmail(Email email);
}
