

# Changelog

## [2.0.0] - 2025-11-16

### 🌐 Acessibilidade
- ✨ **Melhoria Significativa:** Implementação de acessibilidade completa (WCAG 2.1)
  - Adicionado alt text descritivo em todas as imagens
  - Cards de exercícios agora são navegáveis via teclado (TAB, ENTER, ESPAÇO)
  - Semântica ARIA adicionada (tabindex, role, aria-label)
  - Contraste de cores ajustado para conformidade WCAG AA
  - Menu de navegação com labels descritivos para leitores de tela
  
- 📄 **Documentação:** Arquivo `ACESSIBILIDADE_IMPLEMENTACAO.md` com justificativa e testes
- 🔗 **Referências:** Conformidade com Lei Brasileira de Inclusão (Lei 13.146/2015)

### Arquivos Alterados
- `esporte_app/templates/lista_exercicios.html`
- `static/js/script.js`
- `templates/base.html` (menu/header)
- `README.md` (seção de acessibilidade)

### Testes Realizados
- ✅ Navegação completa via teclado
- ✅ Leitura por leitores de tela (alt text, ARIA)
- ✅ Contraste de cores WCAG AA

---
