import React, { useState } from 'react';
import styles from '../common/Counter.module.css';
import { increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync } from './counterActions'
import { connect } from 'react-redux';


function Counter(props) {
    let [incrementAmount, setIncrementAmount] = useState(2);
    // 防止用户输入非数值类型
    incrementAmount = Number(incrementAmount) || 0

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={props.decrement}
                >
                    -
                </button>
                props: <span className={styles.value}>{props.count}</span>

                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={props.increment}
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
                    onClick={() => props.incrementByAmount(incrementAmount)}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => props.incrementAsync(incrementAmount)}
                >
                    Add Async
                </button>
                <button
                    className={styles.button}
                    onClick={() => props.incrementIfOdd(incrementAmount)}
                >
                    Add If Odd
                </button>
            </div>
        </div>
    );
}

export default connect(
    state => ({count: state}),
    {
        increment, decrement, incrementByAmount, incrementIfOdd, incrementAsync
    }
)(Counter)
