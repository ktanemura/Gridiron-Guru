<template>
  <div class="app-fantasylist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h2>Fantasy List!</h2>
          </div>
        </el-col>
      </el-row>
    <el-table
      :data="teams" :fit="true"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Team"
        width="220">
      </el-table-column>
      <el-table-column
        prop="league"
        label="League"
        width="235">
      </el-table-column>
      <el-table-column
        label="Options">

  <template scope="myScope">
    <el-button size="small" type="info" @click="displayReport(myScope.row)">Report</el-button>
  </template>
  </el-table-column>
  </el-table>
        <!--template scope="scope"-->
  <!--Report popup-->
  <el-dialog title="Report" :visible.sync="dialogTableVisible">
  <!--el-dialog prop=teamName :visible.sync="dialogTableVisible"-->
   <p style="font-weight: bold;">Weekly Reports</p>
    <el-table :data="weeklyReports" :fit=true height="150">
      <el-table-column property="season" label="Season" width="150"></el-table-column>
      <el-table-column property="week" label="Week" width="200"></el-table-column>
      <el-table-column property="result" label="Result"></el-table-column>
    </el-table>
   <p style="font-weight: bold;">Current Lineup</p>
    <el-table :data="testPlayers" :fit=true height="150">
      <el-table-column property="Position" label="Position" width="150"></el-table-column>
      <el-table-column property="Player" label="Player" width="190"></el-table-column>
      <el-table-column property="points" label="Predicted Points"></el-table-column>
    </el-table>
   <p style="font-weight: bold;"></br>Recommended Lineup</p>
    <el-table :data="recommendedLineup" :fit=true height="150">
      <el-table-column property="position" label="Position" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column property="points" label="Predicted Points"></el-table-column>
    </el-table>
  </el-dialog>

        <!--/template-->
      <!--/el-table-column>
    </el-table-->
      </div>
    </div>
  </template>
<script>
  import {firebase, firebaseDb} from '../../main.js'
  var userRef
  var thisisme
  export default {
    data () {
      return {
        teamName: '',
        dialogTableVisible: false,
        testPlayers: [],
        currentLineup: [{
          position: 'QB',
          name: 'Aaron Rodgers',
          points: 23.42
        }, {
          position: 'RB',
          name: 'Devontae Freeman',
          points: 17.12
        }, {
          position: 'RB',
          name: 'Lamar Miller',
          points: 9.68
        }, {
          position: 'WR',
          name: 'Mike Evans',
          points: 'L'
        }, {
          position: 'WR',
          name: 'Julio Jones',
          points: 16.11
        }, {
          position: 'Flex Position',
          name: 'Alshon Jeffery',
          points: 20
        }, {
          position: 'Tight End',
          name: 'Antonio Gates',
          points: 30
        }, {
          position: 'Kicker',
          name: 'Dan Bailey',
          points: 12.98
        }, {
          position: 'Defense',
          name: 'Joey Bosa',
          points: 22.61
        }],

        recommendedLineup: [{
          position: 'QB',
          name: 'Kirk Cousins',
          points: 23.42
        }, {
          position: 'RB',
          name: 'Jamaal Charles',
          points: 17.12
        }, {
          position: 'RB',
          name: 'Thomas Rawls',
          points: 9.68
        }, {
          position: 'WR',
          name: 'Odell Beckham Jr.',
          points: 'L'
        }, {
          position: 'WR',
          name: 'A.J. Green',
          points: 16.11
        }, {
          position: 'Flex Position',
          name: 'Jimmy Graham',
          points: 20
        }, {
          position: 'Tight End',
          name: 'Greg Olson',
          points: 30
        }, {
          position: 'Kicker',
          name: 'Stephen Gostkowski',
          points: 12.98
        }, {
          position: 'Defense',
          name: 'Aaron Donald',
          points: 22.61
        }],

        weeklyReports: [{
          season: '2016',
          week: 4,
          result: 'L'
        }, {
          season: '2016',
          week: 3,
          result: 'W'
        }, {
          season: '2016',
          week: 2,
          result: 'W'
        }, {
          season: '2016',
          week: 1,
          result: 'L'
        }],
        teams: []
      }
    },
    methods: {
      setUp () {
        userRef = firebaseDb.ref('users/' + firebase.auth().currentUser.uid)
        thisisme = this
        userRef.child('teams').once('value').then(function (snapshot) {
          var t = snapshot.val()

          console.log(t)

          t.forEach(function (team) {
            console.log('In teams')
            firebaseDb.ref('userLeagues').once('value').then(function (snapshot) {
              var uL = snapshot.val()
              console.log('In user leagues')
              console.log(uL)
              Object.keys(uL).forEach(function (league) {
                console.log('In league')
                Object.keys(uL[league]).forEach(function (userId) {
                  if (userId === firebase.auth().currentUser.uid) {
                    team['league'] = league
                    console.log(team)
                    thisisme.teamName = 'Report for ' + team['name']
                    console.log('TEAM NAME: ' + team['name'])
                    thisisme.teams = t
                  }
                })
              })
            })
          })
        })
      },
      displayReport (team) {
        var temp = team['players']
        var QB = 0
        var RB = 0
        var WR = 0
        var TE = 0
        var PK = 0
        var DEF = 0
        var thisisme = this
        this.dialogTableVisible = true
        temp.forEach(function (player) {
          player['points'] = (player['PredFantasyPoints'] / 16).toFixed(2)
          switch (player['Position']) {
            case 'QB':
              if (QB < 1) {
                thisisme.testPlayers.push(player)
              }
              QB++
              break
            case 'RB':
              if (RB < 2) {
                thisisme.testPlayers.push(player)
              }
              RB++
              break
            case 'WR':
              if (WR < 2) {
                thisisme.testPlayers.push(player)
              }
              WR++
              break
            case 'TE':
              if (TE < 1) {
                thisisme.testPlayers.push(player)
              }
              TE++
              break
            case 'PK':
              if (PK < 1) {
                thisisme.testPlayers.push(player)
              }
              PK++
              break
            case 'DEF':
              if (DEF < 1) {
                thisisme.testPlayers.push(player)
              }
              DEF++
              break
            default:
              console.log('default switch block')
          }
        })
      }
    },
    mounted () {
      console.log('This is me')
      this.setUp()
    }
  }
</script>
