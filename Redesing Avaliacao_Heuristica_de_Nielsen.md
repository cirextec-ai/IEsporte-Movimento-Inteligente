
### Relatório Redesing / Avaliação Heurística do Projeto: IEsporte - Movimento Inteligente 
### Aluno: Sergio Ademir Rocha do Carmo 
### Professor Dr.: Andrey Rodrigues 

**📊 Avaliação Heurística de Nielsen - Relatório de Redesign (IEsporte)**

** Novembro de 2025**

**Versão Avaliada: Sistema Antes das Mudanças (Imagens Anteriores) vs.
Sistema Atual (Com Header, Footer e Busca)**

**Objetivo: Documentar as melhorias de UX, justificando cada mudança de
interface pela aplicação consciente das Heurísticas de Nielsen.**

**1. 🔍 Análise Comparativa do Sistema (Heurísticas de Nielsen)**

**A tabela a seguir compara a implementação das Heurísticas na versão
anterior (sem navegação global) e na versão atual (com Header e Footer),
destacando o ganho de usabilidade.**

  --------------------------------------------------------------------------
  **Heurística**    **Sistema         **Sistema Atual   **Ganho de UX
                    Anterior (Antes   (Após Redesign)** (Comentário)**
                    do Redesign)**                      
  ----------------- ----------------- ----------------- --------------------
  **1. Visibilidade **Indicador de    **Ponto Forte: O  **O status da sessão
  do Status**       login isolado na  botão \'Sair\' no e de filtragem é
                    área de           Header e a barra  posicionado em local
                    conteúdo.**       de busca são      padrão (canto
                                      padrões           superior direito),
                                      globais.**        melhorando o
                                                        reconhecimento e
                                                        liberando espaço no
                                                        conteúdo.**

  **2.              **Boa             **Ponto Forte:    **Reforça a
  Correspondência   correspondência   Adição de         credibilidade e a
  entre o Sistema e em termos de      elementos de      relação com o mundo
  o Mundo Real**    exercícios        negócio real no   profissional e
                    (Gato-Vaca,       Footer (Redes     social (Heurística
                    Natação).**       Sociais, Termos   2).**
                                      de Serviço).**    

  **3. Liberdade e  **Ponto Crítico:  **Ponto Forte:    **O usuário pode
  Controle do       Mínima. Apenas o  Header e Footer   navegar livremente e
  Usuário**         botão Sair.**     fornecem controle sair de áreas sem se
                                      total de          sentir \"preso\" ou
                                      navegação (Home,  perdido, através de
                                      Contato,          uma navegação
                                      Legal).**         constante.**

  **4. Consistência **Consistente     **Ponto Forte:    **Aumenta a
  e Padrões**       apenas na         Adotou padrões de previsibilidade e
                    exibição dos      web design        reduz a curva de
                    cards de          (Header, Footer,  aprendizado, pois os
                    exercício.**      layout de 4       elementos se
                                      colunas no        comportam de maneira
                                      rodapé) em todas  familiar.**
                                      as páginas.**     

  **6.              **Opções de       **Ponto Forte:    **O usuário gasta
  Reconhecimento em navegação estavam Links essenciais  menos esforço
  Vez de            escondidas ou     (Suporte, Ajuda,  mental, pois as
  Memorização**     inexistentes.**   etc.) estão       opções são
                                      sempre visíveis   facilmente
                                      no Footer e       reconhecíveis e não
                                      Header.**         precisam ser
                                                        memorizadas.**

  **7.              **Navegação lenta **Ponto Forte:    **Permite que
  Flexibilidade e   (apenas rolagem e Inclusão da barra usuários experientes
  Eficiência de     menus de          de busca (Buscar  encontrem conteúdo
  Uso**             dropdown).**      exercício) no     diretamente
                                      topo da lista.**  (eficiência) e
                                                        usuários novos usem
                                                        o menu
                                                        (flexibilidade).**

  **8. Estética e   **Design limpo e  **Ponto Forte:    **O sistema parece
  Design            focado no         Manteve o design  mais completo e bem
  Minimalista**     conteúdo.**       limpo e           acabado, mantendo o
                                      profissional,     foco nos cards de
                                      integrando novos  exercício.**
                                      elementos         
                                      (Header/Footer)   
                                      com o tema        
                                      roxo/azul.**      

  **9. Ajuda e      **Ponto Crítico:  **Ponto Forte:    **Fornece canais
  Documentação**    Ausência de links Links como Ajuda  claros para o
                    de ajuda ou       / FAQ e Fale      usuário buscar
                    FAQ.**            Conosco no Footer suporte quando
                                      e Header.**       necessário.**
  --------------------------------------------------------------------------

**2. 📝 Mudanças de Interface e Justificativa Heurística**

**Esta seção detalha as implementações do redesenho, atestando como cada
componente resolve um problema de usabilidade anterior, demonstrando a
aplicação consciente dos princípios.**

**A. Melhoria na Navegação Global e Controle de Sessão**

