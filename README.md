# Ecommerce NestJS

Este projeto é uma plataforma de **e-commerce** desenvolvida com o framework **NestJS**. Ele possui um sistema completo de gerenciamento de conteúdo (CMS), funcionalidades básicas de loja virtual (como cadastro e busca de produtos), além de integrações com banco de dados e motores de busca.

## 🚀 Tecnologias utilizadas

- **NestJS** – Framework Node.js para construção de APIs escaláveis
- **TypeScript** – Superset do JavaScript com tipagem estática
- **TypeORM** – ORM para banco de dados relacional (PostgreSQL)
- **PostgreSQL** – Banco de dados relacional principal
- **MongoDB** – Suporte para operações específicas via banco NoSQL
- **OpenSearch** – Busca avançada de produtos
- **Commander CLI** – Interface de linha de comando com `nest-commander`
- **Handlebars (HBS)** – Motor de templates para renderização de páginas
- **Class-validator & class-transformer** – Validação e transformação de DTOs
- **Swagger** – Documentação automática da API
- **Dotenv** – Configurações via variáveis de ambiente
- **Prettier & ESLint** – Padronização e linting de código
- **Jest** – Testes unitários e e2e

## 📦 Scripts disponíveis

| Comando             | Descrição                                           |
|---------------------|-----------------------------------------------------|
| `npm run start`     | Inicia a aplicação em modo produção                 |
| `npm run start:dev` | Inicia a aplicação com reload automático (dev)      |
| `npm run build`     | Compila o projeto TypeScript para JavaScript        |
| `npm run format`    | Formata o código usando Prettier                    |
| `npm run lint`      | Corrige problemas de lint com ESLint                |
| `npm run test`      | Executa os testes unitários                         |
| `npm run test:watch`| Executa os testes em modo watch                     |
| `npm run test:cov`  | Gera relatório de cobertura de testes               |
| `npm run test:e2e`  | Executa os testes end-to-end                        |
| `npm run command`   | Executa o comando customizado via nest-commander    |

## 📁 Estrutura esperada

- `src/` – Código-fonte da aplicação
- `test/` – Testes unitários e e2e
- `src/command.ts` – Ponto de entrada para comandos CLI

## 💡 Funcionalidades

- 📦 Cadastro e listagem de produtos
- 🔍 Busca avançada com OpenSearch
- 🧩 CMS para controle do conteúdo das páginas
- 👤 Gerenciamento de usuários (em construção ou futuro)
- 📊 Integrações com múltiplos bancos e serviços

---

> Desenvolvido com 💻 e ☕ por JoaoFerrazfs
