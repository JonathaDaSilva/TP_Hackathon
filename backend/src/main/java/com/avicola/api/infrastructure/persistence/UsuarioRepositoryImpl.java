package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.repository.UsuarioRepository;
import com.avicola.api.domain.vo.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
class UsuarioRepositoryImpl implements UsuarioRepository {

    private final UsuarioJpaRepository jpaRepository;

    @Override
    public Usuario salvar(Usuario usuario) {
        return jpaRepository.save(usuario);
    }

    @Override
    public Optional<Usuario> buscarPorId(Long id) {
        return jpaRepository.findById(id);
    }

    @Override
    public Optional<Usuario> buscarPorEmail(Email email) {
        return jpaRepository.findByEmail_Valor(email.getValor());
    }

    @Override
    public boolean existePorEmail(Email email) {
        return jpaRepository.existsByEmail_Valor(email.getValor());
    }
}
