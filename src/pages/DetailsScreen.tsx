import React from 'react';
import { useDetailPage } from '../hooks/useDetailPage';

export const DetailsScreen: React.FC = () => {
  const { loading, errorMessage, itemDetalhado } = useDetailPage();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Carregando detalhes...</div>;
  }

  if (errorMessage) {
    return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>{errorMessage}</div>;
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Detalhes do Item</h1>
      <p><strong>ID:</strong> {itemDetalhado?.id}</p>
      <p><strong>Título:</strong> {itemDetalhado?.titulo}</p>
      <p><strong>Chamado de Referência:</strong> {itemDetalhado?.chamadoReferencia}</p>
        <p><strong>Texto:</strong> {itemDetalhado?.texto}</p>
    </div>
  );
};