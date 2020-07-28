import axios from 'axios';

/**
 * Link da API
 */
const API_URL = 'http://localhost:3001/api/transaction/';

async function getAllLancamentos() {
    const res = await axios.get(API_URL);
    const lancamentos = res.data;
    return lancamentos;
}

async function getfindOne(id) {
    const res = await axios.get(`${API_URL}/${id}`);
    const lancamentos = res.data;
    return lancamentos;
}

async function getfindYearMonth(yearMonth) {
    const res = await axios.get(`${API_URL}/findYearMonth/search/?period=${yearMonth}`);
    const lancamentos = res.data;
    return lancamentos;
}

async function getfindDescription(description) {
    const res = await axios.get(`${API_URL}/findDescription/search/?description=${description}`);
    const lancamentos = res.data;
    return lancamentos;
}

/**
 * Exclusão no back end
 */
async function deleteLancamento(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }

/**
 * Inserção no back end
 */
async function insertLancamento(lancamento) {
    const response = await axios.post(API_URL, lancamento);
    return response.data.id;
}

/**
 * Atualização no back end
 */
async function updateLancamento(id,lancamento) {
    const response = await axios.put(`${API_URL}/${id}`, lancamento);
    return response.data;
}

/**
 * Tornando todas as funções
 * abaixo disponíveis para
 * serem utilizadas por outros
 * arquivos
 */
export {
    getAllLancamentos,getfindYearMonth,getfindDescription,deleteLancamento,
    insertLancamento,getfindOne,updateLancamento,
  };
  