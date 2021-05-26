class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question = new Question()
    question.hide();
    
    //write code to change the background color here
    background("Yellow")
    //write code to show a heading for showing the result of Quiz
    text("Results of Quiz",150,300)

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue")
      textSize(20);
      text("*NOTE: CONTESTANT who answered correct are highlighted in green color!",130,230)
    }
    //write code to add a note here

    //write code to highlight contest who answered correctly
    if(allContestants !== undefined){
      var display_position = 300
      for(var plr in allContestants){
        var correctAns = "2";
        if(correctAns === allContestants[plr].answer){
          fill("Green");
        }else{
          fill("Red");
        }
        display_position = display_position + 20
        textSize(15)
        text(allContestants[plr].name +":" +allContestants[plr].distance,120,display_position);
      }
    }
  }

}
