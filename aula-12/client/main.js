const fetchHttpClient = new FetchHttpClient();
const baseUrl = 'http://localhost:3000';
const lancamentoService = new LancamentoService(fetchHttpClient, baseUrl);
new Tela(lancamentoService);
