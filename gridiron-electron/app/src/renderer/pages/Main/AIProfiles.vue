<template>
<div id="app-aiprofiles">
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-blue-dark">
        <h2>AI Profiles</h2>
      </div>
    </el-col>
  </el-row>
  <el-row class="row-cnt">
    <el-col :span="24">
      <div class="grid-content bg-blue">
        <p>View and create new AI profiles here. You can assign a profile to a team to manage.</p>
      </div>
    </el-col>
  </el-row>

  <el-button type="primary" @click="displayCreateAIProfile()">New AI Profile <i class="el-icon-plus el-icon-right"></i></el-button>
<!-- Popup dialog form to Create AI Profile -->
  <el-dialog title="Create an AI Bot" :visible.sync="dialogTableVisible">
    <el-form :model="createAIForm" ref="createAIForm" label-width="150px" class="demo-signUpForm">
      <el-form-item label="AI Bot Name" prop="AIName">
        <el-input v-model="createAIForm.AIName" style="width:75%;"></el-input>
      </el-form-item>
      <el-form-item label="QB" prop="numQB">
        <el-input-number v-model="createAIForm.numQB" @change="handleChange" :min="1" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="RB" prop="numRB">
        <el-input-number v-model="createAIForm.numRB" @change="handleChange" :min="2" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="WR" prop="numWR">
        <el-input-number v-model="createAIForm.numWR" @change="handleChange" :min="2" :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="TE" prop="numTE">
        <el-input-number v-model="createAIForm.numTE" @change="handleChange" :min="1" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="PK" prop="numPK">
        <el-input-number v-model="createAIForm.numPK" @change="handleChange" :min="1" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="DEF" prop="numDEF">
        <el-input-number v-model="createAIForm.numDEF" @change="handleChange" :min="1" :max="5"></el-input-number>
      </el-form-item>
      <el-form-item label="Team Focus" prop="teamFocus">
        <el-select v-model="createAIForm.teamFocus" placeholder="Select Team Focus">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upload('createAIForm.teamFocus')">Upload</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-row class="row-cnt">
    <el-col :span="24">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="400">
        <el-table-column width="160px"
          fixed
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column width="90px"
          prop="displayQB"
          label="# of QB">
        </el-table-column>
        <el-table-column width="90px"
          prop="displayRB"
          label="# of RB">
        </el-table-column>
        <el-table-column width="90px"
          prop="displayWR"
          label="# of WR">
        </el-table-column>
        <el-table-column width="90px"
          prop="displayTE"
          label="# of TE">
        </el-table-column>
        <el-table-column width="90px"
          prop="displayPK"
          label="# of PK">
        </el-table-column>
        <el-table-column width="94px"
          prop="displayDEF"
          label="# of DEF">
        </el-table-column>
        <el-table-column width="153px"
          prop="focus"
          label="Team Focus">
        </el-table-column>
        <el-table-column width="111px"
          fixed="right"
          label="Operations">
          <template scope="scope">
            <!--el-button @click="dialogFormVisible = true" type="text" size="small">Edit</el-button-->
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">Delete</el-button>            
            <!--el-dialog title="AI Profile" v-model="dialogFormVisible">
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
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
              </span-->
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
//  import { firebase, firebaseDb } from '../../main.js'
//  var userRef
  export default {
    methods: {
      setUp () {
/*        var thisisme = this
        userRef = firebaseDb.ref('user/' + firebase.auth().currentUser.uid)
        userRef.once('value').then(function (snapshot) {
          thisisme.tableData = snapshot.val().aiProfile.profiles
        })
*/
        console.log('in setUp()')
      },
      handleClick (index, row) {
        console.log(index, row.get(index))
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      displayCreateAIProfile () {
        this.dialogTableVisible = true
        console.log('in displayCreateAIProfile method')
      },
      handleChange (value) {
        console.log(value)
      },
      upload () {
        var profile = {name: this.createAIForm.AIName, displayQB: this.createAIForm.numQB, displayRB: this.createAIForm.numRB, displayWR: this.createAIForm.numWR, displayTE: this.createAIForm.numTE, displayPK: this.createAIForm.numPK, displayDEF: this.createAIForm.numDEF, focus: this.createAIForm.teamFocus}
        this.tableData.push(profile)
        this.dialogTableVisible = false
/*        var updates = {}
        updates['/aiProifile/profiles'] = this.tableData
        userRef.update(updates)
*/
        console.log('focus is: ' + this.createAIForm.teamFocus)
        console.log('in upload() method')
      }
    },
    mounted () {
      this.setUp()
    },
    data () {
      return {
        dialogTableVisible: false,
        createAIForm: {
          AIName: '',
          numQB: '',
          numRB: '',
          numWR: '',
          numTE: '',
          numPK: '',
          numDEF: '',
          teamFocus: ''
        },
        tableData: [
          {
            name: '',
            displayQB: '',
            displayRB: '',
            displayWR: '',
            displayTE: '',
            displayPK: '',
            displayDEF: '',
            focus: ''
          }
        ],
        dialogFormVisible: false,

        options: [{
          value: 'None',
          label: 'None'
        }, {
          value: 'Run Focus',
          label: 'Run Focus'
        }, {
          value: 'Pass Focus',
          label: 'Pass Focus'
        }]
//        value: ''
      }
    }
  }
</script>
