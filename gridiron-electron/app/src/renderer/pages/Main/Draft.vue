<template>
  <div id="app-draft">
    <div class="main-cnt">
    <router-link :to="{ path: '/login' }" tag="el-button">Exit Draft</router-link>
    <el-button size="small" type="info" @click="tryRecommend()">ReccomendPlayer</el-button>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
              <img src="" class="image">
              <div style="padding: 14px;">
                <span>Recommended Player 1</span>
                <div class="bottom clearfix">
                  <p>Position</p>
                  <p>Projected Points</p>
                </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
                <img src="" class="image">
                <div style="padding: 14px;">
                  <span>Recommended Player 2</span>
                  <div class="bottom clearfix">
                    <p>Position</p>
                    <p>Projected Points</p>
                  </div>
                </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card :body-style="{ padding: '0px' }">
                <img src="" class="image">
                <div style="padding: 14px;">
                  <span>Recommended Player 3</span>
                  <div class="bottom clearfix">
                    <p>Position</p>
                    <p>Projected Points</p>
                  </div>
                </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-tabs v-model="tableTab">
            <el-tab-pane label="Players" name="first">
              <el-table
                  :data="players"
                  :default-sort="{prop: 'PredFantasyPoints', order: 'descending'}"
                  max-height="350"
                  border
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template scope="props">
                    <h4>Predictions</h4>
                      <template v-if="props.row.Position === 'QB'">
                        <el-row :gutter="24">
                          <el-col :span ="8">
                            <p>Passing Yards: {{props.row.PredSeasonPassYrds.toFixed(2)}}</p>
                            <p>Interceptions: {{props.row.PredSeasonInterceptions.toFixed(2)}}</p>
                            <p>Fumbles: {{props.row.PredSeasonFumbles.toFixed(2)}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Passing TDs: {{props.row.PredSeasonPassTDs.toFixed(2)}}</p>
                            <p>Rushing TDs: {{props.row.PredSeasonRushTDs.toFixed(2)}}</p>
                            <p>Passing TD Ratio: {{(100 * props.row.PredPassTDAttRatio).toFixed(2)}}%</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Passing Attempts Per Game: {{props.row.PredPassAttPerGame.toFixed(2)}}</p>
                            <p>Yards Per Pass: {{props.row.PredAvgPassYrds.toFixed(2)}}</p>
                          </el-col>
                        </el-row>
                      </template>
                      <template v-if="props.row.Position === 'RB'">
                        <el-row :gutter="24">
                          <el-col :span ="8">
                            <p>Rushing Yards: {{props.row.PredSeasonRushYrds.toFixed(2)}}</p>
                            <p>Receiving Yards: {{props.row.PredSeasonPassYrds.toFixed(2)}}</p>
                            <p>Fumbles: {{props.row.PredSeasonFumbles.toFixed(2)}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Rushing TDs: {{props.row.PredSeasonRushTDs.toFixed(2)}}</p>
                            <p>Receiving TDs: {{props.row.PredSeasonPassTDs.toFixed(2)}}</p>
                            <p>Rushing TD Ratio: {{(parseFloat(props.row.PredRushTDAttRatio) * 100).toFixed(2)}}%</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Rushing Attempts Per Game: {{props.row.PredRushAttPerGame.toFixed(2)}}</p>
                            <p>Receptions Per Game: {{props.row.PredPassAttPerGame.toFixed(2)}}</p>
                            <p>Yards Per Carry: {{props.row.PredAvgRushYrds.toFixed(2)}}</p>
                          </el-col>
                        </el-row>
                      </template>
                      <template v-if="props.row.Position === 'WR'">
                        <el-row :gutter="24">
                          <el-col :span ="8">
                            <p>Receiving Yards: {{props.row.PredSeasonPassYrds.toFixed(2)}}</p>
                            <p>Fumbles: {{props.row.PredSeasonFumbles.toFixed(2)}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Receiving TDs: {{props.row.PredSeasonPassTDs.toFixed(2)}}</p>
                            <p>TD Ratio: {{(props.row.PredPassTDAttRatio * 100).toFixed(2)}}%</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Receptions Per Game: {{props.row.PredPassAttPerGame.toFixed(2)}}</p>
                            <p>Yards Per Catch: {{props.row.PredAvgPassYrds.toFixed(2)}}</p>
                          </el-col>
                        </el-row>
                      </template>
                      <template v-if="props.row.Position === 'TE'">
                        <el-row :gutter="24">
                          <el-col :span ="8">
                            <p>Receiving Yards: {{props.row.PredSeasonPassYrds.toFixed(2)}}</p>
                            <p>Fumbles: {{props.row.PredSeasonFumbles.toFixed(2)}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Receiving TDs: {{props.row.PredSeasonPassTDs.toFixed(2)}}</p>
                            <p>TD Ratio: {{(props.row.PredPassTDAttRatio * 100).toFixed(2)}}%</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Catches Per Game: {{props.row.PredPassAttPerGame.toFixed(2)}}</p>
                            <p>Yards Per Catch: {{props.row.PredAvgPassYrds.toFixed(2)}}</p>
                          </el-col>
                        </el-row>
                      </template>
                      <template v-if="props.row.Position === 'PK'">
                        <el-row :gutter="24">
                          <el-col :span ="8">
                            <p>Field Goals: {{props.row.PredSeasonFGoals.toFixed(2)}}</p>
                            <p>FG Attemps Per Game: {{props.row.PredFGoalsPerGame.toFixed(2)}}</p>
                          </el-col>
                          <el-col :span="8">
                            <p>Extra Points: {{props.row.PredSeasonExtraPoints.toFixed(2)}}</p>
                            <p>PATs Per Game: {{props.row.PredExtraPointsPerGame.toFixed(2)}}</p>
                          </el-col>
                        </el-row>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="Player"
                    label="Name">
                  </el-table-column>
                  <el-table-column
                    prop="Position"
                    label="Position"
                    :filters="[{ text: 'QB', value: 'QB' }, { text: 'RB', value: 'RB' }, { text: 'WR', value: 'WR' }, { text: 'TE', value: 'TE' }, { text: 'PK', value: 'PK' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                  </el-table-column>
                  <el-table-column
                    prop="PredFantasyPoints"
                    label="Projected Points"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="actions"
                    label="Actions">
                    <template scope="undrafted">
                    <el-button @click="draftPlayer(undrafted.row, players)"
                      type="text"
                      size="small">
                        Draft
                    </el-button>
                    </template>
                  </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Pick History" name="second">
              <el-table
                  :data="picks"
                  max-height="350"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="round"
                    label="Round">
                  </el-table-column>
                  <el-table-column
                    prop="overall"
                    label="Pick">
                  </el-table-column>
                  <el-table-column
                    prop="player"
                    label="Name">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="Position">
                  </el-table-column>
                  <el-table-column
                    prop="team"
                    label="Team">
                  </el-table-column>
              </el-table>
            </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { firebaseDb } from '../../main.js'
  import { recommendPlayers } from '../../draft.js'
  var draftRef
  var numTeams
  var numRounds
  // var pickNumber
  var isSnake
  var draftId
  var teams
  var pickDir
  var curTeam
  var curTeam2
  var curRound
  var curPick
  var overallPick
  var thisisme

  export default {
    data () {
      return {
        tableTab: 'first',
        picks: [],
        players: []
      }
    },
    methods: {
      filterTag (value, row) {
        return row.Position === value
      },
      draftPlayer (player, players) {
        var index = players.indexOf(player)
        var toDraft = players[index]
        players.splice(index, 1)
        teams[curTeam].push(toDraft)
        curTeam2 = curTeam + 1
        curTeam += pickDir

        if (curTeam < 0 || curTeam >= numTeams) {
          if (isSnake) {
            pickDir *= -1
            curTeam += pickDir
          } else {
            curTeam = 0
          }
        }

        var pick = {
          round: curRound,
          pick: curPick,
          overall: overallPick,
          player: toDraft.Player,
          position: toDraft.Position,
          team: curTeam2
        }

        this.picks.push(pick)
        curPick += 1
        overallPick += 1

        var updates = {}
        updates['/picks'] = this.picks
        draftRef.update(updates)
        if (curPick > numTeams) {
          curPick = 1
          curRound += 1
        }

        if (curRound > numRounds) {
          updates = {}
          updates['/teams'] = teams
          draftRef.update(updates)
          this.$router.push('/login')
        }
      },
      setUp () {
        draftId = this.$route.params.id
        draftRef = firebaseDb.ref('drafts/' + draftId)
        thisisme = this
        draftRef.child('draftInfo').once('value').then(function (snapshot) {
          numTeams = snapshot.val().teams
          teams = []
          for (var i = 0; i < numTeams; i++) {
            teams[i] = []
          }
        })

        draftRef.child('draftInfo').once('value').then(function (snapshot) {
          numRounds = snapshot.val().rounds
        })
/*
        draftRef.child('draftInfo').once('value').then(function (snapshot) {
          pickNumber = snapshot.val().pickNo
        })
*/
        draftRef.child('draftInfo').once('value').then(function (snapshot) {
          isSnake = snapshot.val().isSnake
        })

        var playerRef = firebaseDb.ref('players')
        playerRef.child('QB').once('value').then(function (snapshot) {
          var qbs = snapshot.val()
          thisisme.players = thisisme.players.concat(qbs)
        })
        playerRef.child('RB').once('value').then(function (snapshot) {
          var rbs = snapshot.val()
          thisisme.players = thisisme.players.concat(rbs)
        })
        playerRef.child('WR').once('value').then(function (snapshot) {
          var wrs = snapshot.val()
          thisisme.players = thisisme.players.concat(wrs)
        })
        playerRef.child('TE').once('value').then(function (snapshot) {
          var tes = snapshot.val()
          thisisme.players = thisisme.players.concat(tes)
        })
        playerRef.child('K').once('value').then(function (snapshot) {
          var ks = snapshot.val()
          thisisme.players = thisisme.players.concat(ks)
        })
        /*
        var updates = {};
        updates['/picks'] = this.picks;
        draftRef.update(updates);
        */

        pickDir = 1
        curTeam = 0
        curRound = 1
        curPick = 1
        overallPick = 1
      },
      tryRecommend () {
        console.log(recommendPlayers(teams[0], this.players))
      }
    },
    mounted () {
      this.setUp()
    }
  }
</script>
<style>
html, 
body {
    height: 100%;
}

body {
  margin: 0 0;
  font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
}

h1 {
  font-weight: 400;
}

h2 {
  font-size: 28px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 0;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1f2f3d;
  margin: 45px 0 15px;
}

a {
  text-decoration: none;
}

p {
  font-size: 14px;
  color: #5e6d82;
  line-height: 1.5em;
}

#app {
  margin-left: 30px;
  margin-right: 30px;
}

.el-row {
  margin-top: 10px;
  margin-bottom: 14px;
}
.el-row-breadcrumbs {
  margin-top: 6px;
}

.el-card {
  box-shadow: none;
}
</style>
