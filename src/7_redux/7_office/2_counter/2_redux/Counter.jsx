import React, { useState } from 'react';
import styles from '../common/Counter.module.css';
import { increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync } from './counterActions'
import store from './store'
import { useSelector, useDispatch } from 'react-redux';



export default function Counter() {
    const count0 = store.getState()
    // 难道这个把 store.subscribe() 也给做了？
    const count = useSelector(state => state)

    let [incrementAmount, setIncrementAmount] = useState(2);
    // 防止用户输入非数值类型
    incrementAmount = Number(incrementAmount) || 0
    const dispatch = useDispatch()

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                useSeletor: <span className={styles.value}>{count}</span>

                &nbsp;
                store.getSate(): <span className={styles.value}>{count0}</span>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
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
                    onClick={() => dispatch(incrementByAmount(incrementAmount))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementAmount))}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementAmount))}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    );
}