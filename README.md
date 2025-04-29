# FALAFURIA CHATBOT

## 📋 Sobre o Projeto

O Falafuria Chatbot é uma aplicação de chat assistente desenvolvida como parte do processo seletivo para estágio em engenharia de software na FURIA. Este chatbot especializado fornece informações sobre o time de CS:GO da FURIA, construído com Next.js e TypeScript, e integrado com modelos de IA da OpenAI para oferecer respostas contextuais aos fãs e entusiastas.

## 🚀 Tecnologias Utilizadas

- **Next.js** - Framework React para desenvolvimento frontend
- **TypeScript** - Linguagem com tipagem estática para desenvolvimento robusto
- **Tailwind CSS** - Framework CSS para estilização e design responsivo
- **Versel AI SDK** - Integração simplificada com modelos de IA (OpenAI GPT)
- **Shadcn UI** - Biblioteca de componentes acessíveis e personalizáveis

## 🛠️ Principais Funcionalidades

### 1. Interface de Chat Interativa
- Janela arrastável e redimensionável para melhor experiência do usuário
- Design responsivo adaptado a diferentes tamanhos de tela e dispositivos
- Sistema completo de chat com histórico de mensagens persistente

### 2. Perguntas Frequentes (FAQs)
- Categorias organizadas para facilitar a navegação
- Seleção rápida de perguntas comuns sobre o time
- Integração direta com o sistema de chat para respostas instantâneas

### 3. Assistente Virtual Personalizado
- Respostas especializadas sobre o time e jogadores da FURIA
- Comunicação com linguagem descontraída e jovem, alinhada ao público-alvo
- Integração com o modelo GPT-4.1-nano da OpenAI

### 4. Interface Customizada
- Tema visual alinhado à identidade visual da FURIA
- Suporte a modo claro e escuro para diferentes preferências
- Opções de personalização do tamanho da fonte para acessibilidade
- Avatares personalizados para usuário e assistente

## 📸 Capturas de Tela

![Interface de Chat Dark Mode](/screenshots/homePage_DarkTheme.png)
![Interface de Chat White Mode](/screenshots/homePage_WhiteTheme.png)
![Janela de Configurações do Chat](/screenshots/chatConfig.png)
![Exemplo do Chat em Funcionamento](/screenshots/chatInteraction.png)
![Exemplo de FAQs](/screenshots/chatFAQs.png)

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js (versão LTS recomendada)
- npm, yarn ou pnpm

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/yourusername/furai-chat.git
cd furai-chat
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

Para utilizar o chat com IA, é necessária uma chave da API do OpenAI:

**Como obter sua chave:**
1. Acesse: https://openai.com/
2. No canto superior direito, clique em "Log in" e em "API Platform"
3. Faça login e pesquise "API keys" na barra lateral esquerda
4. Clique em "+ Create new secret key"
5. Defina um nome, mantenha o projeto default com todas as permissões
6. Copie o código de acesso gerado

Crie um arquivo .env.local no diretório raiz:
```
OPENAI_API_KEY=sua_chave_api_aqui
```

> **Nota importante:** As requisições via API da OpenAI não são gratuitas para todos os modelos. O projeto utiliza o modelo gpt-4.1-nano (gratuito até a data de publicação deste repositório). Este modelo funciona bem para testes, mas possui limitações: não tem acesso à internet e contém informações atualizadas apenas até outubro de 2023.

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🖱️ Guia de Uso

A interface de chat oferece múltiplas formas de interação:

- **Movimentação:** Clique e segure o cabeçalho para mover a janela de chat
- **Redimensionamento:** Arraste o canto inferior direito para ajustar o tamanho
- **Envio de mensagens:** Digite no campo de entrada e pressione Enviar ou Enter
- **Perguntas rápidas:** Acesse a aba "Perguntas Frequentes" e selecione uma opção
- **Personalização:** Clique no ícone de engrenagem para ajustar tema e tamanho da fonte

### Atalhos de Teclado

- **Tab:** Navegue entre os elementos interativos
- **Enter/Espaço:** Ative botões e controles
- **Escape:** Feche diálogos ou cancele operações em andamento

## ⚙️ Personalização Técnica

### Estilização
Os componentes utilizam Tailwind CSS. Você pode modificar os estilos diretamente nos componentes ou atualizar a configuração global no arquivo `tailwind.config.js`.

### Tematização
Para alterar o esquema de cores:
1. Modifique as variáveis de cores no `tailwind.config.js`
2. Atualize os tokens de design nos arquivos de tema

### Extensão de Funcionalidades
Para adicionar novos recursos:
1. Crie componentes adicionais no diretório `components/`
2. Importe e utilize-os no componente principal `Chat.tsx`
3. Atualize os provedores de contexto conforme necessário

## 🔍 Solução de Problemas Comuns

| Problema | Solução |
|----------|---------|
| A posição da janela é redefinida ao atualizar | Implemente armazenamento persistente com localStorage |
| O chat não redimensiona corretamente | Verifique a compatibilidade do navegador e as configurações de overflow no CSS |
| Mensagens não são enviadas | Confirme se a chave da API está configurada corretamente no arquivo .env.local |
| Texto cortado em dispositivos móveis | Ajuste os valores de padding e margin nas media queries |

## 🧠 Sugestões de Melhorias Futuras

### 1. Acessibilidade Avançada
- Navegação por teclado aprimorada com anúncios ARIA
- Suporte completo a leitores de tela com descrições detalhadas
- Opções de contraste alto e desativação de animações

### 2. Chat por Voz
- Reconhecimento de fala via Web Speech API
- Síntese de voz para leitura de respostas
- Comandos de voz para navegação e ações

### 3. Base de Conhecimento Especializada
- Base de dados vetorial com informações específicas da FURIA
- Sistema RAG (Retrieval Augmented Generation) para respostas mais precisas
- Personalização contextual baseada no histórico de interações

### 4. Recursos Complementares
- Sistema de notificações para atualizações do time em tempo real
- Integração com mídias sociais da FURIA
- Conteúdo multimídia dinâmico nas respostas (imagens, vídeos, estatísticas)

## 📝 Considerações Finais

Este projeto demonstra habilidades essenciais de desenvolvimento frontend moderno, integrando React, Next.js e IA conversacional de forma coesa. As melhorias sugeridas visam não apenas aumentar a funcionalidade da aplicação, mas também torná-la mais acessível, intuitiva e personalizada para os fãs da FURIA.

---

Desenvolvido com 💙 como parte do processo seletivo para estágio em engenharia de software na FURIA.