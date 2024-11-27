import "./App.css";
import React, { useState } from 'react'

const App: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [inputHistory, setInputHistory] = useState<string[]>([`Welcome to the Terminal. Type help for command options.`])

  const [currentHandlingMethod, setCurrentHandlingMethod] = useState<string>('default')

  const handleRunCommand = (args: string[]) => {
    if (args.length !== 1) {
      console.log('run: no arguments or too many arguments')
      setInputHistory((prev) => [...prev, 'run: no arguments or too many arguments'])
      return
    }

    switch (args[0]) {
      case 'RPS':
        setInputHistory((prev) => [...prev, `Enter Rock, Paper or Scissors`])
        setCurrentHandlingMethod('RPS')
        break;
      default:
        console.log(`run: program doesn't exist`)
        setInputHistory((prev) => [...prev, `run: program doesn't exist`])
        break;
    }
  }

  const keyDownDefault = (commandWord: string, args: string[]) => {
    setInputHistory((prev) => [...prev, `~ ${input}`])

    switch (commandWord) {
      case 'run':
        handleRunCommand(args)
        break;
      case 'help':
        console.log('Available commands: run, help')
        setInputHistory((prev) => [...prev, `Available commands: run RPS, help`])
        break;
      default:
        console.log(currentHandlingMethod)
        console.log(`Unknown command: ${commandWord}`)
        setInputHistory((prev) => [...prev, `Unknown command: ${commandWord}`])
        break;
    }
  }

  const keyDownRPSReplay = (commandWord: string) => {
    commandWord = commandWord.toUpperCase()
    setInputHistory((prev) => [...prev, `${input}`])
    if (commandWord == "N") {
      setInputHistory((prev) => [...prev, `Exiting Program...`])
      setCurrentHandlingMethod('default')
    } else if (commandWord == "Y") {
      setInputHistory((prev) => [...prev, `Enter Rock, Paper or Scissors`])
      setCurrentHandlingMethod('RPS')
    } else {
      setInputHistory((prev) => [...prev, `Invalid Input`])
      setInputHistory((prev) => [...prev, `Would you like to play again? (Y/N)`])
    }
  }

  const keyDownRPS = (commandWord: string) => {
    commandWord = commandWord[0].toUpperCase() + commandWord.slice(1)
    const availableHands = ['Rock', 'Paper', 'Scissors']
    if (availableHands.includes(commandWord)){
      fetch(`http://localhost:5000/rps/${commandWord}`)
        .then((res) => res.json())
        .then((data) => {
          setInputHistory((prev) => [...prev, `Your hand: ${data.user_move}`])
          setInputHistory((prev) => [...prev, `Computer hand: ${data.computer_move}`])
          setInputHistory((prev) => [...prev, data.result])
          setInputHistory((prev) => [...prev, data.playAgain])
        })
        setCurrentHandlingMethod('RPSReplay')
    } else {
      setInputHistory((prev) => [...prev, `Invalid Input`])
      setInputHistory((prev) => [...prev, `Enter Rock, Paper or Scissors`])
    } 
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const inputArray = input.trim().split(' ')
      const commandWord = inputArray[0]
      const args = inputArray.slice(1)
      switch(currentHandlingMethod) {
        case 'default':
          keyDownDefault(commandWord, args)
          break;
        case 'RPS':
          keyDownRPS(commandWord)
          break;
        case 'RPSReplay':
          keyDownRPSReplay(commandWord)
          break;
      }
      setInput('') 
    }
  }

  return (
    <div className="terminal-div" style={{ fontFamily: 'monospace', color: '#0f0', backgroundColor: '#000', padding: '1rem', borderRadius: '5px', width: "500px" }}>
      <div className="command-history" style={{ marginBottom: '1rem', height: '300px', overflowY: 'auto' }}>
        {inputHistory.map((command, index) => (
          <p key={index} className="history-item" style={{textAlign: "left"}}>
            {command}
          </p>
        ))}
      </div>

      <div className="input-prompt" style={{ display: 'flex', alignItems: 'center' }}>
        <span className="prompt-path">~</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command"
          style={{
            background: 'transparent',
            color: '#0f0',
            border: 'none',
            outline: 'none',
            flex: 1,
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  )
}


export default App
