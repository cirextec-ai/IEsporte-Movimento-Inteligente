


# 🧠 Relatório Técnico - Avaliação Heurística de Nielsen

**Aluno:** Sérgio Ademir Rocha do Carmo  
**Professor Dr.:** Andrey Rodrigues  
**Data da Análise:** 10 de Novembro de 2025  
**Versão Avaliada:** Sistema Antes das Mudanças (Imagens Anteriores) vs. Sistema Atual (Com Header, Footer e Busca)

---

## 🎯 Objetivo

Documentar as melhorias de **UX (Experiência do Usuário)**, justificando cada mudança de interface com base na aplicação consciente das **Heurísticas de Nielsen**.  

O foco está em evidenciar como o redesign do sistema *IEsporte – Movimento Inteligente* melhorou a **usabilidade**, **consistência visual** e **eficiência de navegação**.

---
## 📋 As 10 Heurísticas de Nielsen Aplicadas ao IEsporte

##1️⃣ Visibilidade do Status do Sistema

Descrição

O sistema deve sempre manter os usuários informados sobre o que está acontecendo através de feedback em tempo real.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Indicador de Sessão: Mensagens de boas-vindas e email visíveis dentro da área de conteúdo

Modal de Ajuda: Apresentação de bem-vindo ao usuário

