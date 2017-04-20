<template>
  <div class="app-fantasylist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
       <p align=right>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-button type="primary" icon="setting"></el-button>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Settings</el-dropdown-item>
            <el-dropdown-item>Account Management</el-dropdown-item>
            <el-dropdown-item>Draft Advisor</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
       </p>
          <div class="grid-content bg-blue-dark">
            <h2>Fantasy List</h2>
          </div>
        </el-col>
      </el-row>


    <el-table
      :data="tableData"
      border
      style="width: 100%">

    <el-table-column
      prop="team"
      label="Team"
      width="180">
    </el-table-column>


    <el-table-column
      prop="league"
      label="League"
      width="180">
      <!--template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>League: {{ scope.row.league }}</p>
          <p>Addr: {{ scope.row.address }}</p>
          <div slot="reference" class="league-wrapper">
            <el-tag>{{ scope.row.league }}</el-tag>
          </div>
        </el-popover>
      </template-->
    </el-table-column>


    <el-table-column
      prop="win"
      label="Wins"
      width="90">
    </el-table-column>
    <el-table-column
      prop="lose"
      label="Losses"
      width="90">
    </el-table-column>
    <el-table-column
      prop="status"
      label="AI Status"
      width="230">
    </el-table-column>

    <el-table-column
      label="Options">
      <template scope="scope">


        <el-button
          size="small"
          type="info"
          @click="handleReportAdvise(scope.$index, scope.row)">Report/Advise</el-button>

<!-- Form popup button for Edit AI-->
<el-button size="small" type="success" @click="dialogFormVisible = true">Edit/Add AI</el-button>

<el-dialog title="Team AI" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="AI Profile" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="Please select AI Profile">
        <el-option label="The Brady Bot" value="bradyBot"></el-option>
        <el-option label="Predicti-Ball" value="predictiBall"></el-option>
        <el-option label="Weekend Warrior" value="weekendWarrior"></el-option>
        <el-option label="None" value="noAI"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Management Type" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="Please select Management Type">
        <el-option label="Manage" value="manage"></el-option>
        <el-option label="Advise" value="advise"></el-option>
        <el-option label="None" value="noManage"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">Submit</el-button>
  </span>
</el-dialog>

      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        formLabelWidth: '130px',

        tableData: [{
          team: 'Happy Campers',
          league: 'Extraordinary Bots',
          win: 0, 
          lose: 2,
          status: 'The Brady Bot (Managing)',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          team: 'Winnerz',
          league: 'Extraordinary Bots',
          win: 2,
          lose: 1,
          status: 'Predicti-Ball (Managing)',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          team: 'Sports Illustrated',
          league: 'Number One Fans',
          win: 3,
          lose: 1,
          status: 'Weekend Warrior (Advising)',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          team: 'Ballers',
          league: 'Number One Fans',
          win: 4,
          lose: 0,
          status: '(None)',
          address: 'No. 189, Grove St, Los Angeles'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleReportAdvise(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
