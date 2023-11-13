<h1>Chat.IO</h1>

<p>
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-brightgreen"/>
  <img src="https://img.shields.io/badge/última%20atualização-novembro-yellowgreen"/>
  <img src="https://img.shields.io/badge/Node.JS-18.18.7-blueviolet"/>
</p>

<h2>Descrição</h2>
Projeto de chat em realtime utilizando WebSockets juntamente com servidor HTTP.<br>
<br>

<h2>Funcionalidades</h2>
<h3>Implementadas :heavy_check_mark:</h3>

- `Cadastro de usuário`:
  - Método: POST
  - Endpoint: `/user/signup`
  - Propriedades:
    - "name": String
    - "username": String
    - "password": String
    - "status": Boolean
- `Login de usuário`:
  - Método: POST
  - Endpoint: `/user/signin`
  - Propriedades:
    - "username": String
    - "password": String
- `Logout de usuário`:
  - Método: POST
  - Endpoint: `/user/logout`
  - Propriedades:
    - "\_id": String
- `Listagem de usuários cadastrados`:
  - Método: GET
  - Endpoint: `/user/list`

<h2>Acesso ao projeto 📁</h2>

Você pode [acessar o código fonte do projeto inicial aqui](https://github.com/angelobordin/chat.io), ou [baixá-lo aqui](https://github.com/angelobordin/chat.io/archive/refs/heads/main.zip).

<h2>Abrir e rodar o projeto 🛠️</h2>
<h3>Pré-Requisitos</h3>

⚠️ [Node](https://nodejs.org/en/)<br>
⚠️ [MongoDB](https://www.mongodb.com/try/download/community)<br>
⚠️ [VS Code](https://code.visualstudio.com/Download)<br>
⚠️ [Docker](https://docs.docker.com/desktop/install/windows-install/)<br>

Após baixar o projeto no seu dispositivo, você pode abri-lo no VS Code.<br>
Para isso abra o VS Code em seu dispositivo, após clique em:

<h3>VS Code</h3>

- _File >> Open Folder..._ ou digite _Ctrl+K_ / _Ctrl+O_;
- Abra o terminal em _Terminal >> New Terminal_;

<h3>Aqui temos duas situações:</h3>

⚠️ ATENÇÃO ⚠️ <br>
**Para rodar o projeto em cluster altere a váriavel CLUSTER_MODE para "true" no arquivo .env !!**

<h2>Executando o Projeto com Docker</h2>

**Você deve possuir Docker e Docker Composer caso queira executar a aplicação com containers !!**

- Realize uma cópia do arquivo **.env.example** e renomeie como **.env**;
- Altere as váriaveis conforme estiverem definidas no arquivo **docker-compose.yml** no service **db**:
  - **[USER_ROOT]** deve ser substituida pelo valor da variável **MONGO_INITDB_ROOT_USERNAME**;
  - **[SENHA_ROOT]** deve ser substituida pelo valor da variável **MONGO_INITDB_ROOT_PASSWORD**;
  - **[HOST]** deve ser substituida pelo valor da propriedade **container_name**;
  - **[DATABASE]** deve ser substituida pelo valor da propriedade **MONGO_INITDB_DATABASE**;
- Em seguida basta executar o comando **docker-compose up --build** dentro da pasta do projeto;
- Caso houver algum conflito referente a porta de inicialização do servidor, basta a váriavel **SERVER_PORT** no arquivo **.env**.
  - Caso alterar a váriavel **SERVER_PORT** o mesmo valor deve ser inserido no arquivo **docker-compose.yml** no caminho services > backend > ports;

<h2>Executando o Projeto sem Docker</h2>

<h3>BackEnd</h3>

⚠️ ATENÇÃO ⚠️ <br>
**Deve haver um servidor MongoDB ja criado com usuário root para realização das operações na database definida no arquivo .env !!**

- Entre na pasta **Server**;
- Execute o comando **npm install** para instalar as dependências;
- Realize uma cópia do arquivo **.env.example** e renomeie como **.env**;
- Dentro do arquivo **.env** altere a constante **MONGO_URL** conforme necessário para realizar conexão com seu servidor MongoDB;
- Execute o comando **npm run start** para iniciar o servidor na porta 8080;
  - Caso houver algum conflito referente a porta de inicialização do servidor, basta alterar a váriavel **SERVER_PORT** no arquivo **.env**.

<h3>FrontEnd</h3>

- Entre na pasta "client";
- Execute o comando **npm install** para instalar as dependências;
- Execute o comando **npm run start** para iniciar a aplicação na porta 3000;

<h2>Tecnologias Utilizadas</h2>

<ul>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-plain.svg" width="20" height="20"/><b> Visual Studio Code</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" height="20"/><b> Node.JS</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="20" height="20"/><b> Express</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20" height="20"/><b> JavaScript</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="20" height="20"/><b> Git</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" width="20" height="20"/><b> MongoDB</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="20" height="20"/><b> ReactJS</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" width="20" height="20"/><b> Socket.IO</b></li>
  <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="20" height="20"/><b> Docker</b></li>
</ul>

# Autores

| [<img src="https://avatars.githubusercontent.com/u/70332789?s=400&u=c6b947894c97e0e941f64aafeb22719ff49589ac&v=4" width=115><br><sub>Angelo Bordin</sub>](https://github.com/angelobordin) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
