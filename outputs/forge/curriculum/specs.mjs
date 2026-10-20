// Problemas de engenharia com contratos e algoritmos distintos.
// A mesma especificação é implementada nas oito linguagens para comparação.
export const specs=[];
function add(id,title,area,fields,goal,decision,limit,extension,body,cases){specs.push({id,title,area,fields:fields.map(([name,min=0,max=10000])=>({name,min,max})),goal,decision,limit,extension,body:body.trim(),cases:cases.map(([input,expected])=>({input,expected})),level:specs.length<15?'Intermediário':'Avançado'});}

add('usage-billing','Faturamento por faixas de consumo','Finanças',[['units']],
'Calcular a cobrança de cada cliente: primeiras 100 unidades a 10 centavos, próximas 100 a 8 e excedente a 5. Saída: cobrança por linha, em centavos.',
'Faixas marginais cobram cada trecho separadamente; aplicar o preço final a todo o consumo cria saltos indevidos na fatura.',
'O(n), sem impostos ou moeda estrangeira. Os preços são uma política fictícia de produto, não tributária.',
'Externalize as faixas em configuração versionada e adicione vigência de preços.',`
for i in 0..n {
  let units = cell(i,0);
  // Divida o consumo entre as três faixas antes de multiplicar pelo preço.
  let total = minv(units,100) * 10;
  total = total + minv(maxv(units-100,0),100) * 8;
  total = total + maxv(units-200,0) * 5;
  emit total;
}`,[[[[0],[100],[150],[250]],[0,1000,1400,2050]],[[[1],[200]],[10,1800]]]);

add('reconciliation','Conciliação de lançamentos por conta','Finanças',[['account',0,99],['expected',0,10000],['settled',0,10000]],
'Consolidar diferenças entre valores esperados e recebidos. Saída: pares conta, diferença apenas para contas divergentes, em ordem de ID.',
'Agrupar antes de comparar evita sinalizar uma cobrança parcialmente liquidada quando seus recebimentos se compensam.',
'O(n+100); IDs limitados a 0–99 e valores em centavos. Não associa pagamentos sem identificador de conta.',
'Acrescente um identificador de transação e detecte duplicidades antes de conciliar.',`
vector balances 100;
for i in 0..n {
  let account = cell(i,0);
  balances[account] = balances[account] + cell(i,1) - cell(i,2);
}
// Emita apenas o que precisa de investigação operacional.
for account in 0..100 {
  if balances[account] != 0 {
    emit account;
    emit balances[account];
  }
}`,[[[[1,100,70],[1,30,60],[2,50,20]],[2,30]],[[[3,10,20]],[3,-10]]]);

add('payment-allocation','Alocação FIFO de recebimentos','Finanças',[['invoice',0,10000],['payment',0,10000]],
'Somar os pagamentos e alocá-los às faturas na ordem de entrada, representando vencimento crescente. Saída: saldo de cada fatura seguido do crédito não utilizado.',
'A ordem é uma regra de negócio: quitar dívidas antigas primeiro produz resultados diferentes de ratear proporcionalmente.',
'O(n); a ordem de vencimento é fornecida pelo cliente. Não calcula juros.',
'Inclua datas de vencimento e ordenação estável, preservando o ID original na saída.',`
let credit = 0;
for i in 0..n { credit = credit + cell(i,1); }
for i in 0..n {
  let paid = minv(credit,cell(i,0));
  credit = credit-paid;
  emit cell(i,0)-paid;
}
emit credit;
`,[[[[100,50],[80,100]],[0,30,0]],[[[40,100]],[0,60]]]);

add('expense-sharing','Rateio exato com maiores restos','Finanças',[['weight',1,100],['budget',0,10000]],
'Ratear a soma da coluna budget proporcionalmente aos pesos sem perder centavos. Em empates de resto, ganha a primeira linha. Saída: parcela por linha.',
'Primeiro atribua o piso das cotas; distribua os centavos restantes aos maiores restos. A soma final deve ser exatamente o orçamento.',
'O(n²) na seleção dos restos, n até 200. Pesos são inteiros positivos.',
'Substitua a seleção repetida por ordenação e compare os tempos preservando o desempate.',`
let total = 0;
let weights = 0;
for i in 0..n {
  total = total+cell(i,1);
  weights = weights+cell(i,0);
}
vector shares n;
vector remainders n;
let assigned = 0;
for i in 0..n {
  shares[i] = div(total*cell(i,0),weights);
  remainders[i] = (total*cell(i,0)) % weights;
  assigned = assigned+shares[i];
}
// Cada rodada retira o maior resto e impede que receba duas sobras.
while assigned < total {
  let best = 0;
  for i in 1..n { if remainders[i] > remainders[best] { best = i; } }
  shares[best] = shares[best]+1;
  remainders[best] = -1;
  assigned = assigned+1;
}
for i in 0..n { emit shares[i]; }
`,[[[[1,10],[1,0],[1,0]],[4,3,3]],[[[1,10],[3,0]],[3,7]]]);

add('subscription-proration','Prorrata de assinaturas em centavos','Finanças',[['monthly',0,10000],['active_days',0,31],['cycle_days',1,31]],
'Cobrar apenas os dias ativos do ciclo, com arredondamento half-up. Rejeitar dias ativos maiores que o ciclo. Saída: preço final por assinatura.',
'Explicitar o ciclo evita assumir que todo mês tem 30 dias. Arredonde apenas o resultado final, usando inteiros.',
'O(n); não define regras fiscais, fuso horário ou cobranças retroativas.',
'Modele intervalos de vigência em UTC e prove que não há cobrança dupla na troca de plano.',`
for i in 0..n {
  let price = cell(i,0);
  let days = cell(i,1);
  let cycle = cell(i,2);
  if days > cycle { fail; }
  // Dobrar numerador e denominador implementa half-up sem ponto flutuante.
  emit div(price*days*2+cycle,cycle*2);
}`,[[[[1000,15,30],[999,1,30]],[500,33]],[[[100,32,31]],null],[[[100,0,28]],[0]]]);

add('commission','Comissões com estorno e teto','Finanças',[['sold',0,10000],['returned',0,10000],['basis_points',0,10000],['cap',0,10000]],
'Calcular comissão sobre vendas líquidas, arredondada para baixo e limitada pelo teto por vendedor. Saída: comissão em centavos.',
'Estornos reduzem a base; uma base negativa vira zero. Basis points expressam taxas em inteiros, evitando ambiguidade percentual.',
'O(n); política de comissão ilustrativa, sem folha de pagamento ou regras trabalhistas.',
'Adicione uma tabela de faixas e uma trilha de auditoria da política aplicada.',`
for i in 0..n {
  let net = maxv(cell(i,0)-cell(i,1),0);
  let commission = div(net*cell(i,2),10000);
  emit minv(commission,cell(i,3));
}`,[[[[10000,1000,1000,800],[100,200,500,100]],[800,0]],[[[999,0,1000,1000]],[99]]]);

