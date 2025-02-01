<h1 align="center">
	<img alt="Ignite NodeJS" title="Ignite NodeJS" src="https://raw.githubusercontent.com/tavareshenrique/ignite-nodejs/main/%40assets/logo.webp" width="100px" />
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
	O <b>API Solid</b> é o projeto do <b>terceiro módulo</b> do curso <b>Ignite NodeJS</b> da Rocketseat. O projeto consiste em criar uma API estilo Gympass usando SOLID e Clean Architecture.
</p>

<p align="center">
	<a href="https://insomnia.rest/run/?label=03-api-solid&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftavareshenrique%2Fignite-nodejs%2Frefs%2Fheads%2Fmain%2F03-api-solid%2Fassets%2FInsomnia_2025-02-01.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

# :information_source: Como Executar?

> **1.0.** Clone o Repositório:

```bash
git clone https://github.com/tavareshenrique/ignite-nodejs.git
```

> **1.1.** Acesse a pasta:

```bash
cd 03-api-solid
```

> **1.1.** Instale as dependências:

```bash
pnpm install
```

> **1.2.** Crie a .env a partir da .env.example

```bash
cp .env.example .env
```


> **1.3.** Inicie o Banco de Dados com Docker:

```bash
docker-compose up --build
# A flag "--build" só é usado na primeira vez que for subir o banco de dados.

# Deixe rodando em um terminal e abra outro terminal para rodar os próximos comandos.
```

> **1.4.** Rode as Migrations:

```bash
npx prisma migrate dev
```

> **1.5.** Gere os types a partir do prisma:

```bash
npx prisma generate
```

> **1.6.** Inicie o Serviço:

```bash
pnpm dev
```

> ➡️ Use [http://localhost:3333](http://localhost:3333) para acessar a aplicação.

# :rocket: Tecnologias

- [Fastify](https://fastify.dev/)
- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [@fastify/jwt](https://github.com/fastify/fastify-jwt)
- [@fastify/multipart](https://github.com/fastify/fastify-multipart)
- [@fastify/static](https://github.com/fastify/fastify-static)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [tsx](https://github.com/esbuild-kit/tsx)
- [tsup](https://github.com/egoist/tsup)
- [supertest](https://github.com/ladjs/supertest)
- [vitest](https://vitest.dev/)
- [zod](https://zod.dev/)

# :clipboard: Requisitos

## RFs (Requisitos Funcionais)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas (até 10km);
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia;

## RNs (Regras de Negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [X] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [X] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos Não-Funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);

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
