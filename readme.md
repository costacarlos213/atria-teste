## 💡 Sobre o projeto

API com CRUD de cinema realizado como teste para empresa Junior Atria JR. da Unicamp.

## ⚙️ Techs

- Node
- Express
- Postgres

## 🏁 Como eu uso?

Para clonar esse projeto em sua máquina,
Execute o seguinte comando:

```bash
git clone https://github.com/costacarlos213/atria-teste
```

## ✨ Instalando dependências

```
yarn
```

_ou_

```
npm install
```

_obs: caso opte por instalar com o npm, lembre-se de remover os arquivos yarn.lock e yarn-error.log_

## 🛠 Configurando variáveis de ambiente

Renomeie o arquivo `.env.example` para `.env` e o preencha com os dados necessários para o funcionamento da API

_obs: observe que a aplicação adotará valores padrões para todos os campos não preenchidos_

## 🎲 Configurando o banco de dados

Certifique-se de ter acesso à uma instância do banco de dados PostgreSQL e que o arquivo `.env` está corretamente preenchido. Para ter certeza de que tudo corra bem, por favor, certifique-se de estar conectado à um banco de dados vazio.
Após isso, execute o seguinte comando no terminal:

```bash
yarn migration:run
```

Isso irá criar as tabelas, relações e constraints necessárias para o projeto em seu banco de dados.

## 🏃‍♀️ Executando o projeto na máquina

Com todas as dependências instaladas, o ambiente e o banco de dados configurado e em execução, você pode executar a API com:

```
yarn dev:server
```

_ou_

```
npm run dev:server
```

## 🕹 Interagindo com a API

Todos os endpoints e parâmetros estão contidos [nesta documentação](https://documenter.getpostman.com/view/25299399/2s93mASyuL). No ambiente _Development_ está a porta e endereço padrão configurado no `.env`.
