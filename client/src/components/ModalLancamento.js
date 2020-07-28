import React, { useState, useEffect } from "react";

/**
 * Utilização de 'react-modal'
 */
import Modal from "react-modal";

/**
 * Exigido pelo componente Modal
 */
Modal.setAppElement("#root");

export default function ModalLancamento({onSave,onClose,selectedTransaction}) {
  
    const {
        _id,
        category,
        value,
        type,
        description,
        yearMonthDay,
      } = selectedTransaction;
  console.log('Modal');
  console.log(selectedTransaction);
    
    // Mensagem de erro
  const [errorMessage, setErrorMessage] = useState('');
  const [newType, setNewType] = useState(type);
  const [newDescription, setNewDescription] = useState(description);
  const [newCategory, setNewCategory] = useState(category);
  const [newValue, setNewValue] = useState(value);
  const [newDate, setNewDate] = useState(yearMonthDay);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let arrDataExclusao = newDate.split("-");
    var dataFormatada = arrDataExclusao[1] + "-" + arrDataExclusao[2] + "-" + arrDataExclusao[0];
    const newDateAux = new Date(dataFormatada);
    const _day = parseInt(arrDataExclusao[2]);
    const _month = newDateAux.getMonth() + 1;
    const _year = newDateAux.getFullYear();


    const formDataTransaction = {
        _id,
        category: newCategory,
        day: _day,
        description: newDescription,
        month: _month,
        type: newType,
        value: newValue,
        year: _year,
        yearMonth: _year.toString() + "-" + _month.toString().padStart(2, "0"),
        yearMonthDay: newDate,
      };

      onSave(formDataTransaction);
  }

  const handleChangeRadio = (event) => {
    setNewType(event.target.value);
  };

  const handleChangeInputDescription = (event) => {
    setNewDescription(event.target.value);
  };

  const handleInputTransactionValueChange = (event) => {
    setNewValue(+event.target.value);
  };

  const handleChangeInputCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const handleChangeInputDate = (event) => {
    setNewDate(event.target.value);
  };

  const handleSave = () => {};

  const handleModalClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <form onSubmit={handleFormSubmit}>
          <div style={styles.flexRow}>
            <span style={styles.title}>Inclusão de Lançamento</span>
            <button
              className="waves-effect waves-lights btn red dark-4"
              onClick={handleModalClose}
            >
              X
            </button>
          </div>
          <p>
            <label>
              <input
                name="groupType"
                type="radio"
                onChange={handleChangeRadio}
                value="-"
                checked={newType === "-"}
                disabled={_id !== ""}
              />
              <span>Despesa</span>
            </label>
            <label>
              <input
                name="groupType"
                type="radio"
                onChange={handleChangeRadio}
                value="+"
                checked={newType === "+"}
                disabled={_id !== ""}
              />
              <span>Receita</span>
            </label>
          </p>
          <div className="input-field">
            <input 
            id="inputDescricao" 
            type="text" 
            value={newDescription}
            onChange={handleChangeInputDescription}
            />
            <label className="active" htmlFor="inputDescricao">
              Descrição:
            </label>
          </div>

          <div className="input-field">
            <input 
            id="inputCategoria" 
            type="text"
            value={newCategory} 
            onChange={handleChangeInputCategory}
            />
            <label className="active" htmlFor="inputName">
              Categoria:
            </label>
          </div>

          <div className="input-field">
            <input
              id="inputValor"
              type="number"
              step={0.01}
              autoFocus
              value={newValue}
              onChange={handleInputTransactionValueChange}
            />
            <label className="active" htmlFor="inputValor">
              Valor:
            </label>
          </div>

          <div className="input-field">
            <input
              style={{ marginTop: "15px" }}
              id="inputDataTransaction"
              placeholder="Data da Transação"
              type="date"
              className="browser-default"
              required=""
              onChange={handleChangeInputDate}
              value={newDate}
            />
            <label
              style={{ marginBottom: "10px" }}
              className="active"
              htmlFor="inputDataTransaction"
            >
              Data:
            </label>
          </div>

          <div style={styles.flexRow}>
            <button
              className="waves-effect waves-light btn"
              disabled={errorMessage.trim() !== ""}
              onClick={handleSave}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}


const styles = {
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '40px',
    },
  
    title: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
    },
  
    errorMessage: {
      color: 'red',
      fontWeight: 'bold',
    },
  };
  