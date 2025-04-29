# falafuria-chatbot

## 📋 Sobre o Projeto

O projeto Falafuria Chatbot é uma aplicação de chat assistente desenvolvida como parte do processo seletivo para estágio em engenharia de software na FURIA. Trata-se de um chatbot especializado em informações sobre o time de CS:GO da FURIA, construído com Next.jse TypeScript, e integrado com modelos de IA (OpenAI) para fornecer respostas contextuais aos fãs e entusiastas.

## 🚀 Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento frontend
- **Tailwind CSS**: Para estilização e design responsivo
- **Versel AI SDK**: Para integração com modelos de IA (OpenAI GPT)
- **Shadcn UI**: Para componentes acessíveis e personalizáveis
- **TypeScript**: Para tipagem estática e melhor desenvolvimento

## 🛠️ Principais Funcionalidades

1. **Interface de Chat Interativa**:
   - Janela arrastável e redimensionável
   - Design responsivo adaptado a diferentes dispositivos
   - Sistema de chat completo com histórico de mensagens

2. **Perguntas Frequentes**:
   - Categorias organizadas para facilitar a navegação
   - Seleção rápida de perguntas comuns
   - Integração direta com o sistema de chat

3. **Assistente Virtual Personalizado**:
   - Respostas especializadas sobre o time da FURIA
   - Linguagem descontraída e jovem
   - Integração com o modelo GPT-4.1-nano

4. **Interface Customizada**:
   - Tema com cores e identidade visual da FURIA
   - Suporte a modo claro e escuro
   - Suporte a personalização do tamanho da fonte do chat
   - Avatares personalizados para usuário e assistente


## Capturas de Tela

![Interface de Chat Dark Mode](/screenshots/homePage_DarkTheme.png)
![Interface de Chat White Mode](/screenshots/homePage_WhiteTheme.png)
![Janela de Configuraçoes do Chat](/screenshots/chatConfig.png)
![Exemplo do Chat em Funcionamento](/screenshots/chatInteraction.png)
![Exemplo de FAQs](/screenshots/chatFAQs.png)

## Estrutura do Projeto

```

```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/yourusername/furai-chat.git
cd furai-chat
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente:

Para a utilização do chat com A Ia é preciso uma chave da API do OpenAI:
Como conseguir:
Acesse: https://openai.com/
no canto superior direito clique em log in e em API Plataform
faça o login, na barra de pesquisa na lateral esquerda pesquise API keys de enter e clique em +Create new secret key, defina um nome para a API key, projeto default e all permissions e clique em create secret key copie o codigo de acesso gerado

Crie um arquivo `.env.local` no diretório raiz com suas chaves de API:

```
OPENAI_API_KEY=sua_chave_api_aqui

```
obs. As requisiçoes via API do Openai não são gratuitas para todos os modelos da IA, o projeto está setado para usar o modelo gpt-4.1-nano (Gratuito até a publicação desse repositorio). O gpt-4.1-nano funciona bem porem é limitado, não tem acesso a internet e possui atualizaçoes até outubro de 2023 oque faz com que funcione bem para teste porem trata respostas desatualizadas.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Uso

A interface de chat pode ser:

- **Arrastada**: Clique e segure o cabeçalho para mover a janela de chat
- **Redimensionada**: Clique e arraste o canto inferior direito para redimensionar
- **Utilizada para mensagens**: Digite no campo de entrada e pressione Enviar
- **Utilizada com as FAQs**: Abra a Aba perguntas Frequentes e escolha uma delas para o Chat responder
- **Ajustado algumas configuraçoes** No canto superior direito clique na engregame e abrirá uma barra lateral com posibilidade de ajuste de tema e tamanho da fonte do chat   

## Acessibilidade via Teclado

- **Tab**: Navegar pelos elementos interativos
- **Enter/Espaço**: Ativar botões
- **Escape**: Fechar diálogos ou cancelar operações

## Integração com API

O componente de chat usa o hook `useChat` da biblioteca `@ai-sdk/react` para gerenciar o estado das mensagens e a comunicação com a API. Configure seu provedor de IA nas configurações de API. src/api/chat/route.ts

## Personalização

### Estilização

