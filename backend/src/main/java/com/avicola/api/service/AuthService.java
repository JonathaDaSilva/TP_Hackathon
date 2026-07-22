package com.avicola.api.service;

import com.avicola.api.domain.model.Usuario;
import com.avicola.api.domain.repository.UsuarioRepository;
import com.avicola.api.domain.vo.Email;
import com.avicola.api.dto.AuthDtos.AuthResponse;
import com.avicola.api.dto.AuthDtos.LoginRequest;
import com.avicola.api.dto.AuthDtos.RegistrarRequest;
import com.avicola.api.dto.AuthDtos.UsuarioResponse;
import com.avicola.api.exception.ConflitoException;
import com.avicola.api.exception.CredenciaisInvalidasException;
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
        Email email = new Email(request.email());

        if (usuarioRepository.existePorEmail(email)) {
            throw new ConflitoException("Já existe um usuário cadastrado com este e-mail.");
        }

        Usuario usuario = Usuario.registrar(request.nome(), email, passwordEncoder.encode(request.senha()));
        usuarioRepository.salvar(usuario);

        return montarResposta(usuario);
    }

    public AuthResponse login(LoginRequest request) {
        Email email = new Email(request.email());

        Usuario usuario = usuarioRepository.buscarPorEmail(email)
                .orElseThrow(() -> new CredenciaisInvalidasException("E-mail ou senha inválidos."));

        if (!passwordEncoder.matches(request.senha(), usuario.getSenhaHash())) {
            throw new CredenciaisInvalidasException("E-mail ou senha inválidos.");
        }

        return montarResposta(usuario);
    }

    private AuthResponse montarResposta(Usuario usuario) {
        var tokenGerado = jwtService.gerarToken(usuario);
        var usuarioResponse = new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail().getValor());
        return new AuthResponse(tokenGerado.token(), tokenGerado.expiraEm(), usuarioResponse);
    }
}
