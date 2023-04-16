import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Panaverse Ninja Task</p>
        <p>
          Head to <code className={styles.code}>/api/status</code> to find apis
        </p>
      </div>
    </main>
  );
}
