var player1 = prompt("player 1: Enter your name, you will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("player 2: Enter your name, you will be red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
  console.log("Congratulations, you have won the game");
  console.log("rowNum");
  console.log("colNum");
}

function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = returnColor(5,colIndex);
  for(var row = 5; row > -1; row--)
  {
    colorReport = returnColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
    return row;
   }
  }
}


function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one != undefined)
}

function horizontalWinCheck()
{
  for(var row = 0;row < 6; row++) {
  for(var col = 0;col < 4 ;col++) {
  if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))) {
  console.log('horizontal win');
  reportWin(row,col);
  return true;
}else {
    continue;
  }
}
}
}


function verticalWinCheck()
{
  for(var col = 0;col < 7; col++) {
  for(var row = 0;row < 3; row++) {
  if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))) {
  console.log('vertical win');
  reportWin(row,col);
  return true;
}else {
    continue;
  }
}
}
}


function diagnolWinCheck()
{
  for(var col = 0;col < 5; col++) {
  for(var row = 0;row < 7; row++) {
  if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))) {
  console.log('Diagnol win');
  reportWin(row,col);
  return true;
}else if (colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))) {
console.log('Diagnol win');
reportWin(row,col);
return true;
} else {
  continue;
}
}
}
}

function gameEnd(winningPlayer)
{
  for(var col = 0;col < 7; col++){
  for(var row = 0;row < 7; row++){
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(winningPlayer + " has won the game. Refresh to play a new game ")
}
}
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + " It's your turn, please pick a column to drop your blue coin");

$('.board button').on('click',function() {

  var col = $(this).closest("td").index();

  var bottomAvail = checkBottom(col);

//  $('h3').text( " hi");


  changeColor(bottomAvail,col,currentColor);

//  $('h3').text( " hi");


  if(horizontalWinCheck() || verticalWinCheck() || diagnolWinCheck())
  {
    gameEnd(currentName);
  }

  currentPlayer = currentPlayer * -1;

  if(currentPlayer === 1)
  {
    currentName = player1;
    $("h3").text(currentName + " It's your turn, please pick a column to drop your blue coin");
    currentColor = player1Color;
  }
else {
  currentName = player2;
  $("h3").text(currentName + " It's your turn, please pick a column to drop your red coin");
  currentColor = player2Color;
}

})
