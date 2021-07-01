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

    question.hide()

    background("yellow")

    var result="--------Result Of The Quiz---------"
    fill("black")
    textSize(20)
    text(result,300,230)  

    Contestant.getPlayerInfo()

    if(allContestants!==undefined){
      var display_ans=260
       text("***NOTE***☛ Contestants who answer correctly are highlighted in green colour ",100,260)

    }


    for(var plr in allContestants){
       var correct_ans="2"
       if(correct_ans===allContestants[plr].answer){
              fill("green")
        }
       else{
         fill("red")
       }
       display_ans+=30;
          textSize(20);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,display_ans)
    }
    
  }

}