add('budget-control','Controle de orçamento com rejeição atômica','Finanças',[['department',0,99],['budget',0,10000],['request',0,10000]],
'Processar requisições em ordem. Cada linha adiciona orçamento e tenta gastar request; uma rejeição não consome saldo. Saída: 1/0 por requisição e saldo total final.',
'Checar e debitar constituem uma transição única. Um comando negado deve preservar o saldo anterior.',
'O(n+100); simulação em um processo, sem transação distribuída.',
'Persista as transições em banco usando atualização condicional e teste duas solicitações simultâneas.',`
vector balances 100;
for i in 0..n {
  let dept = cell(i,0);
  balances[dept] = balances[dept]+cell(i,1);
  if cell(i,2) <= balances[dept] {
    balances[dept] = balances[dept]-cell(i,2);
    emit 1;
  } else { emit 0; }
}
let total = 0;
for dept in 0..100 { total = total+balances[dept]; }
emit total;
`,[[[[1,100,80],[1,0,30],[2,50,20]],[1,0,1,50]],[[[0,0,1]],[0,0]]]);

add('inventory-reorder','Planejador de reposição de estoque','Operações',[['available',0,10000],['daily_demand',0,100],['lead_days',0,30],['safety',0,1000],['pack',1,100]],
'Calcular compra necessária para cobrir demanda durante o lead time mais reserva de segurança. Arredondar para múltiplos da embalagem. Saída: unidades a comprar.',
'Compra e necessidade são grandezas diferentes: o fornecedor pode vender apenas caixas fechadas.',
'O(n); demanda e prazo são determinísticos, sem previsão estatística.',
'Importe histórico de vendas e compare políticas sob diferentes níveis de serviço.',`
for i in 0..n {
  let target = cell(i,1)*cell(i,2)+cell(i,3);
  let missing = maxv(target-cell(i,0),0);
  let pack = cell(i,4);
  emit div(missing+pack-1,pack)*pack;
}`,[[[[20,5,5,10,12],[100,2,3,5,10]],[24,0]],[[[0,0,0,1,5]],[5]]]);

add('stock-ledger','Razão de estoque e reservas','Operações',[['sku',0,99],['action',0,2],['quantity',1,10000]],
'Interpretar action 0 como entrada, 1 como saída e 2 como consulta. Rejeitar saída sem saldo, sem alterá-lo. Saída: saldo após cada evento ou -1 na rejeição.',
'Separe comandos que alteram estado de consultas. A quantidade é obrigatória no protocolo, mas é ignorada na consulta.',
'O(n); não possui persistência, unidades fracionárias nem controle de concorrência entre processos.',
'Acrescente idempotency keys para impedir dupla baixa após repetição de mensagens.',`
vector stock 100;
for i in 0..n {
  let sku = cell(i,0);
  let action = cell(i,1);
  let quantity = cell(i,2);
  if action == 0 { stock[sku] = stock[sku]+quantity; }
  if action == 1 && quantity > stock[sku] { emit -1; }
  else {
    if action == 1 { stock[sku] = stock[sku]-quantity; }
    emit stock[sku];
  }
}`,[[[[1,0,10],[1,1,12],[1,1,4],[1,2,1]],[10,-1,6,6]],[[[0,1,1]],[-1]]]);

add('shelf-life','Separação de lotes por validade','Operações',[['expiry_day',0,10000],['quantity',0,10000],['today',0,10000]],
'Classificar unidades vencidas (validade menor que hoje) e ordenar os lotes utilizáveis por validade. Saída: quantidade vencida, seguida dos índices dos lotes válidos em ordem FEFO.',
'First-expire-first-out minimiza descarte. Empates preservam a ordem original e validade no dia atual ainda é utilizável.',
'O(n²); não considera armazenamento especial nem rastreamento regulatório.',
'Inclua alocação parcial de pedidos e identificação de lote no relatório.',`
vector used n;
let expired = 0;
for i in 0..n {
  if cell(i,0) < cell(i,2) { used[i] = 1; expired = expired+cell(i,1); }
}
emit expired;
for turn in 0..n {
  let best = -1;
  for i in 0..n {
    if used[i] == 0 {
      if best == -1 { best = i; }
      else { if cell(i,0) < cell(best,0) { best = i; } }
    }
  }
  if best != -1 { emit best; used[best] = 1; }
}`,[[[[9,5,10],[15,3,10],[10,2,10]],[5,2,1]],[[[0,7,1]],[7]]]);

add('token-bucket','Limitador token bucket','Confiabilidade',[['time',0,10000],['cost',1,10]],
'Simular bucket de capacidade 10, inicialmente cheio, com recarga de 2 tokens por unidade de tempo. Exigir tempos não decrescentes. Saída: aceite 1 ou rejeição 0.',
'A recarga é limitada pela capacidade: ficar ocioso não deve criar crédito ilimitado.',
'O(n); relógio fornecido pelo cliente para teste determinístico. Em produção use relógio monotônico e armazenamento atômico.',
'Implemente buckets por cliente e compare a política com janela deslizante.',`
let tokens = 10;
let previous = 0;
for i in 0..n {
  let now = cell(i,0);
  if now < previous { fail; }
  tokens = minv(10,tokens+(now-previous)*2);
  previous = now;
  if cell(i,1) <= tokens { tokens = tokens-cell(i,1); emit 1; }
  else { emit 0; }
}`,[[[[0,6],[0,6],[1,6],[4,10]],[1,0,1,0]],[[[2,1],[1,1]],null]]);

add('sliding-window','Limitador por janela deslizante','Confiabilidade',[['time',0,10000]],
'Aceitar no máximo 3 requisições no intervalo (agora-10, agora]. Rejeições não entram na janela. Saída: 1/0 por requisição, com tempos não decrescentes.',
'A fronteira aberta à esquerda evita contar uma requisição por uma unidade de tempo extra.',
'O(n²) para tornar a semântica explícita; uma deque melhora o custo para O(n).',
'Troque a varredura por deque e faça um teste de equivalência entre as implementações.',`
vector accepted n;
for i in 0..n {
  if i > 0 { if cell(i,0) < cell(i-1,0) { fail; } }
  let count = 0;
  for j in 0..i {
    if accepted[j] == 1 && cell(j,0) > cell(i,0)-10 { count = count+1; }
  }
  if count < 3 { accepted[i] = 1; emit 1; }
  else { emit 0; }
}`,[[[[0],[1],[2],[3],[10]],[1,1,1,0,1]],[[[1],[0]],null]]);

add('retry-policy','Planejador de retentativas com backoff','Confiabilidade',[['attempt',0,12],['base',1,100],['cap',1,10000],['seed',0,10000]],
'Produzir atraso exponencial limitado, com jitter determinístico entre metade e o valor máximo. Saída: atraso por tarefa; tentativa zero usa o atraso base.',
'Jitter evita clientes sincronizados. A semente permite testar o planejamento sem depender de aleatoriedade global.',
'O(n*12); o gerador de jitter é didático e não criptográfico. Repetir operações não idempotentes ainda pode duplicar efeitos.',
'Use um relógio injetável, registre o motivo da falha e respeite Retry-After.',`
for i in 0..n {
  let delay = minv(cell(i,1),cell(i,2));
  for attempt in 0..cell(i,0) { delay = minv(delay*2,cell(i,2)); }
  let half = div(delay,2);
  emit half + cell(i,3) % (delay-half+1);
}`,[[[[0,10,100,0],[3,10,50,10]],[5,35]],[[[12,100,10,100]],[9]]]);

