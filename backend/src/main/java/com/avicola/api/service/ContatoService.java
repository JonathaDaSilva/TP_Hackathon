package com.avicola.api.service;

import com.avicola.api.domain.model.MensagemContato;
import com.avicola.api.domain.repository.MensagemContatoRepository;
import com.avicola.api.domain.vo.Email;
import com.avicola.api.dto.ContatoDtos.ContatoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * O envio de e-mail em si acontece no frontend via EmailJS (gratuito, sem
 * servidor de e-mail). Este serviço só mantém o histórico das mensagens.
 */
@Service
@RequiredArgsConstructor
public class ContatoService {

    private final MensagemContatoRepository mensagemContatoRepository;

    @Transactional
    public void enviar(ContatoRequest request) {
        MensagemContato mensagem = MensagemContato.registrar(
                request.nome(), new Email(request.email()), request.tipo(), request.mensagem());
        mensagemContatoRepository.salvar(mensagem);
    }
}
