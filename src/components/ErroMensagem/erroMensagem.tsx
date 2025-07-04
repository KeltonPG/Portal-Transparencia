import styles from './ErroMensagem.module.scss';

type Props = {
  mensagem: string;
};

export default function ErroMensagem({ mensagem }: Props) {
  function handleVoltar() {
    window.location.href = '/';
  }

  return (
    <div className={styles.erroMensagem}>
      <div className={styles.icone}>⚠️</div>
      <div className={styles.titulo}>Ocorreu um erro</div>
      <pre className={styles.mensagem}>{mensagem}</pre>
      <button className={styles.botaoVoltar} onClick={handleVoltar}>Voltar para a tela inicial</button>
    </div>
  );
}