package com.avicola.api.domain.model;

import java.util.List;

public enum Cenario {

    ESTAVEL("Estável", 0, 20,
            "Nesse cenário, seu manejo é de alta qualidade e segurança, favorecendo boas características internas e externas dos ovos.",
            List.of(
                    "Os ovos são coletados limpos ou com sujidade mínima (penas/poeira), e as trincas são raras ou inexistentes (menos de 5%). A casca é íntegra, a gema é firme e o albúmen apresenta boa consistência.",
                    "As aves recebem alimentação e suplementação balanceada (cálcio e vitamina D) e o calendário vacinal está completo ou em dia, garantindo a prevenção de doenças e a ausência de parasitas — fatores que, quando negligenciados, podem reduzir a qualidade do ovo.",
                    "As aves possuem conforto térmico, densidade de alojamento adequada e um programa de luz consistente, e não estão em fase de postura final — condições que favorecem a produção dos ovos.",
                    "Os ovos são coletados diariamente (ou 2x ao dia) e estocados em local limpo e arejado, o que mantém sua qualidade."
            ),
            List.of(
                    "Apesar do manejo de boa qualidade, busque sempre aprimorar: falhas pontuais podem ocorrer, e manter a homogeneidade na produção depende de nutrição, saúde e ambiência atuando em conjunto para garantir a qualidade dos ovos e a segurança alimentar.",
                    "Em caso de dúvida sobre qualquer item do questionário, entre em contato com um Médico Veterinário de confiança para esclarecê-la."
            )
    ),
    ATENCAO("Atenção", 21, 40,
            "Nesse cenário foram identificadas falhas moderadas de manejo relacionadas à nutrição, à sanidade e à ambiência ou armazenamento, que podem comprometer a qualidade interna e externa dos ovos.",
            List.of(
                    "Os ovos podem apresentar sujidades, trincas, deformações ou alterações internas, indicando prováveis problemas na coleta, no armazenamento, no manejo dos ninhos ou no programa de luz.",
                    "Podem ocorrer falhas nutricionais, principalmente no fornecimento de cálcio, vitamina D e proteína na dieta, comprometendo a formação do ovo.",
                    "As condições de ambiente e bem-estar podem estar contribuindo para a perda de qualidade: variações de temperatura e densidade aumentada afetam o desempenho produtivo das aves.",
                    "Falhas no programa sanitário também podem resultar em redução da produtividade e aumento da suscetibilidade a doenças."
            ),
            List.of(
                    "Revisar o programa nutricional das aves.",
                    "Intensificar a limpeza do galpão e fazer manutenção nos ninhos.",
                    "Realizar a coleta dos ovos pelo menos duas vezes ao dia.",
                    "Melhorar as condições de armazenamento dos ovos, mantendo ambiente limpo, seco, ventilado e, se necessário, exclusivo para os ovos.",
                    "Monitorar a qualidade da água e garantir fornecimento contínuo.",
                    "Avaliar o conforto térmico das aves e implementar medidas de controle, se necessário.",
                    "Verificar a densidade de alojamento e adequá-la às recomendações técnicas da linhagem, se necessário.",
                    "Realizar inspeções periódicas para identificação e controle de ectoparasitas.",
                    "Revisar e atualizar o calendário vacinal do plantel.",
                    "Repetir o teste periodicamente para acompanhar a evolução do lote."
            )
    ),
    ALERTA("Alerta", 41, 60,
            "Nesse cenário há falhas graves de manejo relacionadas à nutrição, à sanidade e à ambiência, que comprometem significativamente a qualidade dos ovos e devem ser corrigidas imediatamente!",
            List.of(
                    "É provável que os ovos apresentem elevada incidência de sujidade, trincas, deformações ou casca de baixa qualidade, além de alterações internas — indicando falhas por coletas insuficientes ou irregulares e falhas graves no fornecimento de luz.",
                    "A alta falha nutricional, principalmente no fornecimento de cálcio, vitamina D e no teor de proteína, resulta em ovos com defeitos e desuniformes.",
                    "O ambiente pode estar contribuindo para a perda de qualidade: altas temperaturas geram estresse térmico, principalmente quando associadas à alta densidade, contribuindo para alterações na qualidade.",
                    "Falhas no programa sanitário também contribuem para o aumento do risco de doenças e a queda de desempenho produtivo."
            ),
            List.of(
                    "Realizar avaliação completa do sistema produtivo com acompanhamento técnico especializado.",
                    "Implantar um programa rigoroso de limpeza e desinfecção das instalações.",
                    "Corrigir imediatamente falhas nutricionais, reajustando a dieta e a suplementação mineral e vitamínica.",
                    "Intensificar a frequência de coleta e melhorar o manejo dos ovos após a postura.",
                    "Adequar o ambiente de armazenamento dos ovos, garantindo que seja limpo, seco, ventilado e exclusivo para os ovos.",
                    "Garantir a qualidade da água e o fornecimento contínuo.",
                    "Revisar o programa de iluminação e as condições de conforto térmico das aves.",
                    "Reduzir a densidade do lote.",
                    "Implantar programas de controle de ectoparasitas e monitoramento sanitário.",
                    "Atualizar imediatamente o calendário vacinal e investigar possíveis enfermidades em circulação no plantel.",
                    "Repetir o teste periodicamente para acompanhar a evolução do lote."
            )
    );

    private final String rotulo;
    private final int minimo;
    private final int maximo;
    private final String resumo;
    private final List<String> diagnostico;
    private final List<String> dicas;

    Cenario(String rotulo, int minimo, int maximo, String resumo, List<String> diagnostico, List<String> dicas) {
        this.rotulo = rotulo;
        this.minimo = minimo;
        this.maximo = maximo;
        this.resumo = resumo;
        this.diagnostico = diagnostico;
        this.dicas = dicas;
    }

    public static Cenario calcular(int pontuacaoTotal) {
        for (Cenario cenario : values()) {
            if (pontuacaoTotal >= cenario.minimo && pontuacaoTotal <= cenario.maximo) {
                return cenario;
            }
        }
        throw new IllegalArgumentException("Pontuação total fora do intervalo esperado (0-60): " + pontuacaoTotal);
    }

    public String getRotulo() {
        return rotulo;
    }

    public String getResumo() {
        return resumo;
    }

    public List<String> getDiagnostico() {
        return diagnostico;
    }

    public List<String> getDicas() {
        return dicas;
    }
}
