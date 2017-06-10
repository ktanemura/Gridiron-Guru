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
        <template scope="scope">

  <!--Report popup-->
  <el-button size="small" type="info" @click="dialogTableVisible = true">Report</el-button>
  <el-dialog title="Report for <team name>" :visible.sync="dialogTableVisible">
   <p style="font-weight: bold;">Weekly Reports</p>
    <el-table :data="weeklyReports" :fit=true height="150">
      <el-table-column property="season" label="Season" width="150"></el-table-column>
      <el-table-column property="week" label="Week" width="200"></el-table-column>
      <el-table-column property="result" label="Result"></el-table-column>
    </el-table>
   <p style="font-weight: bold;">Current Lineup</p>
    <el-table :data="currentLineup" :fit=true height="150">
      <el-table-column property="position" label="Position" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column property="points" label="Points"></el-table-column>
    </el-table>
   <p style="font-weight: bold;"></br>Recommended Lineup</p>
    <el-table :data="recommendedLineup" :fit=true height="150">
      <el-table-column property="position" label="Position" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column property="points" label="Points"></el-table-column>
    </el-table>
  </el-dialog>

        </template>
      </el-table-column>
    </el-table>
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
        dialogTableVisible: false,
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
                    thisisme.teams = t
                  }
                })
              })
            })
          })
        })
      }
    },
    mounted () {
      console.log('This is me')
      this.setUp()
    }
  }
</script>
