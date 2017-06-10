<template>
<div id="app-leagues">
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-blue-dark">
        <h2>Leagues</h2>
      </div>
    </el-col>
  </el-row>
  <el-row class="row-cnt">
    <el-col :span="24">
      <div class="grid-content bg-blue">
        <p>View and create new Leagues.</p>
      </div>
    </el-col>
  </el-row>
  <el-row class="row-cnt">
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="250">
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          label="Teams">
          <template scope="scope">
            {{ scope.row.joined }} / {{ scope.row.leagueInfo.teams }}
          </template>
        </el-table-column>
        <el-table-column
          label="Snake"
          :filters="[{ text: 'True', value: 'True' }, { text: 'False', value: 'False' }]"
          :filter-method="filterTag">
          <template scope="scope">
            <el-tag
              :type="scope.row.leagueInfo.isSnake === 'true' ? 'success' : 'danger'"
              close-transition>{{ scope.row.leagueInfo.isSnake }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="leagueInfo.rounds"
          label="Rounds">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations">
          <template scope="scope">
            <el-button @click.native.prevent="join(scope.$index, tableData)" type="text" size="small">Join</el-button>
            <el-button @click.native.prevent="draft(scope.$index, tableData)" type="text" size="small">Draft</el-button>
            <el-dialog title="Join" v-model="joinDialogFormVisible">
              <el-form :model="form">
                <el-form-item label="Promotion name" :label-width="formLabelWidth">
                  <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Zones" :label-width="formLabelWidth">
                  <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai"></el-option>
                    <el-option label="Zone No.2" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="joinDialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="joinDialogFormVisible = false">Confirm</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import { firebaseDb, firebase } from '../../main.js'

  var leaguesRef
  var userLeaguesRef
  var thisVue
  // var draftsRef

  export default {
    methods: {
      filterTag (value, row) {
        return row.trading === value
      },
      handleClick (index, row) {
        console.log(index, row.get(index))
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      join (index, rows) {
        console.log('join league')
        console.log(rows[index])
        var league = rows[index]
        var uid = firebase.auth().currentUser.uid

        var updates = {}
        updates['/' + uid] = { team: 'My Team' }

        userLeaguesRef.child(league.id).update(updates)
      },
      draft (index, rows) {
        console.log('draft league')
      },
      setUp () {
        thisVue = this

        leaguesRef = firebaseDb.ref('/leagues')
        userLeaguesRef = firebaseDb.ref('/userLeagues')
        // draftsRef = firebaseDb.ref('/drafts')

        leaguesRef.once('value').then(function (leaguesSnapshot) {
          Object.keys(leaguesSnapshot.val()).forEach(function (leagueId) {
            var league = {}
            leaguesRef.child(leagueId).once('value').then(function (leagueSnapshot) {
              league = leagueSnapshot.val()
              league['id'] = leagueId
              userLeaguesRef.child(leagueId).once('value').then(function (ulSnapshot) {
                league['joined'] = ulSnapshot.numChildren()
                console.log(league)
                thisVue.tableData.push(league)
              })
            })
          })
        })
      }
    },
    mounted () {
      this.setUp()
    },
    data () {
      return {
        tableData: [],
        joinDialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    }
  }
</script>
