<h1 align="center">
  <img alt="Daily Diet API" title="Daily Diet API" src="https://raw.githubusercontent.com/tavareshenrique/ignite-nodejs/main/%40assets/logo.webp" width="100px" />
</h1>

<p align="center">
  <img alt="Made by Henrique Tavares" src="https://img.shields.io/badge/made%20by-Henrique Tavares-%20?color=0a0a0a">
  <img alt="GitHub license" src="https://img.shields.io/github/license/tavareshenrique/ignite-nodejs?color=0a0a0a">
</p>

<p align="center">
  <a href="#information_source-como-executar">ℹ️ Como Executar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#clipboard-requisitos">📋 Requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-autores">💻 Autores</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">📝 Licença</a>
</p>

<p align="center">
  O <b>API Rest NodeJS</b> é o projeto do <b>segundo módulo</b> do curso <b>Ignite NodeJS</b> da Rocketseat. O projeto consiste em criar uma API de transações financeiras.
</p>

<p align="center">
  <a href="https://insomnia.rest/run/?label=02%20-%20Ignite%20NodeJS%20%2F%20Daily%20Diet%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftavareshenrique%2Fignite-nodejs%2Fmain%2F02-api-rest-nodejs%2Fassets%2FInsomnia_2024-08-25.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

</p>

---

# :information_source: Como Executar?

> **1.0.** Clone o Repositório:

```bash
git clone https://github.com/tavareshenrique/ignite-nodejs.git
```

> **1.1.** Acesse a pasta:

```bash
cd 02-api-rest-nodejs
```

> **1.2.** Instale as dependências:

```bash
yarn
```

> **1.2.** Inicie o Serviço:

```bash
yarn dev
```

> ➡️ Use [http://localhost:3333](http://localhost:3333) para acessar a aplicação.

# :rocket: Tecnologias

- [Fastify](https://www.fastify.io/)
- [Fastify Cookies](https://github.com/fastify/fastify-cookie)
- [knex](https://knexjs.org/)
- [sqlite3](https://www.sqlite.org/index.html)
- [TypeScript](https://www.typescriptlang.org/)
- [dotenv](https://github.com/motdotla/dotenv)
- [zod](https://github.com/colinhacks/zod)
- [tsup](https://github.com/egoist/tsup)
- [tsx](https://github.com/esbuild-kit/tsx)
- [vitest](https://vitest.dev/)

# :clipboard: Requisitos

## RF 

- [x] O usuário deve poder criar uam nova transação;
- [x] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;

## RN

- [x] A transação pode ser do tipo crédito que somará ao valor total, ou débito que subtrairá do valor total;
- [x] Deve ser possível identificarmos o usuário entre as requisições;
- [x] O usuário só pode visualizar transações o qual ele criou;

# :computer: Autores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/tavareshenrique/">
        <img src="https://avatars1.githubusercontent.com/u/27022914?v=4" width="100px;" alt="Henrique Tavares"/>
        <br />
        <sub>
          <b>Henrique Tavares</b>
        </sub>
       </a>
       <br /> 
       <a href="https://www.linkedin.com/in/tavareshenrique/" title="Linkedin">@tavareshenrique</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Code">💻</a>
    </td>
    <td align="center">
      <a href="http://github.com/rocketseat/">
        <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" width="100px;" alt="Logo da Rocketseat"/>
        <br />
        <sub>
          <b>Rocketseat</b>
        </sub>
       </a>
       <br />
       <a href="http://github.com/rocketseat/" title="Linkedin">@rocketseat</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Education Platform">🚀</a>
    </td>
  </tr>
</table>

# :memo: Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo de [licença](./LICENSE) para mais detalhes.
