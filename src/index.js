import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './components/Board'

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        console.log("CLICKED") // NOT FIRED.
        // the use of slice here creates a copy of the array for us to edit
        // whereas otherwise it would try assign a reference to the original
        const history = this.state.history.slice(0, this.state.stepNumber + 1) // throw away 'future' moves if restarting from past point
        const current = history[this.state.stepNumber]
        const squares = current.squares.slice()

        // Click ignored if there is a winner or square already filled.
        if (calculateWinner(squares) || squares[i]) {
            return
        }

        // I love this syntax: var x = cond ? 'val1' : 'val2'
        squares[i] = this.state.xIsNext ? 'X' : 'O' 
        this.setState({
            history: history.concat([{  // concat in opposition to .push() doesnt mutate the original array
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext, // flip the turns boolean
            stepNumber: history.length,
        })
    }

    jumpTo(move) {
        this.setState({
            stepNumber: move,
            xIsNext: (move % 2) === 0,
        })
    }

    map_moves(history) {
        return history.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move : 'Go to game start'
    
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}> {desc} </button>
                </li>
            )
        })
    }


    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const moves = this.map_moves(history)
        const winner = calculateWinner(current.squares)

        let status
            if (winner) {
                status = "Winner: " + winner
            } else {
                status = "Next player: " + (this.state.xIsNext ? 'X' : 'O')
            }

        return(
            <div className="game">
                <div>
                    <div className="game-board">
                        <Board squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>

                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{ moves }</ol>
                    </div>
                </div>
            </div>
        )
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
    ] // must be all the possible lines to win hardcoded ^

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] == squares[c]) {
            return squares[a]
        }
    }
    return null
}

ReactDOM.render(<Game/>, document.getElementById('root')) // EUREKATH