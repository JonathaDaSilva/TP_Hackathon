package com.avicola.api.security;

import com.avicola.api.domain.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationMinutes;

    public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-minutes}") long expirationMinutes
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationMinutes = expirationMinutes;
    }

    public record TokenGerado(String token, Instant expiraEm) {}

    public TokenGerado gerarToken(Usuario usuario) {
        Instant agora = Instant.now();
        Instant expiraEm = agora.plus(expirationMinutes, ChronoUnit.MINUTES);

        String token = Jwts.builder()
                .subject(usuario.getId().toString())
                .claim("email", usuario.getEmail().getValor())
                .claim("nome", usuario.getNome())
                .issuedAt(Date.from(agora))
                .expiration(Date.from(expiraEm))
                .signWith(key)
                .compact();

        return new TokenGerado(token, expiraEm);
    }

    public Claims validarEExtrairClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
