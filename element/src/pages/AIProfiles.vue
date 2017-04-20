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
    <el-col :span="12">
      <div class="grid-content bg-blue">
        <p>View and create new AI profiles here. You can assign a profile to a team to manage.</p>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-blue">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Profile Stats</span>
          </div>
          <p>Profile stats here</p>
        </el-card>
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
            <el-button @click="handleClick" type="text" size="small">Edit</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">Delete</el-button>
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
      filterTag(value, row) {
        return row.trading === value;
      },
      handleClick() {
        console.log('click');
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
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
          },
        ]
      }
    }
  }
</script>
