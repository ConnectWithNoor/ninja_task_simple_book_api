import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Panaverse Ninja Task</p>
        <p>
          Head to
          <code className={styles.code}>/api/</code>
          to find apis
        </p>
      </div>
    </main>
  );
}
