import React, { useState } from 'react';
import styles from '../common/Counter.module.css';
import { fetchCount } from '../common/counterAPI';



export default function Counter() {
    const [count, setCount] = useState(0)
    let [incrementAmount, setIncrementAmount] = useState(2);
    // 防止用户输入非数值类型
    incrementAmount = Number(incrementAmount) || 0

    function decrement() {
        setCount(count - 1)
    }

    const increment = _ => setCount(count + 1)
    
    function incrementIfOdd() {
        if (count % 2 === 1) {
            setCount(count + incrementAmount)
        }
    }

    function incrementAsync() {
        fetchCount(incrementAmount).then(data => {
            setCount(count + data)
        })
    }

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={decrement}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={increment}
                >
                    +
                </button>
            </div>

            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button
                    className={styles.button}
                    onClick={() => setCount(count + incrementAmount)}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={incrementAsync}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={incrementIfOdd}
                >
                    Add If Odd
                </button>
                
            </div>
        </div>
    );
}