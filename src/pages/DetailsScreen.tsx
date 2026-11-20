import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDetailPage } from '../hooks/useDetailPage';
import { IopModel, NormaItem, TrainingModel } from '../types/Norma';
import { CopyIcon, DocIcon, GearIcon, TicketIcon } from '../components/Icons';

import { Toast } from '../components/Toast';
import { styles } from '../styles/DetailsScreen.styles';
import { ConfirmModal } from '../components/ConfirmModal';

export const DetailsScreen: React.FC = () => {
const { loading,
    errorMessage,
    itemDetalhado,
    toastMsg,
    copiarTexto,
    irParaAtualizar,
    confirmDeleteOpen,
    deleting,
    abrirConfirmacaoDelete,
    fecharConfirmacaoDelete,
    confirmarDelete,} = useDetailPage();


if (loading) {
  return (
    <div style={styles.centerState}>
      <div style={styles.spinner} />
      <span>Carregando detalhes...</span>
    </div>
  );
}

if (errorMessage) {
  return (
    <div style={{ ...styles.centerState, color: '#DC2626', fontWeight: 600 }}>
      {errorMessage}
    </div>
  );
}

if (!itemDetalhado) {
  return (
    <div style={{ ...styles.centerState, color: '#64748B' }}>
      Nenhum item encontrado.
    </div>
  );
}



  // Adapte os campos conforme o formato do seu itemDetalhado (IOP ou Training)
  const titulo = itemDetalhado.titulo || 'Detalhes';
  const texto = itemDetalhado.texto ?? 'Sem conteúdo disponível para este item.';
  const idStr = itemDetalhado.id != null ? String(itemDetalhado.id) : '';
  const chamadoRef = itemDetalhado.chamadoReferencia || '';

const isIop = itemDetalhado ? isIopModel(itemDetalhado) : false;
const isTraining = itemDetalhado ? isTrainingModel(itemDetalhado) : false;

const tipoLabel = isIop ? 'IOP' : isTraining ? 'Training' : 'Item';

const subtipoLabel =
  itemDetalhado && isIopModel(itemDetalhado)
    ? `Equipamento: ${itemDetalhado.EquipmentType}`
    : itemDetalhado && isTrainingModel(itemDetalhado)
      ? `Tipo: ${itemDetalhado.TrainingType}`
      : null;

  return (
    <div style={styles.page}>
  
      <header style={styles.appBar}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <button
    type="button"
    onClick={() =>
      copiarTexto(texto, "Procedimento copiado para a área de transferência!")
    }
    style={styles.copyButton}
  >
    <CopyIcon size={16} />
    <span>Copiar {tipoLabel}</span>
  </button>

  <button
    type="button"
    onClick={irParaAtualizar}
    style={styles.updateButton}
  >
    <span>Atualizar</span>
  </button>

  <button
    type="button"
    onClick={abrirConfirmacaoDelete}
    style={styles.deleteButton}
  >
    <span>Deletar</span>
  </button>
</div>
      </header>

      {/* Corpo */}
      <main style={styles.main}>
        <div style={styles.container}>
          {/* 1. Cartão de Cabeçalho e Metadados */}
          <section style={styles.card}>
            <div style={styles.badgesRow}>
              {idStr && (
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: '#E0F2FE',
                    color: '#0369A1',
                  }}
                >
                  <DocIcon size={15} />
                  <span>
                    {tipoLabel} #{idStr}
                  </span>
                </span>
              )}

              {subtipoLabel && (
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                  }}
                >
                  <GearIcon size={15} />
                  <span>{subtipoLabel}</span>
                </span>
              )}

              {chamadoRef && (
                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(
                      chamadoRef,
                      `Número do chamado ${chamadoRef} copiado!`
                    )
                  }
                  style={{
                    ...styles.badgeButton,
                    backgroundColor: '#FEF3C7',
                    color: '#B45309',
                  }}
                  title="Clique para copiar o chamado"
                >
                  <TicketIcon size={15} />
                  <span>Chamado Ref: {chamadoRef}</span>
                  <CopyIcon size={13} />
                </button>
              )}
            </div>

            <h2 style={styles.heroTitle}>{titulo}</h2>
          </section>

          {/* 2. Cartão de Conteúdo (Markdown) */}
          <section style={styles.markdownCard}>
            <div className="markdown-body" style={styles.markdownContent}>
              <ReactMarkdown
                components={{
                  h3: ({ children }) => <h3 style={styles.mdH3}>{children}</h3>,
                  p: ({ children }) => <p style={styles.mdP}>{children}</p>,
                  strong: ({ children }) => (
                    <strong style={styles.mdStrong}>{children}</strong>
                  ),
                  li: ({ children }) => <li style={styles.mdLi}>{children}</li>,
                }}
              >
                {texto}
              </ReactMarkdown>
            </div>
          </section>
        </div>
      </main>

<ConfirmModal
  open={confirmDeleteOpen}
  title={`Deletar ${tipoLabel}`}
  description={`Tem certeza que deseja realmente deletar "${titulo}"? Essa ação não poderá ser desfeita.`}
  confirmLabel="Sim, deletar"
  cancelLabel="Cancelar"
  loading={deleting}
  onConfirm={confirmarDelete}
  onCancel={fecharConfirmacaoDelete}
/>

<Toast message={toastMsg} />
     
      <Toast message={toastMsg} />
      
    </div>

    
  );
};


function isIopModel(item: NormaItem): item is IopModel {
  return 'EquipmentType' in item && Boolean(item.EquipmentType);
}

function isTrainingModel(item: NormaItem): item is TrainingModel {
  return 'TrainingType' in item && Boolean(item.TrainingType);
}


