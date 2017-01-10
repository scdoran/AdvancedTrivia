// This function will run the game when the page is ready.
$(document).ready(function() {

// This is the variable set for the timer interval.
var interval;

// Questions for the trivia game.
var questions = [{
		question: "Who is the creator of the Twin Peaks series?",
		choices: ["Martin Scorsese", "David Lynch", "Ed Wood", "John Carpenter"],
		answer: 2,
		gif: 'assets/images/david.gif',
	}, { 
		question: "What is Agent Cooper's first name?",
		choices: ["Jim", "Dave", "Dale", "Benjamin"],
		answer: 3,
		gif: 'assets/images/dale.gif',
	}, { 
		question: "Who is Laura Palmer's secret boyfriend?",
		choices: ["Bobby Briggs", "Leo Johnson", "Ben Horne", "James Hurley"],
		answer: 4,
		gif: 'assets/images/james.gif',
	}, { 
		question: "Who is Laura Palmer's best friend?",
		choices: ["Shelly Johnson", "Audrey Horne", "Donna Hayward", "Josie Packard"],
		answer: 3,
		gif: 'assets/images/donna.gif',
	}, { 
		question: "What is the name of the mysterious place Agent Cooper visits in his dreams?",
		choices: ["Black Lodge", "White Lodge", "Red Lodge", "Hex Lodge"],
		answer: 1,
		gif: 'assets/images/blodge.gif',
	}, { 
		question: "What is the name of the hotel owned by Ben Horne?",
		choices: ["Salish Lodge", "Great Northern Hotel", "Great Wolf Lodge", "Kiana Lodge"],
		answer: 2,
		gif: 'assets/images/ben.gif',
	}, { 
		question: "Who found Laura Palmer's body?",
		choices: ["Josie Packard", "Sheriff Truman", "Pete Packard", "Donna Hayward"],
		answer: 3,
		gif: 'assets/images/pete.gif',
	}, { 
		question: "What is the name Agent Cooper uses when he speaks into his tape recorder?",
		choices: ["Jane", "Diane", "Lucy", "Sophia"],
		answer: 2,
		gif: 'assets/images/dianecooper.gif',
	},
]

// Variables for the game have been set in this object. 
// Timer, correct, blank & wrong answers, answer values,
// and the boolean variables set to determine when content on the page shows up. 

var game = {
	time: 30,
	correct: 0,
	wrong: 0,
	blank: 0,
	questionsLeft: 8,
	qCounter: 0,

// This function starts the timer for the game.
	start: function() {
    
	    //  Use interval to start the count.
	    interval = setInterval(game.counter, 1000);
	},

// This function is setting the timer and making the timer count backwards from 30.
	counter: function() {
		game.time--;
		var timeLeft = parseInt(game.time);

	// If the game timer reaches 0, the trivia content will hide and the results page will appear.
		if (timeLeft === 0) {
			game.stop();
			game.questionsLeft--;
			game.gifDisplay(game.qCounter);
			game.qCounter++;
			game.blank++;
			$("#blank").text(game.blank);
			$("#timeUp").append("<h1> Time's Up! <h1>");
		}
	// This displays the amount of time left on the page.  
	$("#timer").html(timeLeft);
	},
 	
// This function makes the trivia content hide and the results content show.
 	stop: function() {

	//Stops the timer. 
	    clearInterval(interval);

	   // Sets the game timer to 30 seconds.
		game.time = 30;

		game.emptyQuestions();

		$("#trivia").hide();
		$("#results").show();

		if (game.questionsLeft > 0){
			setTimeout(game.newQuestion, 2000);
		} else if (game.qCounter === questions.length) {
			setTimeout(game.end, 2000);
		}
	},

// This function makes the trivia content hide and the funal result content show.
 	end: function() {

//  Use clearInterval to stop the count. 		
    clearInterval(interval);
    
		$("#trivia").hide();
		$("#timeUp").empty();
		$("#userEnd").empty();
		$("#picture").empty();
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

	display: function(index){

		var question = $("<p id='question'>");
		question.text(questions[index].question);
		$(".question").append(question);

		var choice1 = $("<p id='a1'>");
		choice1.text(questions[index].choices[0]);
		$("#choice1").append(choice1);

		var choice2 = $("<p id='a2'>");
		choice2.text(questions[index].choices[1]);
		$("#choice2").append(choice2);

		var choice3 = $("<p id='a3'>");
		choice3.text(questions[index].choices[2]);
		$("#choice3").append(choice3);

		var choice4 = $("<p id='a4'>");
		choice4.text(questions[index].choices[3]);
		$("#choice4").append(choice4);

	},

	gifDisplay: function(index){
		var gif = questions[index].gif;

		$("#picture").append("<img src='" + gif + "'alt='Twin Peaks GIF'>");
	},

// This function will determine if the answers selected are correct or incorrect.	
	userAnswer: function() {

		$('input[type="radio"]:checked').each(function() {

		    if (this.value == questions[game.qCounter].answer) {
				game.correct++;
				game.gifDisplay(game.qCounter);
				game.qCounter++;
				$("#correct").text(game.correct);
				$("#userEnd").append("<h1> That's Right! <h1>");
				game.questionsLeft--;
				game.stop();
		    } else {
		   		game.wrong++;
				game.gifDisplay(game.qCounter);
		   		game.qCounter++;
				$("#wrong").text(game.wrong);
				$("#userEnd").append("<h1> Wrong! <h1>");
				game.questionsLeft--;
				game.stop();
			}
		});
	},

	// This function will pull up a new question after the results from the previous question pop up.
	newQuestion: function() {

		game.start();

		game.display(game.qCounter);

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

	}, 

	emptyQuestions: function() {
		$("#question").remove();
		$("#a1").remove();
		$("#a2").remove();
		$("#a3").remove();
		$("#a4").remove();
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
		game.display(game.qCounter);
		
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
		game.qCounter = 0;

		// Sets the game timer to 30 seconds.
		game.time = 30;

		$("#correct").text(game.correct);

		$("#wrong").text(game.wrong);

		$("#blank").text(game.blank);

		// Resets the game values from the form back to being unselected.
		$('input[type=radio]').attr("checked", false);
	});
});

