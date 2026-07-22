package com.avicola.api.controller;

import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.repository.UsuarioRepository;
import com.avicola.api.dto.AuthDtos.UsuarioResponse;
import com.avicola.api.exception.RecursoNaoEncontradoException;
import com.avicola.api.security.AuthenticatedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;

    @GetMapping("/me")
    public UsuarioResponse me() {
        Usuario usuario = usuarioRepository.buscarPorId(AuthenticatedUser.getUsuarioId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Usuário não encontrado."));

        return new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail().getValor());
    }
}
