# Forge — Engenharia na prática

Plataforma em português para quem já programa. React 19 + Tailwind CSS 4 no frontend; PHP 8.2+ com Laravel 12 na API. O site contém 8 trilhas, 24 aulas guiadas, 8 desafios resolvidos e 8 projetos pequenos completos. Cada trilha tem uma aula de contratos, uma de implementação e uma de validação. Não é um catálogo de cursos extensos: o conteúdo disponível é exatamente esse conjunto de laboratórios aplicados.

## O que funciona

- Busca e filtros por linguagem, área e nível.
- Aulas, leitor de arquivos completos, seleção de linhas com explicação sintática e contexto do bloco.
- Desafios com critérios de aceite, rascunho local, resolução e autoavaliação de conclusão.
- Downloads ZIP com todos os arquivos de cada projeto e README de execução.
- Favoritos e progresso no navegador; cadastro, login e sincronização de progresso via API quando configurada.
- Layout responsivo, controles de teclado, links internos compartilháveis e exportação de progresso.

O código dos alunos **não é executado pelo site**. Os comandos e testes de cada projeto são executados no ambiente local. Favoritos e rascunhos permanecem no navegador. A API armazena contas e aulas/desafios concluídos. O backend também disponibiliza o catálogo em GET /api/catalog; o frontend inclui uma cópia versionada para leitura offline da API.

## 1. Frontend

Requer Node.js 22.13+ e pnpm 11.25.0 (declarado em package.json).

```sh
corepack enable
pnpm install
pnpm dev
```

Abra http://localhost:5173. Sem VITE_API_URL, a experiência é inteiramente local ao navegador.

```sh
pnpm test
pnpm build
```

O build estático fica em dist/. Para visualizar o build: `pnpm exec vite preview`.

## 2. API Laravel — instalação direta

Requer PHP 8.2+ com pdo_sqlite, mbstring, openssl, fileinfo, tokenizer, xml e dom, e Composer 2.

Na pasta backend:

```sh
composer install
```

Copie `.env.example` para `.env` (PowerShell: `Copy-Item .env.example .env`; macOS/Linux: `cp .env.example .env`). As pastas graváveis bootstrap/cache e storage estão incluídas no pacote. Crie o banco e inicialize:

```sh
php -r "touch('database/database.sqlite');"
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Execute os testes com `php vendor/phpunit/phpunit/phpunit`. Os testes usam SQLite em memória, sem tocar nos dados reais. Não execute com banco de produção. O comando padrão é PHPUnit direto porque esta distribuição não inclui Collision.

## 3. API com Docker (alternativa)

Com Docker e Compose instalados, na raiz:

```sh
docker compose up --build
```

O banco persiste no volume forge-data. Esta configuração é de desenvolvimento, usa o servidor embutido do PHP e escuta apenas em loopback. Para testar: `docker compose exec api php vendor/phpunit/phpunit/phpunit`.

## 4. Integre React e Laravel

Na raiz do frontend, copie `.env.example` para `.env` e defina:

```dotenv
VITE_API_URL=http://localhost:8000/api
```

Reinicie Vite. Abra as configurações pelo avatar, crie uma conta e marque uma aula como concluída. Confira a persistência após recarregar. Ao conectar uma conta, o progresso do servidor substitui a visualização local; exporte o progresso antes se quiser guardar o estado anterior. A API é a fonte de verdade da conta. Um novo login invalida o token anterior. Tokens expiram após 30 dias.

No backend, FRONTEND_ORIGINS deve listar as origens permitidas, separadas por vírgula. A integração usa Bearer token; não usa cookies cross-site. O token fica no armazenamento local do navegador. Para aplicações em ambiente sensível, migre para sessão HTTP-only com Sanctum e revise o modelo de ameaças antes de ampliar o uso.

## 5. Contrato HTTP

| Método | Rota | Entrada | Autenticação |
|---|---|---|---|
| GET | /up | — | Pública |
| GET | /api/catalog | — | Pública |
| POST | /api/register | name, email, password (mín. 10) | Pública, limitada |
| POST | /api/login | email, password | Pública, limitada |
| GET | /api/progress | — | Bearer |
| PUT | /api/progress | {"completed":["python:0"]} | Bearer |
| POST | /api/logout | — | Bearer |

Erros de validação retornam 422; token inválido retorna 401; limite de requisições retorna 429. Senhas usam bcrypt e o servidor armazena apenas SHA-256 do token aleatório. Cada usuário só acessa seu próprio progresso. Os IDs de conclusão são restritos a 32 itens conhecidos. PUT substitui a lista; escritas simultâneas usam a última gravação. Não há colaboração em tempo real, recuperação de senha ou verificação de e-mail nesta versão.

## 6. Publicação

O Sites hospeda o frontend estático e não executa PHP. O frontend publicado inicialmente funciona com armazenamento local. Para integração online, hospede backend/public em um servidor PHP/Laravel com HTTPS, grave APP_KEY com `php artisan key:generate`, desabilite APP_DEBUG, configure permissões de storage e bootstrap/cache, execute `php artisan migrate --force` e mantenha cópias do banco. Configure FRONTEND_ORIGINS com a origem real do frontend.

Depois, defina VITE_API_URL com a URL HTTPS da API, gere novo build e publique-o. Variáveis VITE são incorporadas no build e não devem conter segredos. Sirva apenas backend/public, nunca a pasta backend inteira. O Dockerfile incluído é para desenvolvimento; para produção use PHP-FPM com um servidor web e TLS. A documentação oficial de implantação está em https://laravel.com/docs/12.x/deployment.

## 7. Organização dos arquivos

```text
src/main.jsx          Interface, navegação, estado e integração HTTP
src/style.css         Tailwind e sistema visual responsivo
src/catalog.mjs       Conteúdo completo das oito trilhas
src/lib.mjs           ZIP, downloads, leitura do código e persistência
backend/              Aplicação Laravel, migrations e testes
projects/             Oito projetos didáticos extraídos do catálogo
tests/                Verificações do catálogo e dos pacotes
scripts/export-projects.mjs  Gera projetos, catálogo JSON e pacote fonte
```

Para atualizar conteúdo, edite src/catalog.mjs e execute `node scripts/export-projects.mjs`, `pnpm test` e `pnpm build`. O pacote público forge-source.zip inclui somente código-fonte e exemplos; não inclui .env, banco, vendor ou node_modules.

## 8. Estudo e portfólio

Cada pasta projects contém seu próprio README. Use Python 3.11+, .NET SDK 8, compilador C17, compilador C++17, JDK 17 ou Node.js 22 conforme a trilha. JavaScript usa testes nativos; TypeScript instala seu compilador; os demais exemplos evitam dependências de terceiros. No projeto de estoque, o script de concorrência Python requer o servidor recém-iniciado. Os comandos curl mostrados usam sintaxe de shell POSIX; no PowerShell use curl.exe e adapte as aspas do JSON ou use Invoke-RestMethod.

Apresente os projetos como laboratórios de engenharia, documente seus limites e acrescente uma funcionalidade autoral antes de usá-los como prova de experiência. Não confunda o tamanho reduzido de um laboratório com prontidão para produção.