Spinner de Carregamento: Indicador visual durante requisições (elemento #spinner)

Snackbar de Notificações: Feedback visual em tempo real (elemento #snackbar)

Botão de Status: Elemento "Sair" exibindo estado autenticado

Referências no Repositório
Issue: #7 - Heurística Visibilidade do Status do Sistema (Fechada)

Branch: feature/heuristica-1_visibilidade-status

PR: #16 - Redesing: Visibilidade do Status (Merged)

## 2️⃣ Correspondência entre o Sistema e o Mundo Real

Descrição

O sistema deve falar a linguagem do usuário usando palavras, frases e conceitos familiares ao invés de jargão técnico.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Linguagem em Português: Toda interface em PT-BR

Terminologia de Exercícios: "Gato-Vaca", "Pássaro-Cachorro" (nomes descritivos)

Ícones Intuitivos: Uso de emojis relevantes (🏃, 📋, 💡, 🎯, 🗑️)

Categorias Familiares: "Aquecimento", "Treinamento", "Coordenação"

Badges Funcionais: "Tipo", "Foco", "Objetivo", "Como Executar"

Referências no Repositório
Issue: #9 - Heurística Correspondência entre o Sistema e o Mundo Real (Fechada)

Commits: Update README.md, Refatorações e design

## 3️⃣ Liberdade e Controle do Usuário

Descrição

Usuários frequentemente escolhem funções por engano e precisam de uma "saída de emergência" clara para sair do estado indesejado.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Botão de Logout: "Sair" acessível no cabeçalho em qualquer momento

Modal de Confirmação: Confirmação antes de excluir conta (sim/não)

Navegação Intuitiva: Menu de navegação sempre visível

Links Funcionais: Home, Contato, Fale Conosco (rotas de escape)

Botão "Não, manter conta": Opção para cancelar ações irreversíveis

Referências no Repositório
Issue: #6 - Heurística Liberdade e Controle do Usuário (Fechada)

PR: #14 - Merge pull request #14 from SergioCarmo-ro/main

Feature: Exclusão de conta com confirmação implementada

## 4️⃣ Prevenção de Erros

Descrição

Melhor do que boas mensagens de erro é um design cuidadoso que previne os problemas em primeiro lugar.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Validação de Campos: required, minlength="6" em formulários

Checkboxes Obrigatórios: Termo de uso deve ser aceito antes de cadastro

Masks e Placeholders: Indicadores visuais de formato esperado

Modal de Confirmação: Aviso antes de ações irreversíveis

Mensagem de Erro Destacada: Fundo vermelho para alertas

Referências no Repositório
Issue: Prevenção implementada através de refatorações (#2, #3, #4, #5)

Commit: "Refatoração 2 - Replace Conditional with Polymorphism"

Validação: Implementada em todos os formulários de login e signup

## 5️⃣ Reconhecimento em Lugar de Lembrança

Descrição

Minimizar a carga de memória do usuário tornando objetos, ações e opções visíveis. As instruções não devem ser memorizadas.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Placeholders Descritivos: "Email", "Senha (mín. 6 caracteres)", "Buscar exercício"

Rótulos Visuais: Tipo de exercício, Foco, Objetivo, Como Executar

Ícones com Significado: 💡 (Objetivo), 🎯 (Execução), 📋 (Exercícios)

Search Input com Lupa: Indicador visual de função de pesquisa

Expandir/Colapsar: Ícone de seta para mostrar mais detalhes

Referências no Repositório
Feature Branch: feature/heuristica-1_visibilidade-status

Implementação: Campo de busca com lupa (SVG nativo)

Design Patterns: Badges de categoria sempre visíveis

## 6️⃣ Flexibilidade e Eficiência de Uso

Descrição

Aceleradores - não vistos por usuários novatos - podem frequentemente acelerar a interação para o usuário experiente.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Filtro de Busca: onkeyup="filtrarCards()" para busca rápida

Navegação Rápida: Menu superior com acesso direto (Home, Contato, Fale Conosco)

Clique em Cards: onclick="toggleExercise()" para expandir/colapsar

Formulários Otimizados: Sem campos desnecessários

Botões de Atalho: Links no cabeçalho e footer

Referências no Repositório
Issue: #8 - Heurística Flexibilidade e Eficiência de Uso (Fechada)

Implementação: Sistema de busca e filtros

Feature: Cards clicáveis para expandir detalhes

## 7️⃣ Design Estético e Minimalista

Descrição

Diálogos não devem conter informação irrelevante ou raramente necessária. Cada unidade de informação compete pela atenção do usuário.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Grid Responsivo: Cards de exercício bem organizados (MD: 2 cols, LG: 3 cols)

Paleta de Cores: Gradiente índigo-roxo (#667eea a #764ba2)

Espaçamento: Padding/margin consistentes

Tipografia Clara: Fontes sans-serif com pesos bem definidos

Cards Limpos: Informações essenciais sem poluição visual

Modal Focado: Apenas informação relevante na confirmação

Referências no Repositório
Arquivo: .vscode/settings.json, iesporte/static/style.css

Framework: Tailwind CSS para design consistente

Commits: "Refatorações e design pater facade"

## 8️⃣ Ajuda e Documentação

Descrição

Deve ser fácil buscar informações e tarefas para serem realizadas, a documentação deve estar focada nas tarefas do usuário.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Modal de Ajuda: #ajuda-modal com boas-vindas

README.md Completo: Documentação no repositório

Footer com Links: "Ajuda / FAQ", "Status do Sistema"

Termos de Serviço e Política: Links acessíveis na forma de cadastro

Descrições de Exercícios: Objetivo, execução e foco bem documentados

Referências no Repositório
Arquivo: README.md (Descrição completa do sistema)

Modal: Elemento #ajuda-modal em index.html

Links: Footer com seções de Ajuda, Suporte e Legal

## 9️⃣ Diagnóstico e Recuperação de Erros

Descrição

As mensagens de erro devem ser expressas em linguagem clara, indicar precisamente o problema e sugerir uma solução construtiva.

## Implementação no IEsporte
## ✅ Aplicada com sucesso

Mensagens de Erro: Fundo vermelho com ícone ❌

Classe de Alerta: .bg-red-50 text-red-600 para destaque

Variável de Contexto: {{ error }} passada do backend

Validação em Tempo Real: Feedback imediato em formulários

Modal de Confirmação Crítica: Aviso em vermelho antes de ações irreversíveis

Referências no Repositório
Implementação: Sistema de erro em index.html

Backend: Views em esporte_app/views.py com tratamento de erros

Estilo: Classes Tailwind para feedback visual claro

## 🔟 Segurança e Prevenção

Descrição

O sistema deve estar bem seguro, com mecanismos de proteção contra ações perigosas. (Extrapolação da 10ª heurística)

## Implementação no IEsporte
## ✅ Aplicada com sucesso

CSRF Protection: {% csrf_token %} em todos os formulários

Autenticação: Sistema de Login e Signup

Autorização: Seções diferentes para autenticado e anônimo

Confirmação de Exclusão: Modal obrigatório antes de deletar conta

Senha com Validação: Mínimo 6 caracteres obrigatório

Logout Seguro: Form POST em botão de Sair

Referências no Repositório
Frameworks: Django com proteção CSRF nativa

Autenticação: Sistema implementado em esporte_app/views.py

Confirmação: Modal para ações irreversíveis

View: delete_account para exclusão segura

## 📊 Sumário de Implementação
##	Heurística	Status	Prioridade

1	Visibilidade do Status	✅ Implementada	Alta

2	Correspondência com Mundo Real	✅ Implementada	Alta

3	Liberdade e Controle	✅ Implementada	Alta

4	Prevenção de Erros	✅ Implementada	Alta

5	Reconhecimento vs Lembrança	✅ Implementada	Média

6	Flexibilidade e Eficiência	✅ Implementada	Média

7	Design Estético	✅ Implementada	Média

8	Ajuda e Documentação	✅ Implementada	Média

9	Diagnóstico de Erros	✅ Implementada	Média

## 🔟	Segurança	✅ Implementada	Alta
## 🔗 Referências do Repositório
Issues Relacionadas às Heurísticas
#9: Correspondência entre o Sistema e o Mundo Real

**#8Flexibilidade e Eficiência de Uso

**: Visibilidade do Status do Sistema

#6: Liberdade e Controle do Usuário

#5: Refatoração 4 - Replace Magic Numbers/Strings

#4: Refatoração 3 - Introduce Parameter Object

#3: Refatoração 2 - Replace Conditional with Polymorphism

#2: Extract Method (Extrair Método) - Desing patter Facade

Pull Requests Implementadas
#17: Merge pull request from feature/heuristica-1_visibilidade (55 commits)

#16: Redesing: Visibilidade do Status

#15: Merge pull request #14 from SergioCarmo-ro/main

#14: Implementações de segurança e controle

## Branches Ativas
## main (Branch padrão)

feature/heuristica-1_visibilidade

## Múltiplas branches de refatoração

🎯 Conclusão
O projeto IEsporte - Movimento Inteligente implementa com sucesso as 10 Heurísticas de Nielsen em seu design e desenvolvimento. O sistema demonstra:

✅ Usabilidade Excelente: Interface intuitiva em português

✅ Design Responsivo: Funciona em múltiplos dispositivos

✅ Segurança: Proteção CSRF, autenticação e validação

✅ Acessibilidade: Controles claros, feedback visual

✅ Consistência: Padrões visuais e comportamentais mantidos

O projeto é um exemplo de boa prática em UX/UI para aplicações web educacionais e de saúde.

## 🔍 1. Análise Comparativa do Sistema (Heurísticas de Nielsen)

| **Heurística** | **Antes do Redesign** | **Após o Redesign** | **Ganho de UX** |
|----------------|-----------------------|---------------------|-----------------|
| **1. Visibilidade do Status do Sistema** | Indicador de login isolado na área de conteúdo. | Botão *Sair* e barra de busca no Header. | Sessão e filtragem posicionadas em local padrão, liberando espaço no conteúdo. |
| **2. Correspondência com o Mundo Real** | Boa correspondência com nomes de exercícios (Gato-Vaca, Natação). | Inclusão de elementos reais no rodapé (Redes Sociais, Termos). | Reforça a relação com o contexto profissional e social. |
| **3. Liberdade e Controle do Usuário** | Apenas botão *Sair*. | Cabeçalho e Rodapé com navegação completa (Home, Contato, Legal). | Usuário pode navegar livremente, sem se sentir “preso”. |
| **4. Consistência e Padrões** | Apenas os cartões de exercício eram consistentes. | Adoção de padrões de web design (Header, Footer, 4 colunas). | Reduz curva de aprendizado e aumenta previsibilidade. |
| **6. Reconhecimento em vez de Memorização** | Opções escondidas. | Links essenciais visíveis no Header e Footer. | Reduz esforço mental e facilita o reconhecimento. |
| **7. Flexibilidade e Eficiência de Uso** | Navegação lenta (rolagem longa). | Inclusão da barra de busca global. | Facilita o acesso rápido ao conteúdo. |
| **8. Estética e Design Minimalista** | Design limpo, mas simples demais. | Integração profissional de Header e Footer. | Visual mais completo e coerente. |
| **9. Ajuda e Documentação** | Sem FAQ ou suporte. | Footer inclui Ajuda, FAQ e Fale Conosco. | Facilita o suporte e a autoajuda. |

---
## 🧩 2. Mudanças de Interface e Heurística Justificativa

### A. 🔝 Melhoria na Navegação Global e Controle de Sessão

| **Heurística** | **Componente** | **Antes** | **Depois** | **UX Justificativa** |
|----------------|----------------|------------|-------------|----------------------|
| **3. Liberdade e Controle do Usuário** | Cabeçalho de Navegação | Inexistente; o usuário ficava preso na tela principal. | Header fixo com links: *Home, Contato, Fale Conosco, Sair*. | Garante controle total de navegação e liberdade de movimento. |
| **1. Visibilidade do Status do Sistema** | Indicador de Sessão | Mensagem de boas-vindas dentro do conteúdo. | Sessão movida para o canto superior direito. | Segue padrão visual da web e mantém consistência. |
| **7. Flexibilidade e Eficiência de Uso** | Barra de Busca | Inexistente; exigia rolagem. | Adição da barra “Buscar exercício”. | Aumenta a eficiência e rapidez na localização de conteúdo. |

---

### B. 📚 Reforço de Ajuda, Documentação e Consistência

| **Heurística** | **Componente** | **Antes** | **Depois** | **UX Justificativa** |
|----------------|----------------|------------|-------------|----------------------|
| **9. Ajuda e Documentação** | Rodapé | Inexistente. | Footer com 4 colunas e links (Ajuda, FAQ, Status). | Acesso rápido a suporte e documentação. |
| **2. Correspondência com o Mundo Real** | Links Institucionais | Ausentes; aparência de protótipo. | Footer com Termos, Política e Redes Sociais. | Transmite credibilidade e padrão profissional. |
| **6. Reconhecimento em Vez de Memorização** | Hierarquia de Links | Links misturados e ocultos. | Footer organiza links secundários por categoria. | Evita memorização e melhora navegação. |

---

## 🚀 3. Próximas Melhorias (Plano de Refinamento)

| **Heurística** | **Problema Identificado** | **Ação Planejada** |
|----------------|----------------------------|--------------------|
| **5. Prevenção de Erros** | Botão “Sair” pode ser clicado acidentalmente. | Implementar modal de confirmação antes de sair. |
| **6. Reconhecimento em Vez de Memorização** | Barra de busca é puramente textual. | Adicionar ícone de lupa (🔎) como reforço visual. |
| **4. Consistência e Padrões** | Cores das tags são inconsistentes. | Padronizar paleta semântica para categorias. |
| **4. Consistência e 8. Estética** | Tipografia e logo variam entre Header e Footer. | Uniformizar tipografia, tamanhos e espaçamento. |
| **3. Liberdade e Controle do Usuário** | Links externos abrem na mesma aba. | Usar `target="_blank"` em links externos. |

---

## 📌 Conclusão

O **redesign do sistema IEsporte** trouxe melhorias expressivas em **usabilidade**, **navegabilidade** e **consistência visual**, baseadas nas **Heurísticas de Nielsen**.  
O sistema agora oferece uma experiência mais **intuitiva, padronizada e eficiente**, reduzindo erros e melhorando o fluxo cognitivo do usuário.  

As próximas etapas visam consolidar a experiência do usuário, garantindo que o *IEsporte* alcance padrões profissionais de **UX/UI Design**.

---

## 🧭 Resumo Final

> O projeto evoluiu de um protótipo funcional para uma plataforma robusta e coerente, onde cada decisão de design é fundamentada em princípios de usabilidade.  
> As melhorias implementadas fortalecem o produto e aumentam a confiança do usuário no sistema.

---

© 2025 – *IEsporte: Movimento Inteligente*  
Desenvolvido por **Sérgio Ademir Rocha do Carmo**
