-- Postgres não cria índice automático para foreign keys simples (só para
-- PK e UNIQUE). Estas colunas são usadas em WHERE/JOIN em queries frequentes
-- (login/listagem de lotes, carregamento do quiz, submissão de triagem) e
-- ainda não tinham índice.

CREATE INDEX idx_lotes_usuario_id ON lotes (usuario_id);
CREATE INDEX idx_triagens_lote_id ON triagens (lote_id);
CREATE INDEX idx_perguntas_categoria_id ON perguntas (categoria_id);
CREATE INDEX idx_opcoes_resposta_pergunta_id ON opcoes_resposta (pergunta_id);
CREATE INDEX idx_respostas_triagem_opcao_resposta_id ON respostas_triagem (opcao_resposta_id);
