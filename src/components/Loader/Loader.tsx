import styles from './Loader.module.scss';

interface LoaderProps {
  onClose?: () => void;
}

export default function Loader({ onClose }: LoaderProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderBox}>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        )}
        <span className={styles.spinner}></span>
        Carregando…
      </div>
    </div>
  );
}
