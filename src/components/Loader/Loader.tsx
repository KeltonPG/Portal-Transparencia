import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderBox}>
        <span className={styles.spinner}></span>
        Carregando…
      </div>
    </div>
  );
}