add('circuit-breaker','Circuit breaker com reabertura','Confiabilidade',[['time',0,10000],['success',0,1]],
'Abrir circuito após 3 falhas consecutivas, rejeitar por 5 unidades de tempo e permitir uma sonda após esse prazo. Saída: 1 para chamada executada e 0 para bloqueada.',
'Uma sonda bem-sucedida fecha o circuito; uma sonda com falha reinicia a espera. Chamadas rejeitadas não contam como falhas novas.',
'O(n); simulação sequencial. Um breaker concorrente precisa reservar a sonda atomicamente.',
'Modele CLOSED/OPEN/HALF_OPEN explicitamente e injete relógio monotônico.',`
let failures = 0;
let until = 0;
for i in 0..n {
  let now = cell(i,0);
  if i > 0 { if now < cell(i-1,0) { fail; } }
  if now < until { emit 0; }
  else {
    emit 1;
    if cell(i,1) == 1 { failures = 0; }
    else { failures = failures+1; }
    if failures >= 3 { until = now+5; }
  }
}`,[[[[0,0],[1,0],[2,0],[3,1],[7,1],[8,0]],[1,1,1,0,1,1]],[[[0,1]],[1]]]);

add('worker-scheduler','Escalonador de jobs em três workers','Confiabilidade',[['arrival',0,10000],['duration',1,10000]],
'Atribuir cada job ao worker que ficará livre primeiro, respeitando a chegada. Saída: pares índice do worker, instante de término. Empate favorece menor índice.',
'Calcule início como máximo entre chegada e disponibilidade. Esse modelo torna a espera na fila observável.',
'O(3n); jobs são processados na ordem fornecida, não por prioridade.',
'Generalize o número de workers e use heap para encontrar a menor disponibilidade.',`
vector available 3;
for i in 0..n {
  let best = 0;
  for worker in 1..3 { if available[worker] < available[best] { best = worker; } }
  available[best] = maxv(available[best],cell(i,0))+cell(i,1);
  emit best;
  emit available[best];
}`,[[[[0,5],[0,2],[0,3],[1,1]],[0,5,1,2,2,3,1,3]],[[[10,2]],[0,12]]]);

add('dead-letter','Triagem de mensagens para dead-letter','Confiabilidade',[['status',100,599],['attempts',0,20]],
'Classificar resposta: 2xx=concluída (0), 408/429/5xx com menos de 5 tentativas=retry (1), demais=dead-letter (2).',
'Nem toda falha merece retry. Erros permanentes consomem recursos e ocultam mensagens que precisam de intervenção.',
'O(n); classificação ilustrativa que deve ser adaptada ao contrato do provedor.',
'Adicione códigos de erro de negócio e exporte razão e histórico de cada decisão.',`
for i in 0..n {
  let status = cell(i,0);
  if status >= 200 && status < 300 { emit 0; }
  else {
    if (status == 408 || status == 429 || status >= 500) && cell(i,1) < 5 { emit 1; }
    else { emit 2; }
  }
}`,[[[[200,0],[429,2],[503,5],[404,1]],[0,1,2,2]],[[[408,4]],[1]]]);

add('idempotency','Registro de idempotência com conflito','Confiabilidade',[['key',0,99],['payload',0,10000]],
'Aceitar a primeira chave (1), reconhecer repetição com mesmo payload (0) e rejeitar reutilização com payload diferente (-1).',
'Uma chave sozinha não basta: o payload precisa ser comparado para detectar conflito de intenção.',
'O(n), memória de 100 chaves; payload é uma representação numérica do conteúdo, sem hash criptográfico.',
'Persista chave, digest do payload, status e resposta numa transação com TTL.',`
vector seen 100;
vector payloads 100;
for i in 0..n {
  let key = cell(i,0);
  if seen[key] == 0 {
    seen[key] = 1;
    payloads[key] = cell(i,1);
    emit 1;
  } else {
    if payloads[key] == cell(i,1) { emit 0; }
    else { emit -1; }
  }
}`,[[[[1,10],[1,10],[1,20],[2,20]],[1,0,-1,1]],[[[0,0],[0,0]],[1,0]]]);

add('optimistic-lock','Atualizações com versão otimista','Confiabilidade',[['entity',0,99],['expected_version',0,10000],['delta',-10000,10000]],
'Aplicar delta apenas se a versão esperada coincidir com a atual (inicialmente 0). Saída: nova versão por sucesso ou -1 por conflito; ao final, soma dos saldos.',
'O conflito protege contra sobrescritas silenciosas. Um comando rejeitado não pode incrementar versão nem alterar saldo.',
'O(n+100); estado em memória, sem garantia entre processos.',
'Converta a condição em UPDATE WHERE version=? e teste o número de linhas afetadas.',`
vector versions 100;
vector balances 100;
for i in 0..n {
  let id = cell(i,0);
  if versions[id] == cell(i,1) {
    balances[id] = balances[id]+cell(i,2);
    versions[id] = versions[id]+1;
    emit versions[id];
  } else { emit -1; }
}
let total = 0;
for id in 0..100 { total = total+balances[id]; }
emit total;
`,[[[[1,0,10],[1,0,20],[1,1,-3]],[1,-1,2,7]],[[[0,1,10]],[-1,0]]]);

add('bin-packing','Empacotador first-fit de cargas','Operações',[['weight',1,100]],
'Distribuir itens em caixas de capacidade 100, escolhendo a primeira com espaço. Saída: caixa de cada item seguida do total de caixas.',
'First-fit é uma heurística determinística: rápida e fácil de explicar, mas não garante o mínimo global de caixas.',
'O(n²); pesos inteiros e caixas homogêneas. Não modela dimensões físicas.',
'Compare first-fit, first-fit decreasing e busca exata em instâncias pequenas.',`
vector used n;
let bins = 0;
for i in 0..n {
  let selected = -1;
  for b in 0..bins {
    if selected == -1 && used[b]+cell(i,0) <= 100 { selected = b; }
  }
  if selected == -1 { selected = bins; bins = bins+1; }
  used[selected] = used[selected]+cell(i,0);
  emit selected;
}
emit bins;
`,[[[[60],[50],[40],[50]],[0,1,0,1,2]],[[[100],[1]],[0,1,2]]]);

