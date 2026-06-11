# Plataforma de Manejo e Triagem Avícola
> **MVP para Hackathon** — Sistema de Monitoramento de Lotes e Qualidade de Ovos para Pequenos e Médios Produtores.

Este repositório contém a documentação inicial, escopo e diretrizes de negócio para o desenvolvimento do MVP (Minimum Viable Product) durante o Hackathon. O projeto foi desenhado sob a premissa de um escopo enxuto, realista e altamente focado na entrega de valor imediata ao avicultor, considerando uma estrutura de equipe com desenvolvedor único.

---

## 📋 Sobre o Projeto

A plataforma é uma aplicação web voltada para o pequeno e médio avicultor, permitindo o acompanhamento em lote (por galpões e formas de manejo) da saúde das aves e da qualidade dos ovos. 

O principal objetivo é **instruir e guiar** o produtor em momentos de incerteza na produção, servindo como uma ferramenta de triagem e apoio preventivo, sem nunca emitir laudos ou vereditos médicos.

---

## 🎯 Escopo do MVP (Fluxo da Aplicação)

Para garantir a entrega dentro do prazo regulamentar do hackathon, o MVP consistirá em 5 pilares principais:

1. **Landing Page (Página Inicial):** Apresentação institucional da proposta de valor, benefícios da plataforma e o aviso legal (*disclaimer*) sobre o caráter informativo do sistema.
2. **Cadastro e Login Simples:** Fluxo básico de identificação (Nome, E-mail e Identificação do Lote/Galpão) para fins de registro histórico e personalização do relatório.
3. **Quiz de Triagem Dinâmico:** Formulário fluido contendo entre 10 e 15 perguntas de múltipla escolha focadas em três categorias: *Ambiente*, *Comportamento das Aves* e *Aspectos dos Ovos*.
4. **Emissão de Relatório em PDF:** Compilação automatizada dos resultados do quiz. O documento classificará a situação do lote em níveis (ex: *Estável, Atenção ou Alerta*), apresentará dicas práticas de manejo e exibirá obrigatoriamente a recomendação de consulta profissional.
5. **Formulário "Fale Conosco" (Contato):** Canal direto na plataforma onde o usuário pode enviar dúvidas, feedbacks ou comentários. A integração será feita via serviço rápido de e-mail (ex: EmailJS), eliminando a necessidade de infraestrutura complexa de chat no MVP.

---

## ⚠️ Isenção de Responsabilidade (Disclaimer)

A plataforma possui um caráter estritamente educativo e de suporte à gestão de manejo. Todas as telas de triagem e o documento final em PDF conterão de forma visível a seguinte nota de orientação:

> *"Atenção: Este relatório é estritamente informativo e baseado em triagem preventiva. Ele não substitui a avaliação técnica e o veredito de um médico veterinário ou especialista de sua confiança."*
