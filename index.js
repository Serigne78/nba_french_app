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
        var school_player = nba_stats.commonPlayerInfo[0].school;


        
        var from_year_player = nba_stats.commonPlayerInfo[0].fromYear;
        var to_year_player = nba_stats.commonPlayerInfo[0].toYear;
        var draft_round_player = nba_stats.commonPlayerInfo[0].draftRound;
        var draft_number_player = nba_stats.commonPlayerInfo[0].draftNumber;
        var season_player = nba_stats.playerHeadlineStats[0].timeFrame;
        var country = nba_stats.commonPlayerInfo[0].country;
        




         // stats player // 
        var pts_player = nba_stats.playerHeadlineStats[0].pts;
        var ast_player = nba_stats.playerHeadlineStats[0].ast;
        var reb_player = nba_stats.playerHeadlineStats[0].reb;
        var pie_player = nba_stats.playerHeadlineStats[0].pie;
       
        var teamId = nba_player.playerId;
        player = nba_player.fullName;


      
        var player_profile = await NBA.stats.playerProfile(params);
        var data_player_profile = player_profile.seasonRankingsRegularSeason;
        var minute_player, panier_player, percentage_player, three_points_player, three_points_percentage_player, lancers_francs, lancers_percentage, reb_rank, ast_rank, stl_rank, turn_over_rank, pts_rank, eff_rank;
        var data_player_profile = data_player_profile[data_player_profile.length - 1];
        
        
        
        minute_player = data_player_profile.rankPgMin;
        panier_player = data_player_profile.rankPgFgm;
        percentage_player = data_player_profile.rankFgPct;
        three_points_player = data_player_profile.rankPgFg3m;
        three_points_percentage_player = data_player_profile.rankFg3Pct;
        lancers_francs = data_player_profile.rankPgFtm;
        lancers_percentage = data_player_profile.rankFtPct;
        reb_rank = data_player_profile.rankPgReb;
        ast_rank = data_player_profile.rankPgAst;
        stl_rank = data_player_profile.rankPgStl;
        turn_over_rank = data_player_profile.rankPgTov;
        pts_rank = data_player_profile.rankPgPts;
        eff_rank = data_player_profile.rankPgEff;
        
        
        console.log(pts_rank);
        


       
       

        res.render("index.ejs", {player:player,team_player:team_player,
            height_player:height_player
            ,weight_player:weight_player,
            number_season_player:number_season_player,
            jersey_player:jersey_player,season_player:season_player,
            position_player:position_player,school_player:school_player,
            from_year_player:from_year_player,to_year_player:to_year_player,
            draft_round_player:draft_round_player,
            draft_number_player:draft_number_player,country:country,
            pts_player:pts_player,ast_player:ast_player,
            reb_player:reb_player, pie_player:pie_player,
            minute_player:minute_player,panier_player:panier_player,
            percentage_player:percentage_player,three_points_player:three_points_player,
            three_points_percentage_player:three_points_percentage_player,lancers_francs:lancers_francs,
            lancers_percentage:lancers_percentage,reb_rank:reb_rank,
            ast_rank:ast_rank, stl_rank:stl_rank,turn_over_rank:turn_over_rank,
            pts_rank:pts_rank, eff_rank:eff_rank});
    } catch (error) {
        var messageError = `Le joueur selectionné n'existe pas, réessayer | code error: ${error}`;
        res.render("index.ejs",{messageError:messageError})
    }

    
})
  



app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      });
          