add('interval-merge','Consolidador de janelas de manutenção','Dados',[['start',0,10000],['end',0,10000]],
'Unir intervalos sobrepostos ou adjacentes. Entrada deve estar ordenada por início, com início menor que fim. Saída: pares início,fim das janelas consolidadas.',
'A convenção [início,fim) elimina dupla contagem nas fronteiras; janelas adjacentes podem ser unificadas sem alterar cobertura.',
'O(n); a entrada é validada como ordenada, não reorganizada silenciosamente.',
'Adicione fusos horários e calcule cobertura total sem converter datas em strings comparáveis.',`
let start = -1;
let end = -1;
for i in 0..n {
  if cell(i,0) >= cell(i,1) { fail; }
  if i > 0 { if cell(i,0) < cell(i-1,0) { fail; } }
  if start == -1 { start = cell(i,0); end = cell(i,1); }
  else {
    if cell(i,0) <= end { end = maxv(end,cell(i,1)); }
    else { emit start; emit end; start = cell(i,0); end = cell(i,1); }
  }
}
if start != -1 { emit start; emit end; }
`,[[[[1,4],[3,6],[6,8],[10,12]],[1,8,10,12]],[[[2,2]],null]]);

add('occupancy','Pico de ocupação de recursos','Operações',[['start',0,10000],['end',0,10000]],
'Calcular o máximo de reservas simultâneas em intervalos [início,fim). Saída: pico e primeiro instante em que ocorre; vazio retorna 0,-1.',
'O pico só muda nos inícios e finais; avaliar cada início evita discretizar todos os instantes.',
'O(n²); útil como referência correta para comparar uma sweep line O(n log n).',
'Implemente sweep line ordenando saídas antes de entradas no mesmo instante.',`
let peak = 0;
let first = -1;
for i in 0..n { if cell(i,0) >= cell(i,1) { fail; } }
for i in 0..n {
  let time = cell(i,0);
  let count = 0;
  for j in 0..n { if cell(j,0) <= time && cell(j,1) > time { count = count+1; } }
  if count > peak || (count == peak && (first == -1 || time < first)) { peak = count; first = time; }
}
emit peak;
emit first;
`,[[[[1,5],[2,4],[4,6]],[2,2]],[[[1,2],[2,3]],[1,1]]]);

add('sessionization','Sessões de navegação por inatividade','Dados',[['user',0,99],['time',0,10000]],
'Criar uma nova sessão para o usuário quando o intervalo desde seu último evento exceder 30. Tempos por usuário devem ser não decrescentes. Saída: número de sessão de cada evento.',
'O relógio é mantido por usuário; eventos intercalados de pessoas distintas não podem encerrar sessões uns dos outros.',
'O(n), 100 usuários; intervalo exatamente 30 permanece na sessão atual.',
'Processe eventos fora de ordem com watermark e documente quando uma sessão é finalizada.',`
vector last 100;
vector sessions 100;
for i in 0..n {
  let user = cell(i,0);
  let time = cell(i,1);
  if sessions[user] > 0 && time < last[user] { fail; }
  if sessions[user] == 0 || time-last[user] > 30 { sessions[user] = sessions[user]+1; }
  last[user] = time;
  emit sessions[user];
}`,[[[[1,0],[2,10],[1,30],[1,61],[2,20]],[1,1,1,2,1]],[[[1,4],[1,3]],null]]);

add('run-length','Compactador de sequências de telemetria','Dados',[['value',-10000,10000]],
'Compactar valores consecutivos iguais como pares valor,quantidade. Saída vazia para entrada vazia; valores iguais não adjacentes formam grupos distintos.',
'RLE ajuda sinais repetitivos, mas pode dobrar o volume para sinais que mudam sempre. Medir distribuição vem antes de escolher compressão.',
'O(n); não é um formato binário interoperável, e a saída mantém inteiros explícitos.',
'Implemente o descompactador e teste round-trip em sequências aleatórias.',`
let count = 0;
let previous = 0;
for i in 0..n {
  if count > 0 && cell(i,0) != previous { emit previous; emit count; count = 0; }
  previous = cell(i,0);
  count = count+1;
}
if count > 0 { emit previous; emit count; }
`,[[[[2],[2],[3],[2]],[2,2,3,1,2,1]],[[[-1],[-1]],[-1,2]]]);

add('snapshot-diff','Diff de snapshots de configuração','Dados',[['id',0,99],['side',0,1],['value',0,10000]],
'Comparar snapshot antigo (side 0) e novo (side 1). Rejeitar ID repetido no mesmo lado. Saída: pares ID,operação: 1 inserido, 2 alterado, 3 removido.',
'Distinguir presença de valor evita tratar zero como ausência. O resultado é ordenado por ID.',
'O(n+100); compara valores escalares, não árvores JSON nem segredos.',
'Adicione comparação estrutural e relatório de mudanças compatíveis e incompatíveis.',`
vector oldSeen 100;
vector newSeen 100;
vector oldValue 100;
vector newValue 100;
for i in 0..n {
  let id = cell(i,0);
  if cell(i,1) == 0 {
    if oldSeen[id] == 1 { fail; }
    oldSeen[id] = 1; oldValue[id] = cell(i,2);
  } else {
    if newSeen[id] == 1 { fail; }
    newSeen[id] = 1; newValue[id] = cell(i,2);
  }
}
for id in 0..100 {
  if oldSeen[id] == 0 && newSeen[id] == 1 { emit id; emit 1; }
  if oldSeen[id] == 1 && newSeen[id] == 0 { emit id; emit 3; }
  if oldSeen[id] == 1 && newSeen[id] == 1 && oldValue[id] != newValue[id] { emit id; emit 2; }
}`,[[[[1,0,10],[1,1,20],[2,0,0],[3,1,0]],[1,2,2,3,3,1]],[[[1,0,1],[1,0,2]],null]]);

add('watermark','Classificador de eventos atrasados','Dados',[['event_time',0,10000]],
'Manter watermark como maior timestamp observado menos 5. Classificar evento como atrasado (0) se menor que o watermark anterior; caso contrário, aceitar (1).',
'Compare antes de atualizar o máximo para explicitar a política. Watermarks não representam o relógio da máquina.',
'O(n); tolerância fixa de 5 e uma única partição. Não reabre agregações finalizadas.',
'Implemente watermark por partição e defina política para partições ociosas.',`
let maximum = 0;
for i in 0..n {
  let time = cell(i,0);
  if time < maximum-5 { emit 0; }
  else { emit 1; }
  maximum = maxv(maximum,time);
}
emit maxv(maximum-5,0);
`,[[[[10],[8],[3],[20],[15]],[1,1,0,1,1,15]],[[[0]],[1,0]]]);

add('moving-average','Monitor de média móvel','Dados',[['measurement',0,10000]],
'Calcular média inteira dos últimos 3 pontos, usando janela parcial no início. Saída: média truncada após cada medição.',
'Subtrair o item que sai da janela evita somar todos os pontos novamente. A janela mede eventos, não duração.',
'O(n); arredondamento para baixo, adequado apenas ao contrato definido.',
'Adicione média por intervalo de tempo e compare a influência de amostragem irregular.',`
let sum = 0;
for i in 0..n {
  sum = sum+cell(i,0);
  if i >= 3 { sum = sum-cell(i-3,0); }
  emit div(sum,minv(i+1,3));
}`,[[[[10],[20],[30],[100]],[10,15,20,50]],[[[1],[2]],[1,1]]]);

