/******************************************
Setup the Canvas and Main Board
******************************************/
// init canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function drawRect(x,y,color)
{
	ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(x,y, 25, 25);
    ctx.stroke();
}
function drawRect2(x,y,xS,yS,color)
{
	ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = color;
    ctx.rect(x,y,xS,yS);
    ctx.stroke();
}

// Title
ctx.font = "20px Arial";
ctx.fillText("MASTERMIND",230,30);

//outline guess field
drawRect2(10,40,290,350, "black");
//outline report field
drawRect2(320, 40, 60, 350, "black");

// Layout the Options
var colorsGiven = ["red", "blue", "orange", "purple", "yellow", "green"];
for(i=0, x=10; i<6;i++)
{
	ctx.beginPath();
	ctx.lineWidth = "4";
	ctx.strokeStyle = colorsGiven[i];
	ctx.fillStyle = colorsGiven[i];
	ctx.fillRect(x, 10, 20, 20);  
	ctx.stroke();
	x += 30;
}

// Get Random Answer
var ans = [];
for(i=0; i<4;i++)
{
	let num = Math.floor(Math.random() * colorsGiven.length);
	ans.push(colorsGiven[num]);
	colorsGiven.splice(num,1);

}
console.log("answer is " + ans);

// Layout all field squares
matrix = [];
for(i=0, y=45;i<10;i++)
{
	let x=30;
	let row = [];
	for(j=0;j<4;j++)
	{
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.rect(x, y, 25, 25);  
		ctx.stroke();
		row.push( [x,y] );
		x += 70;
	}

	y += 35;
	matrix.push(row);
}

// layout all report squares
matrixReport = [];
for(i=0,y=55;i<10;i++)
{
	let x = 323;
	let row = [];
	for(j=0;j<4;j++)
	{
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.rect(x, y, 9, 9);  
		ctx.stroke();
		row.push( [x,y] );
		x += 15;
	}
	y += 35;
	matrixReport.push(row);
}

/*******************************************
Master mind Game Logic and Drawing Squares
********************************************/
var colors = [];
var guesscount = 0;
var report = [];
// Choosing a Color 
function chooseColor(color) {
	// add color to list
	if(colors.indexOf(color) == -1)
		colors.push(color);
	else
		return window.alert("A color can only be chosen once");
	// draw color
	let row = matrix[guesscount];
	drawRect(row[colors.length-1][0], row[colors.length-1][1], color);

	// reset after 4 chosen
	if(colors.length >= 4) {
		// run report
		let results = getReport();
		drawReport(results)
		// reset colors
		colors = [];
		// add to guess count
		guesscount += 1;
		console.log(guesscount);

		// if you win
		if(results.indexOf('black') == -1 && results.indexOf('grey') == -1)
		{
			setTimeout(() => (window.alert("You truly are the Mastermind\
				\nTo play again, press Restart Game"), 3000));
			return;
		}
		if(guesscount == 10)
		{
			setTimeout(() => (window.alert("Close, but Let's Play Again!" +
				"\nanswer is " + ans), 3000));
			return;
		}
		return;
	}

}

function colorReset() {
	let row = matrix[guesscount];
	// reset colors
	colors = [];
	for(square in row){
		ctx.beginPath();
		ctx.lineWidth = "2";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.fillRect(row[square][0], row[square][1], 25, 25);  
		ctx.stroke();
	}
}

function getReport() {
	let repColors = [];
	for(i=0;i<4;i++)
	{
		if(ans.includes(colors[i], i))
		{
			// Red if correct spot, and correct color
			if(ans.indexOf(colors[i], i) == i)
			{
				repColors.push("red");
			}
			else if(ans.includes(colors[i], i) 
				&& !ans.includes[colors[i+1]]
				&& ans.indexOf(colors[i], i) == i)
			{
				repColors.push("red");
			}
			// black if correct color, wrong spot
			else{
				repColors.push("black");
			}
		}
		// blank otherwise
		else{
			repColors.push("grey");
		}
	}
	return repColors;
}

function drawReport(reportResults)
{
	let row = matrixReport[guesscount];
	for(i=0;i<4;i++)
	{
		ctx.beginPath();
		ctx.lineWidth = "1";
		ctx.strokeStyle = reportResults[i];
		ctx.fillStyle = reportResults[i];
		ctx.fillRect(row[i][0], row[i][1], 9, 9);  
		ctx.stroke();
	}
	return 1;
}