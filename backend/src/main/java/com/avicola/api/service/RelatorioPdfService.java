package com.avicola.api.service;

import com.avicola.api.dto.RelatorioDtos.RelatorioResponse;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class RelatorioPdfService {

    private static final DateTimeFormatter FORMATO_DATA =
            DateTimeFormatter.ofPattern("dd/MM/yyyy 'às' HH:mm").withZone(ZoneId.of("America/Sao_Paulo"));

    private final TemplateEngine templateEngine;

    public byte[] gerar(RelatorioResponse relatorio) {
        Context context = new Context();
        context.setVariable("relatorio", relatorio);
        context.setVariable("respondidoEmFormatado", FORMATO_DATA.format(relatorio.respondidoEm()));

        String html = templateEngine.process("relatorio-pdf", context);

        try (ByteArrayOutputStream saida = new ByteArrayOutputStream()) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(saida);
            builder.run();
            return saida.toByteArray();
        } catch (IOException e) {
            throw new IllegalStateException("Falha ao gerar o PDF do relatório.", e);
        }
    }
}
