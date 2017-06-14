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
    <!--el-col :span="12">
      <div class="grid-content bg-blue">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Profile Stats</span>
          </div>
          <p>Profile stats here</p>
        </el-card>
      </div>
    </el-col-->
  </el-row>

  <el-button type="primary" @click="displayCreateAIProfile()">Create AI Profile</el-button>
<!-- Popup dialog form to Create AI Profile -->
  <el-dialog title="Select Min and Max for # of Players" :visible.sync="dialogTableVisible">
    <el-form :model="createAIForm" ref="createAIForm" label-width="150px" class="demo-signUpForm">
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
      <el-form-item>
        <el-button type="primary" @click="upload()">Upload</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

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
          prop="aggression"
          label="Risk Tendency">
        </el-table-column>
        <el-table-column
          prop="trading"
          label="Make Trades"
          :filters="[{ text: 'True', value: 'True' }, { text: 'False', value: 'False' }]"
          :filter-method="filterTag">
          <template scope="scope">
            <el-tag
              :type="scope.row.trading === 'True' ? 'success' : 'danger'"
              close-transition>{{scope.row.trading}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="focus"
          label="Team Focus">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations">
          <template scope="scope">
            <!--el-button @click="dialogFormVisible = true" type="text" size="small">Edit</el-button-->
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">Delete</el-button>            
            <el-dialog title="AI Profile" v-model="dialogFormVisible">
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
      displayCreateAIProfile () {
        this.dialogTableVisible = true
        console.log('in displayCreateAIProfile method')
      },
      handleChange (value) {
        console.log(value)
      },
      upload () {
        console.log('in upload() method')
      }
    },
    data () {
      return {
        dialogTableVisible: false,
        createAIForm: {
          numQB: '',
          numRB: '',
          numWR: '',
          numTE: '',
          numPK: '',
          numDEF: ''
        },
        tableData: [
          {
            name: 'The Brady Bot',
            aggression: 7,
            trading: 'True',
            focus: 'Run Heavy'
          },
          {
            name: 'Predicti-ball',
            aggression: 4,
            trading: 'True',
            focus: 'Arial Attack'
          },
          {
            name: 'Gridiron Guru',
            aggression: 8,
            trading: 'True',
            focus: 'Twin TE'
          },
          {
            name: 'Smashmouth',
            aggression: 3,
            trading: 'False',
            focus: 'Run Heavy'
          },
          {
            name: 'Weekend Warrior',
            aggression: 5,
            trading: 'False',
            focus: 'Run Heavy'
          },
          {
            name: 'The Admiral',
            aggression: 10,
            trading: 'False',
            focus: 'Arial Attack'
          },
          {
            name: 'Turtle',
            aggression: 2,
            trading: 'True',
            focus: 'Run Heavy'
          }
        ],
        dialogFormVisible: false,
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
