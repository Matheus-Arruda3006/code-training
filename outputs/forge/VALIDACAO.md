# Validação da entrega

## Verificado

- Build de produção React/Tailwind concluído com Vite.
- 5 testes Node aprovados: integridade do catálogo, notas por intervalo, estrutura ZIP, concorrência e casos de erro do projeto JavaScript.
- 2 testes Python aprovados: aritmética decimal e rejeição de CSV inválido.
- Projeto TypeScript compilado; 5 verificações de transições aprovadas.
- API Laravel 12.69.3 executada em PHP 8.3.35 com SQLite em memória: 2 testes e 14 assertions aprovados, incluindo isolamento entre contas, validação do progresso, login, rotação e revogação de token.
- Verificação no navegador de página inicial, navegação de trilhas, filtro Web, marcação de aula, troca de aula, seleção de linha e abertura da resolução.
- Verificação de largura no viewport móvel: largura do documento igual à largura visível, sem transbordamento horizontal.

## Limites de verificação

- Os exemplos C, C++ e Java foram revisados, mas não compilados neste ambiente.
- A execução dos exemplos C#/.NET foi impedida por erro de TLS ao acessar o NuGet para obter os componentes .NET 8. Não há resultado de execução confirmado desses dois projetos.
- O Docker Compose está incluído, mas não foi executado.
- A integração HTTP é coberta pelos testes da API; não houve teste ponta a ponta do login React com servidor PHP publicado.
- O frontend funciona sem servidor em modo de progresso local. A API Laravel exige uma hospedagem PHP própria para uso online. O Sites não executa PHP.
- A publicação privada foi bloqueada pela revisão automática de aprovação durante a sincronização do código; nenhuma URL de produção foi confirmada. O projeto do Sites registrado é appgprj_6acd391ff0ac8191909707625783b5e1. Reutilize esse ID em uma futura publicação, sem criar outro site.

O ZIP inclui fontes e instruções; não inclui ferramentas portáteis usadas na validação, dependências instaladas, credenciais ou dados de usuários.