Os componentes utilizam Tailwind CSS para estilização. Modifique os estilos em cada componente ou atualize a configuração do Tailwind no arquivo `tailwind.config.js`.

### Tematização

Para alterar o tema:

1. Modifique os esquemas de cores no `tailwind.config.js`
2. Atualize os estilos dos componentes conforme necessário

### Adição de Funcionalidades

Para estender a funcionalidade:

1. Adicione novos componentes no diretório `components`
2. Importe-os e use-os no componente principal `Chat.tsx`

## Solução de Problemas

**A posição da janela é redefinida ao atualizar**
- Adicione armazenamento persistente para posição e tamanho usando localStorage

**O chat não redimensiona corretamente**
- Verifique a compatibilidade do navegador e as configurações de overflow no CSS

## 🧠 Sugestões de Melhorias

### 1. Acessibilidade

- **Navegação por Teclado Aprimorada**:
  - Adicionar anúncios de região ARIA para melhorar a navegação de leitores de tela
  - Garantir que todas as interações possam ser realizadas via teclado

- **Suporte a Leitores de Tela**:
  - Adicionar descrições ARIA mais detalhadas para componentes interativos
  - Implementar anúncios para ações dinâmicas (como chegada de novas mensagens)
  - Incluir rótulos descritivos para todos os elementos interativos

- **Personalização Visual**:
  - Adicionar opções de contraste alto
  - Permitir desativar animações para usuários com sensibilidade visual

### 2. Chat por Voz

- **Reconhecimento de Fala**:
  - Integrar Web Speech API para captura de áudio
  - Implementar botão de microfone para ativar entrada por voz
  - Adicionar feedback visual durante captura de áudio

- **Síntese de Voz**:
  - Implementar leitura automática de respostas do chatbot
  - Oferecer controles de velocidade e tom de voz
  - Permitir escolha entre diferentes vozes

- **Acessibilidade de Voz**:
  - Garantir que comandos de voz funcionem para todas as funcionalidades
  - Implementar comandos específicos para navegação e ações comuns
  - Adicionar feedback auditivo para confirmação de ações

### 3. Contextualização com Banco de Dados Vetoriais

- **Implementação de Base de Conhecimento**:
  - Criar base de conhecimento especializada sobre a FURIA e CS:GO
  - Vetorizar artigos, entrevistas e dados históricos do time
  - Utilizar Pinecone, Weaviate ou Milvus para armazenamento de vetores

- **Busca Semântica Avançada**:
  - Implementar sistema de RAG (Retrieval Augmented Generation)
  - Utilizar embeddings de texto para encontrar conteúdo relevante
  - Personalizar resultados com base no histórico de conversa

- **Personalização Contextual**:
  - Armazenar preferências do usuário para personalizar respostas
  - Implementar sistema de memória de curto/longo prazo
  - Adaptar respostas com base em interações anteriores

### 4. Recursos Adicionais

- **Sistema de Notificações**:
  - Integrar com APIs para receber atualizações em tempo real sobre partidas
  - Implementar notificações push para eventos importantes
  - Permitir que usuários se inscrevam em tipos específicos de atualizações

- **Integração com Mídias Sociais**:
  - Incorporar feeds ao vivo do Instagram, Twitter e outros canais da FURIA
  - Permitir compartilhamento direto de respostas em redes sociais
  - Facilitar acesso a conteúdo exclusivo da equipe

- **Conteúdo Multimídia**:
  - Exibir gifs, imagens e vídeos relevantes nas respostas
  - Integrar com plataformas como YouTube para mostrar highlights de partidas
  - Adicionar visualizações interativas de estatísticas e desempenho

  ## 📝 Considerações Finais

Este projeto demonstra habilidades essenciais para desenvolvimento front-end moderno, integrando React, Next.js e IA conversacional de forma coesa. As melhorias sugeridas visam não apenas aumentar a funcionalidade da aplicação, mas também torná-la mais acessível, intuitiva e personalizada para os fãs da FURIA.

A implementação de banco de dados vetoriais e técnicas de RAG representaria um grande avanço na qualidade e contextualização das respostas, elevando significativamente a experiência do usuário e o valor do produto para a FURIA.

---

Desenvolvido com 💙 como parte do processo seletivo para assistente em engenharia de software na FURIA.