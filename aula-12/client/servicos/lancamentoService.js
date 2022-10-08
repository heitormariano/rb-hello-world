class LancamentoService {
  constructor(fetchHttpClient, baseUrl) {
    this.fetchHttpClient = fetchHttpClient;
    this.baseUrl = baseUrl;
  }

  async getLancamentos() {
    return await this.fetchHttpClient.get(`${baseUrl}/api/lancamentos`);
  }

  async saveLancamentos(lancamento) {
    await this.fetchHttpClient.post(`${baseUrl}/api/lancamentos`, lancamento);
  }

  async deleteLancamentos(idLancamento) {
    await this.fetchHttpClient.delete(`${baseUrl}/api/lancamentos/${idLancamento}`);
  }
}
