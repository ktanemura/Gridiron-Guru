<template>
  <div class="app-fantasylist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h2>Weekly Reports</h2>
          </div>
        </el-col>
      </el-row>

    <el-table
      :data="tableData"
      border
      style="width: 100%">

    <el-table-column
      prop="season"
      label="Season"
      width="180">
    </el-table-column>


    <el-table-column
      prop="week"
      label="Week"
      width="180">
    </el-table-column>
    <el-table-column
      prop="result"
      label="Result"
      width="230">
    </el-table-column>
    <el-table-column
      label="Options">

      <template scope="scope">
<!-- Form popup button for View-->
<el-button size="small" type="primary" @click="dialogFormVisible = true">View</el-button>

<el-dialog title="Report" v-model="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="View" :label-width="formLabelWidth">
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
    <!--el-button @click="dialogFormVisible = false">Cancel</el-button-->
    <el-button type="primary" @click="dialogFormVisible = false">Done</el-button>
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
          season: 2016,
          week: 4,
          result: 'W',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          season: 2016,
          week: 3,
          result: 'W',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          season: 2016,
          week: 2,
          result: 'L',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          season: 2016,
          week: 1,
          result: 'W',
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


