from flask import Flask, jsonify, redirect, url_for
from flask_cors import CORS

import subprocess


app = Flask(__name__)
CORS(app)


@app.route('/rps/<player_hand>')
def play_rps(player_hand):
    valid_moves = ["Rock", "Paper", "Scissors"]
    if player_hand.capitalize() not in valid_moves:
        return jsonify({"error": "Invalid move. Please choose Rock, Paper, or Scissors."})

    try:
        result = subprocess.run(
            ["java", "-cp", "./programs/rps", "RockPaperScissors", player_hand],
            text=True,
            capture_output=True,
            check=True
        )
        output_lines = result.stdout.strip().split("\n")
        response = {
            "user_move": output_lines[0],
            "computer_move": output_lines[1],
            "result": output_lines[2],
            "playAgain": output_lines[3]
        }
        return jsonify(response)
    except FileNotFoundError:
        return jsonify({"error": "Java program not found. Ensure it's compiled and in the correct directory."})
    except subprocess.CalledProcessError as e:
        return jsonify({"error": f"Java program error: {e.stderr.strip()}"})
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