add('percentile','Calculador de latência p50 e p95','Observabilidade',[['latency',0,10000]],
'Ordenar amostras e calcular p50 e p95 por nearest rank. Saída vazia quando não há amostras; caso contrário, dois percentis.',
'Percentis dependem da convenção. Nearest rank escolhe ceil(p*n), com índice ajustado para base zero.',
'O(n²) por insertion sort, referência para datasets pequenos; não é agregável por média de percentis.',
'Compare com histograma e explique o erro de aproximação nos buckets.',`
vector values n;
for i in 0..n {
  values[i] = cell(i,0);
  let j = i;
  while j > 0 {
    if values[j-1] > values[j] {
      let swap = values[j-1]; values[j-1] = values[j]; values[j] = swap;
    }
    j = j-1;
  }
}
if n > 0 {
  emit values[div(50*n+99,100)-1];
  emit values[div(95*n+99,100)-1];
}`,[[[[9],[1],[4],[2]],[2,9]],[[[7]],[7,7]]]);

add('anomaly','Detector de desvio da linha de base','Observabilidade',[['value',0,10000],['baseline',0,10000],['tolerance_percent',0,100]],
'Sinalizar desvio absoluto estritamente maior que a tolerância percentual da linha de base. Base zero só aceita valor zero. Saída: 1 anômalo, 0 normal.',
'Compare produtos inteiros para não arredondar uma porcentagem antes da decisão.',
'O(n); regra estática, não modelo estatístico nem diagnóstico automático de incidente.',
'Construa baseline por horário e teste falsos positivos em dados sazonais.',`
for i in 0..n {
  let distance = absv(cell(i,0)-cell(i,1));
  if distance*100 > cell(i,1)*cell(i,2) { emit 1; }
  else { emit 0; }
}`,[[[[110,100,10],[111,100,10],[1,0,20]],[0,1,1]],[[[0,0,0]],[0]]]);

add('histogram','Histograma cumulativo de latências','Observabilidade',[['latency',0,10000]],
'Contar latências nos buckets cumulativos <=10, <=50, <=100 e total. Saída deve ser monotônica.',
'Buckets cumulativos permitem calcular faixas por diferença. Uma observação pode incrementar vários buckets.',
'O(n); os limites fixos devem ser escolhidos conforme SLO e resolução desejada.',
'Exporte as métricas em formato Prometheus e teste os limites inclusivos.',`
let small = 0; let medium = 0; let large = 0;
for i in 0..n {
  if cell(i,0) <= 10 { small = small+1; }
  if cell(i,0) <= 50 { medium = medium+1; }
  if cell(i,0) <= 100 { large = large+1; }
}
emit small; emit medium; emit large; emit n;
`,[[[[0],[10],[11],[50],[101]],[2,4,4,5]],[[[100]],[0,0,1,1]]]);

add('rbac','Motor de permissões por papel','Acesso',[['role',0,2],['operation',0,2]],
'Avaliar leitor (0: ler), editor (1: ler e escrever) e administrador (2: todas). Operações: ler 0, escrever 1, excluir 2. Saída: 1 permitido, 0 negado.',
'A política é explícita e nega por padrão. Papéis não devem ser aceitos diretamente de um usuário não autenticado.',
'O(n); demonstra decisão de autorização, sem autenticação nem segurança completa de aplicação.',
'Associe papéis ao usuário autenticado no servidor e adicione escopo por organização.',`
for i in 0..n {
  let role = cell(i,0);
  let operation = cell(i,1);
  if role == 2 || operation == 0 || (role == 1 && operation == 1) { emit 1; }
  else { emit 0; }
}`,[[[[0,0],[0,1],[1,2],[2,2]],[1,0,0,1]],[[[1,1]],[1]]]);

add('abac','Autorização por atributos e limite','Acesso',[['actor_team',0,99],['resource_team',0,99],['amount',0,10000],['approval_limit',0,10000],['suspended',0,1]],
'Permitir aprovação apenas na mesma equipe, até o limite do aprovador e sem suspensão. Saída: 1 permitido, 0 negado.',
'A autorização combina contexto do ator e do recurso. Uma regra isolada de valor não impede acesso entre equipes.',
'O(n); política fictícia. Atributos devem vir de fonte confiável no servidor.',
'Registre motivos da negativa e escreva testes de matriz de permissões.',`
for i in 0..n {
  if cell(i,0) == cell(i,1) && cell(i,2) <= cell(i,3) && cell(i,4) == 0 { emit 1; }
  else { emit 0; }
}`,[[[[1,1,100,100,0],[1,2,1,100,0],[1,1,10,100,1]],[1,0,0]],[[[0,0,101,100,0]],[0]]]);

add('credential-expiry','Planejador de rotação de credenciais','Acesso',[['expires_day',0,10000],['today',0,10000],['lead_days',0,365]],
'Classificar credenciais expiradas (2), a rotacionar (1) ou saudáveis (0). Expiração no dia atual já é expirada.',
'Separar urgência de execução permite revisar planos sem manipular segredos. O projeto nunca lê uma credencial real.',
'O(n); trabalha com metadados numéricos, sem acessar cofres ou trocar senhas.',
'Acrescente dono, criticidade e integração simulada de notificações com idempotência.',`
for i in 0..n {
  let remaining = cell(i,0)-cell(i,1);
  if remaining <= 0 { emit 2; }
  else { if remaining <= cell(i,2) { emit 1; } else { emit 0; } }
}`,[[[[10,10,2],[12,10,2],[13,10,2]],[2,1,0]],[[[1,2,0]],[2]]]);

add('hierarchical-quota','Cotas por usuário e organização','Acesso',[['user',0,99],['cost',1,100]],
'Aceitar consumo até 50 por usuário e 120 na organização. Rejeições preservam ambas as cotas. Saída: decisões e consumo global final.',
'As duas verificações precisam ocorrer antes de qualquer débito, senão uma falha parcial corrompe o saldo.',
'O(n); usuários pertencem à mesma organização simulada e as cotas não renovam por tempo.',
'Adicione organizações e implemente uma transação atômica com expiração de janela.',`
vector used 100;
let total = 0;
for i in 0..n {
  let user = cell(i,0);
  let cost = cell(i,1);
  if used[user]+cost <= 50 && total+cost <= 120 {
    used[user] = used[user]+cost; total = total+cost; emit 1;
  } else { emit 0; }
}
emit total;
`,[[[[0,50],[1,50],[2,30],[2,20],[0,1]],[1,1,0,1,0,120]],[[[1,51]],[0,0]]]);

