package com.avicola.api.domain.repository;

import java.util.List;

/**
 * Resultado paginado genérico do domínio — não depende de Spring Data
 * (mantém os contratos de {@code domain/repository} puros). A camada de
 * infraestrutura (*RepositoryImpl) converte de/para o {@code Page} do
 * Spring Data ao implementar os repositórios.
 */
public record Pagina<T>(List<T> conteudo, int pagina, int tamanho, long totalElementos, int totalPaginas) {
}
