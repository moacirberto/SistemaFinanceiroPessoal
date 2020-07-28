/**
 * Importação do React + hooks
 */
import React, { useState, useEffect } from "react";

/**
 * Isolei as requisições em apiService
 */
import * as api from "./api/apiService";
import M from "materialize-css";
import FiltroData from "./components/FiltroData";
import Lancamentos from "./components/Lancamentos";
import Totalizadores from "./components/Totalizadores";
import NovoLancamento from "./components/NovoLancamentos";
import ModalLancamento from "./components/ModalLancamento";

export default function App() {
  // Todas os Lancamentos

  const [allLancamentos, setAllLancamentos] = useState([]);
  const [filterLancamentos, setfilterLancamentos] = useState([]);
  const [allDatas, setAllDatas] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [totalizador, setTotalizador] = useState({});
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  // Indicador de modal visível/invisível
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculaTotalizadores = (lancamentos) => {
    // total receita
    let receita = lancamentos.reduce((sum, receitas) => {
      if (receitas.type === "+") {
        sum = sum + receitas.value;
      }
      return sum;
    }, 0);
    // total despesa
    let despesa = lancamentos.reduce((sum, receitas) => {
      if (receitas.type === "-") {
        sum = sum + receitas.value;
      }
      return sum;
    }, 0);
    console.log('Total Despesa');
    console.log(despesa);
    //saldo final
    let saldo = receita - despesa;

    setTotalizador({
      lancamentos: lancamentos.length,
      receitas: receita,
      despesas: despesa,
      saldos: saldo,
    });
  };

  const filtraPorDescription = (allLancamentos) => {
    const lancamentos = allLancamentos.filter((lancamento) => {
      return (
        lancamento.description
          .toLowerCase()
          .indexOf(description.toLowerCase()) > -1
      );
    });
    console.log(lancamentos);
    calculaTotalizadores(lancamentos);
    setTimeout(() => {
      setfilterLancamentos(lancamentos);
    }, 2000);
    
  };

  useEffect(() => {
    const getLancamentos = async () => {
      const lancamentos = await api.getAllLancamentos();
      setTimeout(() => {
        setAllLancamentos(lancamentos);
        setfilterLancamentos(lancamentos);
      }, 2000);
      let allDatasDisctinct = lancamentos.map((lancamento) => {
        return lancamento.yearMonth;
      });

      allDatasDisctinct = allDatasDisctinct.filter(
        (x, i, a) => a.indexOf(x) == i
      );
      setCurrentPeriod(allDatasDisctinct[0]);
      setAllDatas(allDatasDisctinct);
      M.AutoInit();
      calculaTotalizadores(lancamentos);
    };

    getLancamentos();
  }, []);

  const getFiltroLancamentos = async () => {
    const lancamentos = await api.getfindYearMonth(currentPeriod);
    setTimeout(() => {
      setAllLancamentos(lancamentos);
    }, 2000);

    setfilterLancamentos(lancamentos);
    //filtraPorDescription(lancamentos);
    calculaTotalizadores(lancamentos);
  };

  useEffect(() => {
    getFiltroLancamentos();
  }, [currentPeriod]);

  useEffect(() => {
    filtraPorDescription(allLancamentos);
    calculaTotalizadores(filterLancamentos);
  }, [description]);

  const handleChangeDate = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

  const handleNextData = (event) => {
    let indice = allDatas.findIndex((data) => data === currentPeriod) + 1;
    let dataSelect;
    try {
      dataSelect = allDatas[indice];
    } catch (error) {
      dataSelect = allDatas[0];
    }
    setCurrentPeriod(dataSelect);
  };

  const handlePriorData = (event) => {
    let indice = allDatas.findIndex((data) => data === currentPeriod) - 1;
    let dataSelect;
    try {
      dataSelect = allDatas[indice];
    } catch (error) {
      dataSelect = allDatas[allDatas.length - 1];
    }
    setCurrentPeriod(dataSelect);
  };

  const handleDescription = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
  };

  // Delete
  const handleActionClick = (id, type) => {
    if (type === "delete") {
      const deleteLancamento = async () => {
        const lancamentos = await api.deleteLancamento(id);
        M.toast({
          html: "Transação excluída com sucesso.",
        });
      };
      deleteLancamento();
      getFiltroLancamentos();
    } else if (type === "edit") {
      
      const findLancamento = async() => {
        const lancamento = await api.getfindOne(id);
        setSelectedTransaction(lancamento);
        setIsModalOpen(true);
      }
      findLancamento();

    }
  };

  /**
   * Função para lidar com a persistência de dados.
   * Selecionamos a nota clicada pelo usuário e
   * abrimos a modal para edição
   */
  const handleModalPersist = () => {
    //setSelectedGrade(grade);
    setIsModalOpen(true);
  };

  const handleInsert = async () => {
    setSelectedTransaction({
      _id: "",
      category: "",
      value: 0,
      type: "-",
      description: "",
      yearMonthDay: new Date(),
    });
    setIsModalOpen(true);
  };

  const handlePersistData = async (formDataTransaction) => {
    if (formDataTransaction) {
      console.log(formDataTransaction);
      if (formDataTransaction._id !== "")
      {
        const lancamento = await api.updateLancamento(formDataTransaction._id,formDataTransaction);
        if (lancamento._id !== "") {
          M.toast({
            html: "Lançamento atualizado com sucesso.",
          });
        }

      }else
      {
        const newId = await api.insertLancamento(formDataTransaction);
        if (newId !== "") {
          M.toast({
            html: "Lançamento inserido com sucesso.",
          });
        }
      }
    }  
  }

  const handleClose = () => {
    setIsModalOpen(false);
    getFiltroLancamentos();
  };

  return (
    <div className="container">
      <h3 className="center">Bootcamp Full Stack- Desafio Final</h3>
      <h4 className="center">Controle Financeiro Pessoal</h4>
      {!isModalOpen && (
        <FiltroData
          OnhandleChangeDate={handleChangeDate}
          OnhandleNextData={handleNextData}
          OnhandlePriorData={handlePriorData}
          allDatas={allDatas}
          currentPeriod={currentPeriod}
        />
      )}
      <Totalizadores totalizador={totalizador} />
      {!isModalOpen && (
      <NovoLancamento
        description={description}
        OnhandleDescription={handleDescription}
        OnhandleInsert={handleInsert}
      />
      )}
      <Lancamentos
        Lancamentos={filterLancamentos}
        OnhandleActionClick={handleActionClick}
      />

      {isModalOpen && (
        <ModalLancamento
        onSave={handlePersistData}
        onClose={handleClose}
        selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
