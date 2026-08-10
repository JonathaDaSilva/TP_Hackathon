package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Categoria;
import com.avicola.api.domain.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
class CategoriaRepositoryImpl implements CategoriaRepository {

    private final CategoriaJpaRepository jpaRepository;

    @Override
    public Categoria salvar(Categoria categoria) {
        return jpaRepository.save(categoria);
    }

    @Override
    public boolean existeAlguma() {
        return jpaRepository.count() > 0;
    }
}
