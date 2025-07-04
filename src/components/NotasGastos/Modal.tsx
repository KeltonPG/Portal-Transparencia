import React from 'react';
import styles from './ModalNotas.module.scss';

interface Nota {
  tipo_documento: string;
  empenho_original: string;
  descricao: string | null;
  numero_documento: string;
  data_emissao: string;
  ano_emissao: string;
  valor_documento: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  notas?: Nota[];
  carregandoNotas?: boolean;
  erroNotas?: string | null;
}

export default function Modal({ isOpen, onClose, notas = [], carregandoNotas, erroNotas }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2 className={styles.titulo}>Notas da despesa</h2>
        {carregandoNotas && <p>Carregando notas...</p>}
        {erroNotas && <p style={{ color: 'red' }}>{erroNotas}</p>}
        {!carregandoNotas && !erroNotas && notas.length === 0 && <p>Nenhuma nota encontrada.</p>}
        {!carregandoNotas && !erroNotas && notas.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Empenho</th>
                <th>Data</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {notas
                .filter(n => n.valor_documento && Number(n.valor_documento) !== 0)
                .sort((a, b) => new Date(a.data_emissao).getTime() - new Date(b.data_emissao).getTime())
                .map((n, i) => (
                  <tr key={`${n.numero_documento}-${i}`}>
                    <td>{n.empenho_original || '-'}</td>
                    <td className={styles.dataCol}>{n.data_emissao || '-'}</td>
                    <td>{n.tipo_documento || '-'}</td>
                    <td>{Number(n.valor_documento) > 0 ? Number(n.valor_documento).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}</td>
                    <td>{n.descricao ? n.descricao : '-'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 