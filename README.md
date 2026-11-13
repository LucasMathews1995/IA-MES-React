🌐 IA-MES Web (suporte-mes-web)

Front-end web corporativo desenvolvido em React e Vite para a plataforma IA-MES (Sistema Inteligente de Suporte à Execução de Manufatura).

Esta interface foi desenhada especificamente para estações de trabalho fixas no chão de fábrica e salas de controle, oferecendo alta acessibilidade (zero instalação via navegador) e visualização densa de dados para operadores, analistas e equipes de suporte TI/MES.

🚀 Principais Funcionalidades

📊 Dashboard de Normas e Procedimentos (IOPs):

Navegação por abas categorizadas: TRAINING (Treinamentos), IOP (Instruções Operacionais Padrão) e EXPLANATION (Explicações Técnicas).

Cards interativos detalhando incidentes operacionais (ex: "Lote não aparece na tela", "Lote desaparecido").

Acesso rápido a fichas detalhadas contendo ID da IOP, Equipamento/Linha (ex: LTQ) e Chamado de Referência com cópia rápida (123456-1).

Cadastro dinâmico de novas normas diretamente pela interface (+ Novo IOP/Treinamento).

🤖 Assistente de IA Integrado (RAG):

Chat contextual em tempo real para consulta rápida de problemas de produção em linguagem natural.

Respostas estruturadas apresentando correlação semântica, documento normativo correspondente e passo a passo exato nas telas do sistema (ex: Tela 4J11).

🔐 Segurança e Autenticação (Keycloak):

Integração completa com o ecossistema de identidade OAuth2 / OIDC, garantindo login seguro e restrição de acesso por perfil corporativo.

🛠️ Stack Tecnológica

Framework: React 18+ com Vite (Build ultrarrápido e otimizado)

Estilização & Ícones: Tailwind CSS / Componentes estilizados customizados + lucide-react

Roteamento: React Router DOM

Comunicação HTTP: Axios (com interceptação de tokens JWT)

⚙️ Como Executar o Projeto Localmente

Pré-requisitos

Node.js instalado (versão 18 ou superior recomendada).

API Backend IA-MES em execução (padrão em http://localhost:8080).

Servidor Keycloak configurado para autenticação.

Passo a passo

Clone este repositório:

git clone https://github.com/LucasMathews1995/IA-MES-React.git
cd IA-MES-React


Instale as dependências:

npm install


Inicie o servidor de desenvolvimento:

npm run dev


Acesse no navegador em: http://localhost:3000 (ou a porta indicada no seu terminal).

👨‍💻 Autor

Desenvolvido por Lucas Mathews dos Reis Evangelista

Engenheiro de Computação | Especialista em Operações TI/MES & Desenvolvedor Full-Stack / Web & Mobile.
