package com.avicola.api.seed;

import java.util.List;

final class QuestionarioSeedData {

    private QuestionarioSeedData() {
    }

    record OpcaoSeed(String texto, int peso) {
    }

    record PerguntaSeed(String enunciado, List<OpcaoSeed> opcoes) {
    }

    record CategoriaSeed(String nome, List<PerguntaSeed> perguntas) {
    }

    private static OpcaoSeed opcao(String texto, int peso) {
        return new OpcaoSeed(texto, peso);
    }

    private static PerguntaSeed pergunta(String enunciado, OpcaoSeed... opcoes) {
        return new PerguntaSeed(enunciado, List.of(opcoes));
    }

    static final List<CategoriaSeed> CATEGORIAS = List.of(

            new CategoriaSeed("Qualidade da Casca", List.of(
                    pergunta(
                            "Como você classifica a limpeza da casca no momento que coleta os ovos?",
                            opcao("Limpa, sem sujidade aparente", 0),
                            opcao("Levemente suja (poeira ou penas)", 1),
                            opcao("Com manchas de fezes ou terra", 2),
                            opcao("Muito suja, com fezes e/ou sangue aderidos", 3)
                    ),
                    pergunta(
                            "Os ovos apresentam trincas ou rachaduras?",
                            opcao("Nenhuma trinca visível", 0),
                            opcao("Trincas raras: menos de 5% dos ovos", 1),
                            opcao("Trincas frequentes: entre 5% e 15% dos ovos", 2),
                            opcao("Trincas acima de 15% dos ovos", 3)
                    ),
                    pergunta(
                            "Qual a textura da casca?",
                            opcao("Casca íntegra e homogênea", 0),
                            opcao("Casca com crostas e/ou pontos hiperpigmentados", 1),
                            opcao("Casca rugosa e de textura irregular", 2),
                            opcao("Casca fina e/ou ovos sem casca", 3)
                    )
            )),

            new CategoriaSeed("Gema", List.of(
                    pergunta(
                            "Qual a coloração da gema?",
                            opcao("Está de acordo com o esperado", 0),
                            opcao("Está muito alaranjada", 1),
                            opcao("Está muito pálida", 2),
                            opcao("Está pálida e rompe com facilidade", 3)
                    ),
                    pergunta(
                            "As galinhas convivem com galos?",
                            opcao("Não, o plantel é sexado", 0),
                            opcao("Sim, mas só até a idade reprodutiva", 1),
                            opcao("Sim, e é observada a monta natural", 2),
                            opcao("Sim, e apresentam ovos galados", 3)
                    ),
                    pergunta(
                            "A gema permanece firme durante o manuseio ou rompe com facilidade?",
                            opcao("Gema firme, permanece íntegra durante todo o manuseio", 0),
                            opcao("Gema firme, com pequena deformação", 1),
                            opcao("Gema pouco firme, rompe-se com relativa facilidade", 2),
                            opcao("Gema muito frágil, rompe-se facilmente ao quebrar ou manipular o ovo", 3)
                    )
            )),

            new CategoriaSeed("Armazenamento", List.of(
                    pergunta(
                            "Como é o ambiente onde os ovos são armazenados?",
                            opcao("Local fresco, arejado, limpo e destinado exclusivamente aos ovos", 0),
                            opcao("Local limpo, mas compartilhado com outros itens como ração e insumos", 1),
                            opcao("Local com pouca ventilação e poeira", 2),
                            opcao("Local sujo ou úmido", 3)
                    ),
                    pergunta(
                            "De quanto em quanto tempo os ovos são coletados?",
                            opcao("Duas vezes ao dia", 0),
                            opcao("Diariamente", 1),
                            opcao("Dia sim, dia não", 2),
                            opcao("Intervalos irregulares/3 ou mais dias", 3)
                    )
            )),

            new CategoriaSeed("Nutrição", List.of(
                    pergunta(
                            "As galinhas recebem suplementação de cálcio e/ou vitamina D?",
                            opcao("Suplementação adequada de cálcio e vitamina D", 0),
                            opcao("Apenas cálcio ou apenas vitamina D", 1),
                            opcao("Suplementação irregular (mais ou menos que o recomendado) ou em quantidade insuficiente", 2),
                            opcao("Não recebem suplementação", 3)
                    ),
                    pergunta(
                            "Como é a disponibilidade e qualidade da água oferecida às aves?",
                            opcao("Sempre limpa, fresca e disponível", 0),
                            opcao("Disponível, mas às vezes com sujeira/sedimentos", 1),
                            opcao("Fornecimento insuficiente em parte do dia", 2),
                            opcao("Falta frequente ou água de qualidade duvidosa", 3)
                    )
            )),

            new CategoriaSeed("Albúmen", List.of(
                    pergunta(
                            "O albúmen (clara) é mais firme ou mais líquido quando o ovo é quebrado?",
                            opcao("Espesso e firme", 0),
                            opcao("Predominantemente firme, com pequena porção líquida", 1),
                            opcao("Predominantemente líquido", 2),
                            opcao("Muito líquido e espalha-se rapidamente", 3)
                    ),
                    pergunta(
                            "Você observa manchas de sangue ou de carne no interior dos ovos?",
                            opcao("Nunca observadas", 0),
                            opcao("Raramente observadas", 1),
                            opcao("Observadas ocasionalmente", 2),
                            opcao("Observadas com frequência", 3)
                    )
            )),

            new CategoriaSeed("Formato", List.of(
                    pergunta(
                            "Como você classifica o formato dos ovos?",
                            opcao("Todos com formato normal.", 0),
                            opcao("Poucos ovos deformados", 1),
                            opcao("Quantidade moderada de ovos deformados", 2),
                            opcao("Muitos ovos deformados", 3)
                    )
            )),

            new CategoriaSeed("Poedeiras", List.of(
                    pergunta(
                            "Qual a idade das galinhas poedeiras?",
                            opcao("Até 30 semanas", 0),
                            opcao("31 a 50 semanas", 1),
                            opcao("51 a 70 semanas", 2),
                            opcao("Mais de 70 semanas", 3)
                    )
            )),

            new CategoriaSeed("Ambiência", List.of(
                    pergunta(
                            "Como você classifica o conforto térmico das aves no galpão?",
                            opcao("Temperatura adequada durante o dia todo", 0),
                            opcao("Pequenas variações de temperatura", 1),
                            opcao("Calor ou frio frequente", 2),
                            opcao("Estresse térmico intenso", 3)
                    ),
                    pergunta(
                            "Como é o programa de luz (fotoperíodo) oferecido às aves?",
                            opcao("16h de luz/dia, com horário e intensidade constantes", 0),
                            opcao("Luz natural apenas, sem suplementação artificial", 1),
                            opcao("Fotoperíodo variável, sem rotina fixa", 2),
                            opcao("Sem controle de luz definido", 3)
                    ),
                    pergunta(
                            "Como está a densidade de alojamento das aves (nº de aves por gaiola/m²)?",
                            opcao("Dentro da recomendação técnica da linhagem", 0),
                            opcao("Levemente acima do recomendado", 1),
                            opcao("Moderadamente superlotado", 2),
                            opcao("Muito superlotado, aves com pouco espaço para se mover", 3)
                    )
            )),

            new CategoriaSeed("Ninhos", List.of(
                    pergunta(
                            "Em que estado os ninhos costumam permanecer?",
                            opcao("Sempre limpos e secos", 0),
                            opcao("Pequena quantidade de sujeira ou umidade", 1),
                            opcao("Frequentemente sujos ou úmidos", 2),
                            opcao("Muito sujos, úmidos ou com acúmulo de fezes", 3)
                    )
            )),

            new CategoriaSeed("Sanidade", List.of(
                    pergunta(
                            "Você já identificou piolhos ou ácaros nas aves ou no galinheiro "
                                    + "(ex: perto da cloaca, sob as asas, frestas do poleiro)?",
                            opcao("Nunca identificados, com inspeção periódica", 0),
                            opcao("Já observados raramente, controlados rapidamente", 1),
                            opcao("Observados com alguma frequência, controle irregular", 2),
                            opcao("Infestação atual ou recorrente, sem controle efetivo", 3)
                    ),
                    pergunta(
                            "Qual o estado vacinal e sanitário atual do plantel?",
                            opcao("Calendário vacinal completo (incluindo bronquite infecciosa) e sem sinais de doença", 0),
                            opcao("Vacinação parcial ou atrasada", 1),
                            opcao("Vacinação incompleta e sinais leves de doença respiratória", 2),
                            opcao("Sem vacinação e/ou surtos recentes de doença", 3)
                    )
            ))
    );
}