add('routing','Roteador por menor carga ponderada','Distribuição',[['capacity',1,100],['active',0,10000]],
'Escolher servidor com menor razão active/capacity. Empates favorecem menor índice. Saída: índice escolhido, ou -1 no vazio.',
'Compare razões por multiplicação cruzada para evitar ponto flutuante. Carga absoluta pode escolher mal servidores de capacidades diferentes.',
'O(n); usa snapshot de carga, sem garantia de atualização entre requisições concorrentes.',
'Adicione estados de saúde, reserva atômica de capacidade e comportamento sem servidores disponíveis.',`
let best = -1;
for i in 0..n {
  if best == -1 { best = i; }
  else {
    if cell(i,1)*cell(best,0) < cell(best,1)*cell(i,0) { best = i; }
  }
}
emit best;
`,[[[[10,5],[100,20],[50,10]],[1]],[[[1,2]],[0]]]);

add('quorum','Leitura por quórum de réplicas','Distribuição',[['version',0,10000],['value',0,10000]],
'Escolher o par versão/valor com maioria estrita das respostas. Saída: versão e valor; sem maioria, retornar -1.',
'Versão igual com valor diferente indica conflito; contar apenas a versão mascararia divergência de dados.',
'O(n²); isso verifica concordância de respostas, não implementa protocolo de consenso distribuído.',
'Distinga réplicas por ID, descarte respostas duplicadas e introduza timeout de coleta.',`
let selected = -1;
for i in 0..n {
  let votes = 0;
  for j in 0..n { if cell(i,0) == cell(j,0) && cell(i,1) == cell(j,1) { votes = votes+1; } }
  if votes*2 > n { selected = i; }
}
if selected == -1 { emit -1; }
else { emit cell(selected,0); emit cell(selected,1); }
`,[[[[2,10],[2,10],[3,11]],[2,10]],[[[2,10],[2,11]],[-1]]]);

add('replication-lag','Seleção de réplica por frescor','Distribuição',[['lag',0,10000],['latency',0,10000],['healthy',0,1]],
'Escolher réplica saudável com lag <=5 e menor latência. Saída: índice da réplica; -1 indica fallback ao primário.',
'O menor tempo de resposta não compensa ler dados mais antigos que o contrato de consistência permite.',
'O(n); lag e latência vêm de medição externa e podem ficar desatualizados.',
'Faça fallback explícito, adicione circuit breaker e teste ausência de réplicas elegíveis.',`
let best = -1;
for i in 0..n {
  if cell(i,0) <= 5 && cell(i,2) == 1 {
    if best == -1 { best = i; }
    else { if cell(i,1) < cell(best,1) { best = i; } }
  }
}
emit best;
`,[[[[6,1,1],[2,10,1],[1,2,0],[5,8,1]],[3]],[[[0,1,0]],[-1]]]);

add('lfu','Cache LFU com desempate por idade','Distribuição',[['key',0,99]],
'Simular cache de capacidade 3. Acesso incrementa frequência; falta insere com frequência 1. Expulsão escolhe menor frequência e, no empate, a inserção mais antiga. Saída: 1 hit, 0 miss.',
'LFU favorece frequência histórica e pode reter chaves antigas. O desempate deve ser determinístico para testes.',
'O(n*100); o valor é a própria chave e não há aging de frequência.',
'Implemente aging e compare taxa de acerto com LRU em uma carga que muda de perfil.',`
vector present 100;
vector frequency 100;
vector age 100;
let size = 0;
for i in 0..n {
  let key = cell(i,0);
  if present[key] == 1 { frequency[key] = frequency[key]+1; emit 1; }
  else {
    emit 0;
    if size == 3 {
      let victim = -1;
      for k in 0..100 {
        if present[k] == 1 {
          if victim == -1 { victim = k; }
          else {
            if frequency[k] < frequency[victim] || (frequency[k] == frequency[victim] && age[k] < age[victim]) { victim = k; }
          }
        }
      }
      present[victim] = 0; size = size-1;
    }
    present[key] = 1; frequency[key] = 1; age[key] = i; size = size+1;
  }
}`,[[[[1],[2],[3],[1],[4],[2]],[0,0,0,1,0,0]],[[[0],[0]],[0,1]]]);

add('ttl-cache','Cache com expiração e renovação','Distribuição',[['key',0,99],['time',0,10000],['ttl',1,100]],
'Classificar hit quando a chave existe e agora é menor que a expiração. Em miss, armazenar até agora+ttl. Hits não renovam TTL. Saída: 1 hit, 0 miss.',
'Expiração absoluta e expiração deslizante são políticas distintas; renovar em todo hit pode manter dados obsoletos indefinidamente.',
'O(n); tempos globais devem ser não decrescentes; não há limite de capacidade.',
'Adicione tamanho máximo e política de expulsão independente da expiração.',`
vector expiry 100;
for i in 0..n {
  if i > 0 { if cell(i,1) < cell(i-1,1) { fail; } }
  let key = cell(i,0);
  let now = cell(i,1);
  if now < expiry[key] { emit 1; }
  else { expiry[key] = now+cell(i,2); emit 0; }
}`,[[[[1,0,5],[1,4,5],[1,5,5],[1,9,5]],[0,1,0,1]],[[[0,2,1],[0,1,1]],null]]);

add('topological-build','Planejador de dependências de build','Grafos',[['before',0,19],['after',0,19]],
'Ordenar os nós presentes nas arestas respeitando dependências, com desempate pelo menor ID. Rejeitar ciclos. Saída: IDs na ordem de execução.',
'Kahn remove nós de grau de entrada zero; se ainda existem nós sem candidato, o grafo contém ciclo.',
'O(VE+V²), até 20 nós. Nós isolados não aparecem neste protocolo de arestas.',
'Adicione declaração explícita de nós, execução paralela por camadas e diagnóstico do ciclo.',`
vector active 20;
vector indegree 20;
vector removed 20;
for i in 0..n { active[cell(i,0)] = 1; active[cell(i,1)] = 1; indegree[cell(i,1)] = indegree[cell(i,1)]+1; }
for turn in 0..20 {
  let best = -1;
  for node in 0..20 { if active[node] == 1 && removed[node] == 0 && indegree[node] == 0 && best == -1 { best = node; } }
  if best != -1 {
    emit best; removed[best] = 1;
    for i in 0..n { if cell(i,0) == best { indegree[cell(i,1)] = indegree[cell(i,1)]-1; } }
  }
}
for node in 0..20 { if active[node] == 1 && removed[node] == 0 { fail; } }
`,[[[[0,2],[1,2],[2,3]],[0,1,2,3]],[[[0,1],[1,0]],null]]);

add('critical-path','Prazo mínimo de tarefas dependentes','Grafos',[['parent',-1,199],['duration',1,10000]],
'Cada linha é uma tarefa; parent=-1 indica raiz e outro valor aponta para tarefa anterior. Calcular término mais cedo por tarefa e prazo total.',
'O caminho crítico considera dependências, não soma todas as durações quando tarefas podem ocorrer em paralelo.',
'O(n); cada tarefa tem no máximo um predecessor e recursos são ilimitados.',
'Aceite múltiplos predecessores e calcule folga de cada tarefa com uma segunda passagem.',`
vector finish n;
let deadline = 0;
for i in 0..n {
  let parent = cell(i,0);
  if parent >= i { fail; }
  let start = 0;
  if parent >= 0 { start = finish[parent]; }
  finish[i] = start+cell(i,1);
  deadline = maxv(deadline,finish[i]);
  emit finish[i];
}
emit deadline;
`,[[[[-1,5],[-1,3],[0,4],[1,2]],[5,3,9,5,9]],[[[0,1]],null]]);

