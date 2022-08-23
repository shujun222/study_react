import React, { useState } from 'react';
import styles from './Counter.module.css';
// eslint-disable-next-line
import { increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync,
    incrementAsync3, incrementIfOdd2 } from './counterSlice'
import { useSelector, useDispatch } from 'react-redux';
import store from './store'


export default function Counter() {
    const count0 = store.getState().counter.value
    // 下面这样确实不用引入store了，但是引入了一个useSelector, 这样的好处又在哪儿呢？
    const count = useSelector(state => state.counter.value)

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
                    onClick={() => dispatch(incrementAsync3(incrementAmount))}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd(incrementAmount))}
                >
                    Add If Odd
                </button>
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementIfOdd2(incrementAmount))}
                >
                    Add If Odd2
                </button>
                
            </div>
        </div>
    );
}