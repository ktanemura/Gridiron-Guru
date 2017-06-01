<template>
  <div id="draft">
    <main-header></main-header>
    <div class="main-cnt">
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
                  :default-sort="{prop: 'points', order: 'descending'}"
                  max-height="350"
                  border
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template scope="props">
                      <template v-if="props.row.position === 'QB'">
                        <p>Passing Yards: {{props.row.passingyds}}</p>
                        <p>Passing TDs: {{props.row.passingtd}}</p>
                      </template>
                      <template v-if="props.row.position === 'RB'">
                        <p>Rushing Yards: {{props.row.rushingyds}}</p>
                        <p>Rushing TDs {{props.row.rushingtd}}</p>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="Name">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="Position"
                    :filters="[{ text: 'QB', value: 'QB' }, { text: 'RB', value: 'RB' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                  </el-table-column>
                  <el-table-column
                    prop="points"
                    label="Projected Points"
                    sortable>
                  </el-table-column>
                  <el-table-column
                    prop="actions"
                    label="Actions">
                    <template scope="undrafted">
                    <el-button @click="draftPlayer(undrafted.$index, players)"
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
  import { firebaseDb } from '../main.js'
  
  var draftRef
  var numTeams
  var numRounds
//  var pickNumber
  var isSnake
  var draftId
  var teams
  var pickDir
  var curTeam
  var curRound
  var curPick
  var overallPick

  export default {
    data () {
      return {
        tableTab: 'first',
        picks: [],
        players: [
          {
            name: 'Tom Brady',
            position: 'QB',
            points: 10000,
            passingyds: 20000,
            passingtd: 30
          },
          {
            name: 'David Johnson',
            position: 'RB',
            points: 9000,
            rushingyds: 10000,
            rushingtd: 10
          }
        ]
      }
    },
    methods: {
      filterTag (value, row) {
        return row.position === value
      },
      draftPlayer (index, players) {
        var toDraft = players[index]
        players.splice(index, 1)
        teams[curTeam].push(toDraft)

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
          player: toDraft.name,
          team: curTeam
        }

        this.picks.push(pick)
        curPick += 1
        overallPick += 1

        console.log(pick)
        var updates = {}
        updates['/picks'] = this.picks
        draftRef.update(updates)
        if (curPick > numTeams) {
          curPick = 1
          curRound += 1
        }

        if (curRound > numRounds) {
          this.$router.push('/login')
        }
      },
      setUp () {
        draftId = this.$route.params.id
        draftRef = firebaseDb.ref('drafts/' + draftId)

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
        draftRef.child('draftInfo').once('value').then(function(snapshot) {
          pickNumber = snapshot.val().pickNo
        })
*/
        draftRef.child('draftInfo').once('value').then(function (snapshot) {
          isSnake = snapshot.val().isSnake
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
