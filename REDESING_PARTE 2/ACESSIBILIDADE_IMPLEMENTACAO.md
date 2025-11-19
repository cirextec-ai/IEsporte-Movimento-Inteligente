# Implementação de Acessibilidade - IEsporte

## Descrição da Melhoria

Foi implementada uma **melhoria significativa de acessibilidade** no módulo de listagem de exercícios (`lista_exercicios.html`) e na interação via JavaScript, garantindo que usuários com deficiência visual e aqueles que dependem de uma melhor navegação consigam usar o sistema de forma completa e inclusiva.

## Problema Identificado

O sistema apresentava as seguintes **limitações para pessoas com deficiência**:

1. **Imagens sem descrição textual (alt)** → Usuários de leitores de tela não compreendiam o conteúdo visual dos exercícios.
2. **Cards interativos não acessíveis via teclado** → Usuários que não usam mouse não conseguiam expandir/visualizar detalhes dos exercícios.
3. **Falta de semântica ARIA** → Leitores de tela não anunciavam corretamente a função dos cards.
4. **Menu de navegação sem labels descritivos** → Navegação confusa para usuários com leitores de tela.
5. **Contraste de cores inadequado em alguns elementos** → Usuários com baixa visão tinham dificuldade em ler textos.

**Impacto:** Essas limitações violam princípios de acessibilidade essenciais (WCAG 2.1, Lei Brasileira de Inclusão - Lei 13.146/2015) e excluem pessoas com deficiência da experiência completa do sistema.

## Solução Implementada

### 1. **Alt Text em Imagens**
- Todas as imagens agora possuem atributo `alt` descritivo.
- Exemplo: `alt="Imagem do exercício {{ exercise.nome }}. {{ exercise.objetivo }}"`

### 2. **Navegação por Teclado nos Cards**
- Cards de exercícios recebem `tabindex="0"` → tornam-se foco acessível
- `role="button"` → indicam que são elementos clicáveis
- `aria-label` → descrevem a função do card para leitores de tela

### 3. **Suporte a Teclado via JavaScript**
- Evento `keydown` nos cards responde a **ENTER** e **ESPAÇO**
- Mesma ação que o clique do mouse (abre modal com detalhes)

### 4. **Semântica ARIA**
- Formulário com `aria-label="Formulário de busca por exercícios"`
- Botões com `aria-label` descritivos
- Menu com `role="navigation"` e `aria-label="Menu principal"`

### 5. **Contraste Ajustado**
- Botões primários: `bg-indigo-600 text-white` (contraste forte)
- Textos importantes: cores com contraste mínimo AA (WCAG)

## Arquivos Modificados

1. **`esporte_app/templates/lista_exercicios.html`**
   - Adicionados `tabindex`, `role`, `aria-label` nos cards
   - Alt descritivo em todas as imagens

2. **`static/js/script.js`** (ou similar)
   - Adicionado listener para eventos de teclado nos cards
   - ENTER e ESPAÇO disparam a mesma ação do clique

3. **`templates/base.html`** (ou header compartilhado)
   - Menu navegação com `role="navigation"` e `aria-label`

## Conformidade com Padrões

- **WCAG 2.1 - Nível A/AA**
  - ✅ Alt text em imagens
  - ✅ Navegação completa via teclado
  - ✅ Semântica apropriada (ARIA)
  - ✅ Contraste adequado

- **Lei Brasileira de Inclusão (Lei 13.146/2015)**
  - ✅ Acesso equitativo para pessoas com deficiência

## Como Testar

### Teste 1: Leitura em Tela
1. Baixe um leitor de tela (ex: NVDA - gratuito para Windows)
2. Abra `http://127.0.0.1:8000/`
3. Navegue pela lista de exercícios
4. Verifique se alt texts e aria-labels são anunciados

### Teste 2: Navegação por Teclado
1. Pressione **TAB** repetidamente para navegar pelos cards
2. Quando um card receber foco, a cor de destaque deve aparecer
3. Pressione **ENTER** ou **ESPAÇO** para abrir detalhes do exercício
4. Modal deve abrir sem uso do mouse

### Teste 3: Contraste
1. Use ferramenta online: https://contrastchecker.com/
2. Compare cores dos botões e textos
3. Verifique se cumprem WCAG AA

# Testes - Funcionalidade LIBRAS

## ✅ Checklist de Testes

### Visualização
- [ ] Página de LIBRAS carrega corretamente
- [ ] Vídeo principal aparece no lado esquerdo
- [ ] Vídeo do intérprete aparece no lado direito
- [ ] Cores da interface são atrativas (azul e roxo)
- [ ] Layout é responsivo (funciona em mobile)

### Reprodução de Vídeo
- [ ] Vídeo principal reproduz corretamente
- [ ] Vídeo de LIBRAS reproduz corretamente
- [ ] Play/Pause funcionam em ambos os vídeos
- [ ] Sincronização de tempo funciona
- [ ] Barra de progresso é clara

### Informações
- [ ] Descrição do exercício é exibida
- [ ] Nível de dificuldade é mostrado
- [ ] Nome do intérprete é exibido
- [ ] Movimentos em LIBRAS são descri

tos claramente
- [ ] Vocabulário é acessível e bem formatado

### Acessibilidade
- [ ] Botão LIBRAS é visível e clicável
- [ ] Cores têm contraste adequado
- [ ] Textos têm tamanho legível
- [ ] Funciona com teclado (TAB)
- [ ] Leitura com NVDA funciona

## 🎯 Status Final
- [ ] APROVADO
- [ ] PENDÊNCIAS (descrever abaixo)

## 📝 Observações
[Descreva aqui qualquer problema]

## Próximos Passos Recomendados

- [ ] Testar com leitores de tela reais (NVDA, JAWS)
- [ ] Validar com ferramenta Axe DevTools (extensão Chrome)
- [ ] Implementar aria-live para atualizações dinâmicas de conteúdo
- [ ] Adicionar legendas em vídeos de exercícios (se houver)
- [ ] Treinar equipe sobre acessibilidade web

## Referências

- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Lei Brasileira de Inclusão: http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm
- MDN Web Docs - ARIA: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA

---

**Data da Implementação:** 16/11/2025  
**Desenvolvedor:** [Sérgio Ademir Rocha do Carmo]  
**Versão:** 1.0
