# Aplicação FullStack
Desafio FullStack para consulta de filmes/cinemas.
# Aplicação Node
API HTTP em Node.js com TypeScript, Express e Docker no backend, já no frontend optei por utilizar React + Vite.

## Guia de desenvolvimento
Prerequisites:

-  caso não utilize docker é recomendado ter uma versao do node mais atual.
- `yarn` ou `npm` (para gerenciamento de dependências e execução de scripts)
- `docker` e `docker-compose` (para executar o servidor)

### Backend:
Em primeiro lugar se faz necessário preencher as variáveis de ambiente do backend. Crie um arquivo .env na raíz do projeto backend (exemplo abaixo, há tambem um .env-example aqui no repositório).

```
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_DB=
POSTGRES_PASSWORD=
POSTGRES_PORT=
PORT=

```


Em seguida é so subir o container docker do banco de dados:
```
cd database
sudo docker compose up
```
Logo após isso entre no diretorio do backend e rode o projeto:

```
cd backend
npm i
npm run start
yarn start
```


### Frontend
Para startar a aplicação frontend é necessário preencher a variavel de ambiente com a porta escolhida na api:

```
VITE_PORT=
```

E depois rodar o projeto: 
```
cd frontend
npm i
npm run dev
```
Qualquer duvida só me chamar pelo linkedin

https://www.linkedin.com/in/gabriel-rodrigues-aaa352207/
