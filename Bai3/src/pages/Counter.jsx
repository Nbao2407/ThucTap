import { useState } from "react";
import styles from "./styles/Counter.module.scss";

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Counter</h2>
                <div className={styles.display}>
                    <p className={styles.count}>{count}</p>
                    {count < 0 && <p className={styles.warning}>Negative count!</p>}
                </div>
                <div className={styles.controls}>
                    <button onClick={() => setCount(count - 1)} className={styles.btn}>-</button>
                    <button onClick={() => setCount(count + 1)} className={styles.btn}>+</button>
                </div>
                <button onClick={() => setCount(0)} className={styles.resetBtn}>Reset</button>
            </div>
        </div>
    );
};

export default Counter;
