// This function will run the game when the page is ready.
$(document).ready(function() {

// This is the variable set for the timer interval.
var interval;

// Variables for the game have been set in this object. 
// Timer, correct, blank & wrong answers, answer values,
// and the boolean variables set to determine when content on the page shows up. 

var game = {
	time: 30,
	correct: 0,
	wrong: 0,
	blank: 0,
	questionsLeft: 8,
	questions: [$("#q1"), $("#q2"), $("#q3"), $("#q4"), $("#q5"), $("#q6"), $("#q7"), $("#q8")],


// This function starts the timer for the game.
	start: function() {
    
	    //  Use interval to start the count.
	    interval = setInterval(game.counter, 1000);
	    console.log('Time started.')
	},

// This function is setting the timer and making the timer count backwards from 30.
	counter: function() {
		game.time--;
		var timeLeft = parseInt(game.time);

	// If the game timer reaches 0, the trivia content will hide and the results page will appear.
		if (timeLeft === 0) {
			game.stop();
			game.blank++;
			$("#timeUp").append("<h1> Time's Up! <h1>");
		}
	// This displays the amount of time left on the page.  
	$("#timer").html(timeLeft);
	},
 	
// This function makes the trivia content hide and the results content show.
 	stop: function() {

	//Stops the timer. 
	    clearInterval(interval);
	    console.log('Time stopped.')

	   // Sets the game timer to 30 seconds.
		game.time = 30;

		$("#trivia").hide();
		$("#results").show();

		if (game.questionsLeft > 0) {
			setTimeout(game.newQuestion, 2000);
		} else if (game.questionsLeft === 0) {
			game.end();
		}
	},

// This function makes the trivia content hide and the funal result content show.
 	end: function() {

//  Use clearInterval to stop the count. 		
    clearInterval(interval);
    
		$("#trivia").hide();
		$("#results").show();
		$("#end").show();

// If the user has 6 or more questions right the game will post that they are an expert.
		if (game.correct >= 6) {
			$("#userEnd").append("<h1> You're A Twin Peaks Expert! <h1>");
			$("#picture").append("<img src='assets/images/littleman.gif'>");
// If the user scores less than 6, the game will post that the user needs to watch more Twin Peaks.
		} else {
			$("#userEnd").append("<h1> You Need to Watch Twin Peaks! <h1>");
			$("#picture").append("<img src='assets/images/bob.gif'>");
		}
	},

// This function will determine if the answers selected are correct or incorrect.	
	userAnswer: function() {

		$('input[type="radio"]:checked').each(function() {

		    if (this.value === "correct") {
				game.correct++;
				$("#correct").text(game.correct);
				$("#userEnd").append("<h1> That's Right! <h1>");
				game.questionsLeft--;
				console.log(game.questionsLeft);
				game.stop();
		    } else if (this.value === "wrong") {
		   		game.wrong++;
				$("#wrong").text(game.wrong);
				$("#userEnd").append("<h1> Wrong! <h1>");
				game.questionsLeft--;
				console.log(game.questionsLeft);
				game.stop();
			}
		});

	},

	// This function will pull up a new question after the results from the previous question pop up.
	newQuestion: function() {

		console.log("New Question.")

		game.start();

		$("#trivia").show();
		
		// Hides the results content.
		$("#results").hide();

		// This will empty the text content that was revealed when the game is over..
		$("#userEnd").empty();
		
		// This will empty the picture content that was revealed when the game is over..
		$("#picture").empty();

		// This will empty the 'Time's Up!' content that was revealed when the game ended due to time constraints..
		$("#timeUp").empty();

		$('input[type=radio]').attr("checked", false);


		// $("#trivia").each(game.questions, function() {
			
			
		// });
	}
}

// Here's the beginning of the trivia logic.

// This will make the results "page" hide when the page is loaded.
	$("#results").hide();
	$("#end").hide();

//This will make the trivia content hide when the page is loaded. 
	$("#trivia").hide();

 // When someone clicks the start button the following function will happen.
	$("#startGame").click(function newGame() {
	 // The start "page" will hide.
		$("#startGame").hide();

	//The trivia content will show. 
		$("#trivia").show();

		game.start();
		// game.newQuestion();
		
	});
	
	 // When someone clicks an answer, the game will go to the next question.
	$('input[type="radio"]').click(function answerQuestion() {

		game.userAnswer();

	});

// This function will restart the game when someone clicks on the restart button.
	$("#restart").click(function restart() {
		// Hides the trivia content.
		$("#trivia").hide();
		// Hides the results content.
		$("#results").hide();
		$("#end").hide();
		// Shows the starting page so the user can restart the game.
		$("#startGame").show();

		// This will empty the text content that was revealed when the game is over..
		$("#userEnd").empty();

		// This will empty the picture content that was revealed when the game is over..
		$("#picture").empty();

		// This will empty the 'Time's Up!' content that was revealed when the game ended due to time constraints..
		$("#timeUp").empty();

		// Sets the scores for correct, incorrect and blank answers to 0.
		game.correct = 0;
		game.wrong = 0;
		game.blank = 0;
		game.questionsLeft = 8;

		// Sets the game timer to 30 seconds.
		game.time = 30;

		$("#correct").text(game.correct);

		$("#wrong").text(game.wrong);

		$("#blank").text(game.blank);


		// Resets the game values from the form back to being unselected.
		$('input[type=radio]').attr("checked", false);
	});
});