add('shortest-path','Roteador de menor custo entre serviços','Grafos',[['from',0,9],['to',0,9],['cost',0,10000]],
'Calcular menor custo do nó 0 para os dez nós de um grafo dirigido. Arestas têm peso não negativo. Saída: dez distâncias, -1 para inalcançáveis.',
'Relaxar arestas até V-1 vezes encontra caminhos simples mínimos. Atualizações só substituem distâncias por valores menores.',
'O(VE) com Bellman-Ford para fins didáticos. Não modela latência variável nem congestionamento.',
'Implemente Dijkstra e compare em grafos densos e esparsos, mantendo os mesmos testes.',`
vector distance 10;
for node in 1..10 { distance[node] = 1000000000; }
for turn in 0..9 {
  for edge in 0..n {
    let from = cell(edge,0); let to = cell(edge,1); let cost = cell(edge,2);
    if distance[from] < 1000000000 { distance[to] = minv(distance[to],distance[from]+cost); }
  }
}
for node in 0..10 { if distance[node] == 1000000000 { emit -1; } else { emit distance[node]; } }
`,[[[[0,1,5],[0,2,2],[2,1,1]],[0,3,2,-1,-1,-1,-1,-1,-1,-1]],[[[1,2,1]],[0,-1,-1,-1,-1,-1,-1,-1,-1,-1]]]);

add('deployment-waves','Ondas de implantação por capacidade','Entrega',[['cost',1,100]],
'Distribuir serviços em ondas sequenciais de capacidade 100, preservando ordem. Saída: número da onda por serviço e total de ondas.',
'Preservar ordem facilita dependências externas e auditoria; isso difere de bin packing, que pode reutilizar caixas antigas.',
'O(n); capacidade representa um orçamento abstrato de risco, não garantia de disponibilidade.',
'Inclua canário, checagem de saúde entre ondas e um plano de rollback verificável.',`
let wave = 0;
let used = 0;
for i in 0..n {
  if used+cell(i,0) > 100 { wave = wave+1; used = 0; }
  used = used+cell(i,0); emit wave;
}
if n == 0 { emit 0; } else { emit wave+1; }
`,[[[[60],[50],[40],[20]],[0,1,1,2,3]],[[[100],[100]],[0,1,2]]]);

add('knapsack','Seleção de backlog por orçamento','Otimização',[['cost',1,50],['value',0,10000]],
'Escolher subconjunto de itens com custo total <=50 que maximize valor. Cada item pode ser usado uma vez. Saída: valor máximo.',
'Atualizar a capacidade em ordem decrescente evita reutilizar o mesmo item durante a passagem: é mochila 0/1, não ilimitada.',
'O(50n), orçamento fixo e valores aditivos. Não incorpora dependências ou incerteza de estimativa.',
'Reconstrua os itens escolhidos e teste empates de valor com uma regra determinística.',`
vector best 51;
for i in 0..n {
  let capacity = 50;
  while capacity >= cell(i,0) {
    best[capacity] = maxv(best[capacity],best[capacity-cell(i,0)]+cell(i,1));
    capacity = capacity-1;
  }
}
emit best[50];
`,[[[[30,100],[20,70],[40,120]],[170]],[[[26,10]],[10]]]);

add('cursor-pagination','Paginação estável por cursor composto','Dados',[['timestamp',0,10000],['id',0,99]],
'Selecionar os três menores pares (timestamp,id) estritamente após o cursor (10,5), ordenados lexicograficamente. Rejeitar pares duplicados. Saída: pares selecionados.',
'Timestamp sozinho perde itens com mesma data. O ID desempata e o cursor precisa carregar ambos.',
'O(n²); cursor e tamanho da página fixos no laboratório. Não implementa assinatura de cursor.',
'Parametrize o cursor, use índice composto no banco e teste inserções entre páginas.',`
vector used n;
for i in 0..n {
  for j in 0..i { if cell(i,0) == cell(j,0) && cell(i,1) == cell(j,1) { fail; } }
  if cell(i,0) < 10 || (cell(i,0) == 10 && cell(i,1) <= 5) { used[i] = 1; }
}
for turn in 0..3 {
  let best = -1;
  for i in 0..n {
    if used[i] == 0 {
      if best == -1 { best = i; }
      else { if cell(i,0) < cell(best,0) || (cell(i,0) == cell(best,0) && cell(i,1) < cell(best,1)) { best = i; } }
    }
  }
  if best != -1 { emit cell(best,0); emit cell(best,1); used[best] = 1; }
}`,[[[[11,3],[10,7],[10,5],[12,1],[10,6]],[10,6,10,7,11,3]],[[[10,6],[10,6]],null]]);

add('cdc','Materialização de eventos CDC versionados','Dados',[['id',0,99],['version',1,10000],['action',0,1],['value',0,10000]],
'Aplicar upsert (0) e delete (1) apenas quando a versão supera a armazenada. Guardar tombstone para não ressuscitar um registro com evento antigo. Saída: pares ID,valor ativos.',
'A exclusão também tem versão. Apagar o histórico de versão junto ao valor permite que eventos atrasados recriem dados.',
'O(n+100); versões são monotônicas por entidade; empates são ignorados.',
'Inclua partição e offset da origem, checkpoints e política segura de expiração de tombstones.',`
vector version 100;
vector present 100;
vector values 100;
for i in 0..n {
  let id = cell(i,0);
  if cell(i,1) > version[id] {
    version[id] = cell(i,1);
    present[id] = 1-cell(i,2);
    values[id] = cell(i,3);
  }
}
for id in 0..100 { if present[id] == 1 { emit id; emit values[id]; } }
`,[[[[1,2,0,20],[1,3,1,0],[1,1,0,10],[2,1,0,7]],[2,7]],[[[0,1,0,0]],[0,0]]]);

add('event-sourcing','Replay idempotente de saldo','Arquitetura',[['event_id',0,99],['delta',-10000,10000]],
'Reproduzir eventos únicos sobre saldo inicial zero. Duplicata idêntica é ignorada; mesmo ID com delta diferente é erro. Saída: saldo após cada evento.',
'Replay deve ser determinístico e distinguir duplicação de corrupção. O histórico é fonte de verdade, a projeção é reconstruível.',
'O(n); saldo pode ser negativo e não representa uma conta bancária pronta para produção.',
'Adicione snapshots com posição do log e comprove equivalência entre replay total e parcial.',`
vector seen 100;
vector deltas 100;
let balance = 0;
for i in 0..n {
  let id = cell(i,0);
  if seen[id] == 1 { if deltas[id] != cell(i,1) { fail; } }
  else { seen[id] = 1; deltas[id] = cell(i,1); balance = balance+cell(i,1); }
  emit balance;
}`,[[[[1,100],[2,-30],[1,100]],[100,70,70]],[[[1,1],[1,2]],null]]);

