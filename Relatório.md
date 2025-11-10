

**UNIVERSIDADE FEDERAL DO AMAZONAS**  
**INSTITUTO DE CIÊNCIAS EXATAS E TECNOLOGIA**  
**ENGENHARIA DE SOFTWARE**  
**MANUTENÇÃO E INTEGRAÇÃO DE SOFTWARE**  
**SEMESTRE 2025-2**  

Aluno: Sergio Ademir Rocha do Carmo  
Professor: Andrey Rodrigues  
Refatoração de Software  

# Relatório de Refatoração do Projeto: IEsporte - Movimento Inteligente

## Resumo das Refatorações

Foram aplicadas as seguintes refatorações do catálogo de Martin Fowler:

- **Extract Method:** Separação das lógicas de autenticação e cadastro em métodos dedicados no `facade.py`, melhorando clareza e reutilização.
- **Replace Conditional with Polymorphism:** Centralização das regras de autenticação e cadastro em classes apropriadas (`AutenticacaoFacade`, `UsuarioFacade`).
- **Introduce Parameter Object:** O contexto da view foi encapsulado no método `obter_contexto_pagina_inicial`, diminuindo acoplamento e aumentando coesão.
- **Replace Magic Strings with Named Constants:** Dados dos exercícios e tipos centralizados numa única fonte de verdade (`ExercicioFacade`).

## Justificativas das Escolhas

- **Facilitar Manutenção:** Concentrar regras em um único lugar (Facade) permitiu alterar validações de autenticação/cadastro sem necessidade de alterar múltiplas views.
- **Reutilização e Testabilidade:** Métodos extraídos possibilitam reuso em diferentes pontos e facilitam a cobertura de testes unitários.
- **Escalabilidade e Evolução:** Código modular e menos duplicado é mais fácil de evoluir para APIs, novas telas e funcionalidades futuras.

## Evidências no Código

- [views.py: Uso do Facade nas views](https://github.com/SergioCarmo-ro/IEsporte-Movimento-Inteligente/blob/main/iesporte/esporte_app/views.py)
- [facade.py: Implementação das classes Facade](https://github.com/SergioCarmo-ro/IEsporte-Movimento-Inteligente/blob/main/iesporte/esporte_app/facade.py)
- [index.html: Template desacoplado, recebendo contexto simplificado](https://github.com/SergioCarmo-ro/IEsporte-Movimento-Inteligente/blob/main/iesporte/templates/index.html)

>
## Refatorações Oportunistas e Planejadas
## Quadro Comparativo
| Tipo        | O que motivou                           | Exemplos/resultados                                                       |
| ----------- | --------------------------------------- | ------------------------------------------------------------------------- |
| Oportunista | Bugfixes, melhorias rápidas             | Refinamento de métodos ao debugar login; padronização em pequenas tarefas |
| Planejada   | Análise de arquitetura, expansão futura | Criação do Facade, encapsulamento de contexto, preparação para API REST   |


## Principais Aprendizados e Dificuldades

## O que podemos aprender 
 
 Refatoração sistemática torna o sistema mais limpo, preparado para crescimento, e fácil de entender por outros desenvolvedores.
 O padrão Facade é excelente para centralizar regras compartilhadas em múltiplas views.
 Separar dados de apresentação (templates) dos dados de negócio (facade) simplifica muito o código.

## Dificuldades

Alguns ajustes em type hints não são compatíveis com versões específicas do Python/Django, sendo necessário adaptar para evitar erros de sintaxe.
Ajustar caminhos do projeto e referências de templates e estáticos demanda atenção para evitar 404 e erros de contexto.
Garantir que todo o fluxo (cadastro, login, logout, exibição de exercícios) permaneça funcional mesmo após grandes refatorações.

## Considerações

A refatoração trouxe maior organização e robustez ao projeto, tornando o código mais profissional e alinhado a boas práticas reconhecidas. O uso do padrão Facade e das boas práticas do design expressas por Martin Fowler garantem que o sistema esteja pronto para futuras evoluções com baixo custo de manutenção.


*Manaus, 03 de novembro de 2025*

