import java.util.Random;

public class RockPaperScissors {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Error: Please provide your move (Rock, Paper, or Scissors).");
            return;
        }

        String userHand = args[0].trim();
        String[] options = {"Rock", "Paper", "Scissors"};
        Random random = new Random();
        String computerHand = options[random.nextInt(3)];

        System.out.println(userHand);
        System.out.println(computerHand);

        if (userHand.equalsIgnoreCase(computerHand)) {
            System.out.println("You tied with the computer");
        } else if (
            (userHand.equalsIgnoreCase("Rock") && computerHand.equals("Scissors")) ||
            (userHand.equalsIgnoreCase("Paper") && computerHand.equals("Rock")) ||
            (userHand.equalsIgnoreCase("Scissors") && computerHand.equals("Paper"))
        ) {
            System.out.println("You won against the computer");
        } else {
            System.out.println("You lost against the computer");
        }

        System.out.println("Would you like to play again? (Y/N)");  
    }
}