add('slo-budget','Orçamento de erro para SLO','Observabilidade',[['total',1,10000],['failed',0,10000],['slo_basis_points',0,10000]],
'Calcular quantas falhas ainda cabem no orçamento inteiro e se ele foi excedido. Saída por linha: restante não negativo e flag 1 de excesso.',
'O orçamento é derivado do número de requisições observadas. Uma taxa de erro sem volume esconde impacto.',
'O(n); janela de observação é externa. Não faz previsão nem aciona incidentes automaticamente.',
'Calcule burn rate em duas janelas e teste quedas de volume e períodos sem tráfego.',`
for i in 0..n {
  if cell(i,1) > cell(i,0) { fail; }
  let allowed = div(cell(i,0)*(10000-cell(i,2)),10000);
  emit maxv(allowed-cell(i,1),0);
  if cell(i,1) > allowed { emit 1; } else { emit 0; }
}`,[[[[10000,5,9990],[1000,2,9990]],[5,0,0,1]],[[[1,2,9000]],null]]);

add('canary','Avaliador de implantação canário','Entrega',[['baseline_requests',1,10000],['baseline_errors',0,10000],['canary_requests',1,10000],['canary_errors',0,10000]],
'Aprovar canário se sua taxa de erro não ultrapassar a do baseline por mais de 1 ponto percentual. Saída: 1 aprovar, 0 interromper.',
'Compare taxas normalizadas por volume; comparar apenas número de erros favorece grupos menores.',
'O(n); regra operacional simplificada, sem teste estatístico ou garantia de causalidade.',
'Inclua amostra mínima, intervalo de confiança e métricas de latência e conversão.',`
for i in 0..n {
  let base = cell(i,0); let baseErrors = cell(i,1);
  let canary = cell(i,2); let canaryErrors = cell(i,3);
  if baseErrors > base || canaryErrors > canary { fail; }
  if canaryErrors*base*100 <= baseErrors*canary*100+base*canary { emit 1; }
  else { emit 0; }
}`,[[[[100,1,100,2],[100,1,100,3]],[1,0]],[[[10,11,10,0]],null]]);

add('capacity-forecast','Estimador de capacidade por crescimento','Operações',[['current',0,10000],['daily_growth',0,100],['capacity',1,10000]],
'Estimar dias inteiros até alcançar a capacidade. Já saturado retorna 0; sem crescimento retorna -1. Saída: dias por recurso.',
'Use divisão com teto: arredondar para baixo anuncia saturação antes do primeiro dia inteiro que realmente alcança o limite.',
'O(n); crescimento linear determinístico, sem incerteza ou sazonalidade.',
'Calcule cenários pessimista e otimista e compare previsões com observações reais.',`
for i in 0..n {
  let missing = cell(i,2)-cell(i,0);
  if missing <= 0 { emit 0; }
  else {
    let growth = cell(i,1);
    if growth == 0 { emit -1; }
    else { emit div(missing+growth-1,growth); }
  }
}`,[[[[90,3,100],[100,0,100],[10,0,100]],[4,0,-1]],[[[0,1,1]],[1]]]);

add('sla-priority','Priorizador de atendimento por SLA','Operações',[['remaining_minutes',-10000,10000],['impact',1,5]],
'Ordenar chamados por menor tempo restante de SLA; em empate, maior impacto e depois ordem original. Saída: índices dos chamados.',
'Uma ordenação total e determinística evita alternância instável de prioridade entre atualizações.',
'O(n²); impacto e prazo são informados, e a política pode causar starvation de chamados de baixo impacto.',
'Adicione aging e simule a distribuição do tempo de espera por classe.',`
vector used n;
for turn in 0..n {
  let best = -1;
  for i in 0..n {
    if used[i] == 0 {
      if best == -1 { best = i; }
      else { if cell(i,0) < cell(best,0) || (cell(i,0) == cell(best,0) && cell(i,1) > cell(best,1)) { best = i; } }
    }
  }
  emit best; used[best] = 1;
}`,[[[[10,2],[-1,1],[10,5]],[1,2,0]],[[[0,1],[0,1]],[0,1]]]);

add('data-retention','Plano de retenção com bloqueio legal','Dados',[['age_days',0,10000],['retention_days',0,10000],['hold',0,1]],
'Selecionar índices elegíveis para exclusão: idade maior que retenção e hold=0. O programa apenas gera o plano; não remove arquivos.',
'O bloqueio tem precedência sobre o prazo. Um plano revisável separa política de uma ação destrutiva.',
'O(n); regras fictícias de retenção, sem aconselhamento jurídico nem acesso a dados reais.',
'Inclua justificativa, aprovação e dry-run antes de conectar qualquer executor de exclusão.',`
for i in 0..n {
  if cell(i,0) > cell(i,1) && cell(i,2) == 0 { emit i; }
}`,[[[[31,30,0],[31,30,1],[30,30,0]],[0]],[[[0,0,0]],[]]]);

add('checkpoint','Checkpoint contíguo de consumidor','Distribuição',[['offset',0,199]],
'Receber offsets fora de ordem e avançar o checkpoint apenas quando todos os anteriores, desde zero, chegaram. Duplicatas são toleradas. Saída: checkpoint após cada chegada, inicialmente -1.',
'Confirmar o maior offset visto perde mensagens anteriores ainda pendentes. O máximo contíguo representa trabalho completo.',
'O(n+200); buffer limitado a 200 offsets e uma única partição.',
'Adicione base móvel, persistência por partição e falhas entre processamento e commit.',`
vector seen 200;
let checkpoint = -1;
for i in 0..n {
  seen[cell(i,0)] = 1;
  let advance = 1;
  while advance == 1 {
    advance = 0;
    if checkpoint+1 < 200 { if seen[checkpoint+1] == 1 { checkpoint = checkpoint+1; advance = 1; } }
  }
  emit checkpoint;
}`,[[[[2],[0],[1],[1],[4],[3]],[-1,0,2,2,2,4]],[[[0]],[0]]]);

if(specs.length<49)throw new Error(`Esperados ao menos 49 novos projetos, encontrados ${specs.length}`);
const emptyResults={'payment-allocation':[0],'budget-control':[0],'shelf-life':[0],'optimistic-lock':[0],'bin-packing':[0],'occupancy':[0,-1],'watermark':[0],'histogram':[0,0,0,0],'hierarchical-quota':[0],'routing':[-1],'quorum':[-1],'replication-lag':[-1],'critical-path':[0],'shortest-path':[0,-1,-1,-1,-1,-1,-1,-1,-1,-1],'deployment-waves':[0],'knapsack':[0]};
for(const spec of specs)spec.cases.push({input:[],expected:emptyResults[spec.id]||[]});
for(const spec of specs)spec.body=spec.body.replace(/\bfrom\b/g,'originNode').replace(/\bbase\b/g,'baselineTotal');
