package com.avicola.api.domain.repository;

import com.avicola.api.domain.model.Categoria;

public interface CategoriaRepository {
    Categoria salvar(Categoria categoria);
    boolean existeAlguma();
}
