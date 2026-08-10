package com.avicola.api.infrastructure.persistence;

import com.avicola.api.domain.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

interface CategoriaJpaRepository extends JpaRepository<Categoria, Long> {
}