**A ausência de navegação era a maior falha da versão anterior.**

  ---------------------------------------------------------------------------------------
  **Heurística**   **Componente   **Antes          **Depois          **Justificativa UX**
                   de Interface** (Descrição       (Descrição        
                                  Detalhada)**     Detalhada)**      
  ---------------- -------------- ---------------- ----------------- --------------------
  **3. Liberdade e **Header de    **Inexistente. O **Implementação   **Oferece ao usuário
  Controle do      Navegação**    usuário não      de um Header fixo um ponto de controle
  Usuário**                       tinha como sair  contendo os links claro e a capacidade
                                  da tela          primários: Home,  de se mover
                                  principal ou     Contato, Fale     livremente pelo
                                  acessar outras   Conosco e o botão sistema.**
                                  áreas.**         Sair.**           

  **1.             **Indicador de **Mensagem de    **O status da     **Posiciona as
  Visibilidade do  Sessão**       boas-vindas e    sessão (Sair) foi informações de
  Status do                       email visíveis   realocado para o  status
  Sistema**                       dentro da área   canto superior    (logado/deslogado)
                                  de conteúdo.**   direito do Header em um local padrão e
                                                   (padrão web).**   consistente.**

  **7.             **Barra de     **Inexistente.   **Adição de uma   **Aumenta
  Flexibilidade e  Busca**        Pesquisa         barra \"Buscar    drasticamente a
  Eficiência de                   dependia de      exercício\" no    eficiência,
  Uso**                           rolagem.**       topo da lista de  permitindo que
                                                   cards.**          usuários experientes
                                                                     localizem o conteúdo
                                                                     diretamente.**
  ---------------------------------------------------------------------------------------

**B. Reforço de Ajuda, Documentação e Consistência**

**O Footer resolveu problemas de suporte e identidade de marca.**

  -----------------------------------------------------------------------------------------
  **Heurística**    **Componente de    **Antes          **Depois          **Justificativa
                    Interface**        (Descrição       (Descrição        UX**
                                       Detalhada)**     Detalhada)**      
  ----------------- ------------------ ---------------- ----------------- -----------------
  **9. Ajuda e      **Footer           **Inexistente.   **Implementação   **Garante que o
  Documentação**    (Rodapé)**         Não havia links  de um Footer de 4 usuário sempre
                                       de ajuda ou      colunas com links tenha acesso à
                                       suporte.**       de suporte (Ajuda documentação ou
                                                        / FAQ, Status do  ajuda.**
                                                        Sistema).**       

  **2.              **Links            **Ausente. O     **Footer inclui   **O sistema ganha
  Correspondência   Institucionais**   sistema parecia  links para        credibilidade,
  entre o Sistema e                    um protótipo sem informações       correspondendo ao
  o Mundo Real**                       vínculos         legais (Termos de padrão esperado
                                       sociais.**       Serviço, Política de um produto
                                                        de Privacidade) e digital real.**
                                                        Redes Sociais.**  

  **6.              **Hierarquia de    **Links estavam  **O Footer        **O agrupamento e
  Reconhecimento em Links**            escondidos ou    centraliza todos  a visibilidade
  Vez de                               misturados.**    os links          constante
  Memorização**                                         secundários e     eliminam a
                                                        terciários de     necessidade de o
                                                        forma clara, com  usuário memorizar
                                                        agrupamentos de   o local de cada
                                                        categorias.**     link.**
  -----------------------------------------------------------------------------------------

**3. ✅ Próximas Melhorias (Plano de Refinamento)**

**Os seguintes pontos devem ser implementados para atingir o nível
máximo de usabilidade e consistência:**

  -------------------------------------------------------------------------
  **Heurística**     **Problema a Ser        **Ação de Melhoria Planejada**
                     Resolvido**             
  ------------------ ----------------------- ------------------------------
  **5. Prevenção de  **O botão Sair pode ser **Implementar uma confirmação
  Erros**            clicado                 (modal) ao clicar no botão
                     acidentalmente.**       Sair.**

  **6.               **A barra de busca,     **Adicionar um ícone de lupa
  Reconhecimento**   embora funcional, é     (🔎) na barra de busca para
                     puramente textual.**    reforçar visualmente a ação.**

  **4. Consistência  **As cores das tags de  **Padronizar as cores das tags
  e Padrões**        exercício (Aquecimento, para um sistema de cores
                     Core) são               semântico consistente em toda
                     inconsistentes.**       a aplicação.**

  **4. Consistência  **O logo e a tipografia **Garantir que o espaçamento e
  e 8. Estética**    podem ter pequenas      a tipografia do logo no Header
                     variações entre Header  sejam idênticos ao nome da
                     e Footer.**             marca no Footer para máxima
                                             Consistência.**

  **3. Liberdade e   **Links externos podem  **Todos os links que levam
  Controle**         desviar o usuário da    para fora (Redes Sociais)
                     aplicação.**            devem usar o atributo
                                             target=\"\_blank\" (abrir em
                                             nova aba).**
  -------------------------------------------------------------------------
