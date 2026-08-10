package com.avicola.api.seed;

import com.avicola.api.domain.model.Categoria;
import com.avicola.api.domain.model.OpcaoResposta;
import com.avicola.api.domain.model.Pergunta;
import com.avicola.api.domain.repository.CategoriaRepository;
import com.avicola.api.domain.repository.PerguntaRepository;
import com.avicola.api.seed.QuestionarioSeedData.CategoriaSeed;
import com.avicola.api.seed.QuestionarioSeedData.OpcaoSeed;
import com.avicola.api.seed.QuestionarioSeedData.PerguntaSeed;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Popula o questionário de triagem (categorias, perguntas e opções) na
 * primeira inicialização. Não faz nada se já houver conteúdo — seguro para
 * rodar em toda subida da aplicação.
 */
@Component
@RequiredArgsConstructor
public class QuestionarioSeeder implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final PerguntaRepository perguntaRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (categoriaRepository.existeAlguma()) {
            return;
        }

        int ordemCategoria = 1;
        for (CategoriaSeed categoriaSeed : QuestionarioSeedData.CATEGORIAS) {
            Categoria categoria = categoriaRepository.salvar(Categoria.criar(categoriaSeed.nome(), ordemCategoria++));

            int ordemPergunta = 1;
            for (PerguntaSeed perguntaSeed : categoriaSeed.perguntas()) {
                Pergunta pergunta = Pergunta.criar(perguntaSeed.enunciado(), ordemPergunta++, categoria);

                int ordemOpcao = 1;
                for (OpcaoSeed opcaoSeed : perguntaSeed.opcoes()) {
                    OpcaoResposta.criar(opcaoSeed.texto(), opcaoSeed.peso(), ordemOpcao++, pergunta);
                }

                perguntaRepository.salvar(pergunta);
            }
        }
    }
}
