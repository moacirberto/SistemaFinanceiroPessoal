import React from 'react';

/**
 * Componente para montar um ícone
 * clicável na tela, com possibilidade
 * de injetar uma ação pelo componente pai
 */
export default function Action(props) {

  const {id, type, onActionClick}  = props;

  const handleIconClick = () => {
    onActionClick(id, type);
  };

  return (
    <span
      className="material-icons"
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    >
      {type}
    </span>
  );
}
