package com.avicola.api.domain.model;

public enum Cenario {

    ESTAVEL("Estável", 0, 20),
    ATENCAO("Atenção", 21, 40),
    ALERTA("Alerta", 41, 60);

    private final String rotulo;
    private final int minimo;
    private final int maximo;

    Cenario(String rotulo, int minimo, int maximo) {
        this.rotulo = rotulo;
        this.minimo = minimo;
        this.maximo = maximo;
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
}
