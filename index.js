import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import NBA from 'nba';

dotenv.config();


const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: process.env.SECRETS_DB,
    port: 5432


});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/",  async (req, res) => {
      res.render("index.ejs");
      
  });

app.post("/search-player", async (req, res) => {
    try {
        var  player = req.body["player_name"];
        var nba_player =  await NBA.findPlayer(player);
        var playerid = nba_player.playerId;
        var params = {
            PlayerID: playerid,
        }

       
       
        var nba_stats =  await NBA.stats.playerInfo(params);
        var team_player = nba_stats.commonPlayerInfo[0].teamName;
        var height_player = nba_stats.commonPlayerInfo[0].height;
        var weight_player = nba_stats.commonPlayerInfo[0].weight;
        var number_season_player = nba_stats.commonPlayerInfo[0].seasonExp;
        var jersey_player = nba_stats.commonPlayerInfo[0].jersey;
        var position_player = nba_stats.commonPlayerInfo[0].position;



        
        var from_year_player = nba_stats.commonPlayerInfo[0].fromYear;
        var to_year_player = nba_stats.commonPlayerInfo[0].toYear;
        var draft_round_player = nba_stats.commonPlayerInfo[0].draftRound;
        var draft_number_player = nba_stats.commonPlayerInfo[0].draftNumber;
        var school_player = nba_stats.commonPlayerInfo[0].school;
        var country = nba_stats.commonPlayerInfo[0].country;
        




         // stats player // 
        var pts_player = nba_stats.playerHeadlineStats[0].pts;
        var ast_player = nba_stats.playerHeadlineStats[0].ast;
        var reb_player = nba_stats.playerHeadlineStats[0].reb;
        var pie_player = nba_stats.playerHeadlineStats[0].pie;
        var season_player = nba_stats.playerHeadlineStats[0].timeFrame;
        var teamId = nba_player.playerId;
        player = nba_player.fullName;


        var params = {
            Country: "France",
        }
        var player_profile =  await NBA.stats.playerShooting(params)
        console.log(player_profile)

        console.log(nba_stats);
        console.log(pts_player);
        console.log(ast_player);
        console.log(reb_player);
        console.log(pie_player);
        console.log(season_player);
       

        res.render("index.ejs", {player:player});
    } catch (error) {
        var messageError = `Le joueur selectionné n'existe pas, réessayer | code error: ${error}`;
        res.render("index.ejs",{messageError:messageError})
    }

    
})
  



app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      });
          