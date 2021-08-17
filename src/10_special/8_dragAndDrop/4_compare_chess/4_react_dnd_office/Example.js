import React, {useMemo} from 'react'
import Board from './Board'
import { Game } from './Game';

export default function Example() {
    // useMemo类似于useEffect, 只加载一次的作用
    const game = useMemo(() => new Game(), []);
    return <Board game={game}/>
}