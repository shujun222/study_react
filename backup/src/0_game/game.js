// 井字游戏，react最好的入门实例
// https://react.docschina.org/tutorial/tutorial.html
// Author： shujun
// Date: 2020-07-06 06:09整理目录

import React from 'react';
import './game.css';

function Square(props) {
  return <button className="square"
    onClick={props.onClick}>
    {props.value}
  </button>;
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        Array(9).fill(null),
      ],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handClick(i) {
    const stepNumber = this.state.stepNumber;
    // slice history，为了在回退历史步骤中重新下
    let history = this.state.history.slice(0, stepNumber + 1);
    //function of slice is to copy a object
    const square = history[stepNumber].slice();

    if (calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = this.state.xIsNext ? 'X' : 'O';
    history.push(square);

    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
      stepNumber: stepNumber + 1
    });
  }

  jumpTo(step) {
    this.setState({
      xIsNext: step % 2 === 0,
      stepNumber: step
    });
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    let winner = calculateWinner(current);
    let status;
    if (winner) {
      status = 'The winner is: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((move, step) => {
      const desc = step ?
        'Go to move #' + step :
        'Go to game start';
      return <li key={step}>
        <button onClick={() => this.jumpTo(step)}>{desc}</button>
      </li>;
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={(i) => this.handClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let index = 0; index < lines.length; index++) {
    // const position = lines[index];
    // if (squares[position[0]] && squares[position[0]] === squares[position[1]] && squares[position[0]] === squares[position[2]]) {
    //   return squares[position[0]];
    // }

    const [a, b, c] = lines[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}