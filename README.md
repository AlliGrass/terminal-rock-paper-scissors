# Welcome to my Terminal Emulator. 

Currently it can only run a few commands, (run, help, clear) with only one program attached to the application, however it is versatile enough to be able to apply more commands quite easily.

## Installation
The application requires a few dependencies to run. Namely React.ts for the frontend, Flask for the backend and Flask CORS to be able to run the Java files.

Before attempting to run any servers you’ll need to compile the java file using `javac RockPaperScissors.java`

Then run both the backend and frontend servers 
`python3 server.py`
`npm run dev`

Open the browser page for the frontend server. If running development then the port should be `localhost/5173`

## Adding output to terminal
Any output that needs to be placed into the terminal should be done using the `inputHistory` state. The state holds all current history of outputs. 

`setInputHistory((prev) => [...prev, 'New Output'])`

## Adding to pre existing functions
Currently the only function you can expand is the `handleRunCommands`. This function has a switch case to handle separate functions. Simply add another case with your intended logic. 
- If the function you want to implement requires the terminal to enter a different mode that isn’t “default” and can't interact with any of the default commands you can alter the `currentHandlingMethod` state.

```ts
const handleRunCommand = (args: string[]) => {
    if (args.length !== 1) {
      console.log('run: no arguments or too many arguments')
      setInputHistory((prev) => [...prev, 'run: no arguments or too many arguments'])
      return
    }

    switch (args[0]) {
      case 'RPS':
        setInputHistory((prev) => [...prev, `Enter Rock, Paper or Scissors`])
        setCurrentHandlingMethod('RPS') // Alter handling method of terminal for different input settings
        break;
      // Add cases for commands
      default:
        console.log(`run: program doesn't exist`)
        setInputHistory((prev) => [...prev, `run: program doesn't exist`])
        break;
    }
  }
```



## Adding commands
Any new commands that aren’t run of help should be implemented into the switch case in `keysDownDefault`. Then write a new function to implement the logic of the code.

```ts
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
      // Add cases for commands
      default:
        console.log(currentHandlingMethod)
        console.log(`Unknown command: ${commandWord}`)
        setInputHistory((prev) => [...prev, `Unknown command: ${commandWord}`])
        break;
    }
  }
```

## Requesting from backend
Create a fetch request to the python server using the route. This fetch request should return the output of the functions that are being utilised.

```ts
fetch(`http://localhost:5000/api/route`)
  .then((res) => res.json())
  .then((data) => {
    setInputHistory((prev) => [...prev, data])
  })
```

## Running external programs
Utilise pythons `subprocess` to run different programs from different files. All console logs from the program will be stored in the python call and can be distributed back to the frontend.

```py
try:
    result = subprocess.run(
        ["java", "-cp", "path/to/file", "File_Name", variables],
        text=True,
        capture_output=True,
        check=True
    )
    output_lines = result.stdout.strip().split("\n")
    response = {
        "output": output_lines
    }
```
