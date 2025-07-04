import './CartaoSumario.scss';

type Props = {
  titulo: string;
  valor: string | number;
};

export default function SummaryCard({ titulo, valor }: Props) {
  return (
    <div className="summary-card">
      <span>{titulo}</span>
      <strong>{valor}</strong>
    </div>
  );
}