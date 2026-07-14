package com.avicola.api.service;

import com.avicola.api.dto.AuthDtos.AuthResponse;
import com.avicola.api.dto.AuthDtos.LoginRequest;
import com.avicola.api.dto.AuthDtos.RegistrarRequest;
import com.avicola.api.dto.AuthDtos.UsuarioResponse;
import com.avicola.api.entity.Usuario;
import com.avicola.api.exception.ConflitoException;
import com.avicola.api.exception.CredenciaisInvalidasException;
import com.avicola.api.repository.UsuarioRepository;
import com.avicola.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse registrar(RegistrarRequest request) {
        String emailNormalizado = request.email().trim().toLowerCase();

        if (usuarioRepository.existsByEmail(emailNormalizado)) {
            throw new ConflitoException("Já existe um usuário cadastrado com este e-mail.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.nome().trim());
        usuario.setEmail(emailNormalizado);
        usuario.setSenhaHash(passwordEncoder.encode(request.senha()));

        usuarioRepository.save(usuario);

        return montarResposta(usuario);
    }

    public AuthResponse login(LoginRequest request) {
        String emailNormalizado = request.email().trim().toLowerCase();

        Usuario usuario = usuarioRepository.findByEmail(emailNormalizado)
                .orElseThrow(() -> new CredenciaisInvalidasException("E-mail ou senha inválidos."));

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new CredenciaisInvalidasException("E-mail ou senha inválidos.");
        }

        return montarResposta(usuario);
    }

    private AuthResponse montarResposta(Usuario usuario) {
        var tokenGerado = jwtService.gerarToken(usuario);
        var usuarioResponse = new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail());
        return new AuthResponse(tokenGerado.token(), tokenGerado.expiraEm(), usuarioResponse);
    }
}
