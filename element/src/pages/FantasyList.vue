<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h3>Fantasy Team List</h3>
          </div>
        </el-col>
      </el-row>
<el-row class="block-col-2">
  <el-col :span="12">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-button type="primary" icon="setting"></el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
          size="small" type="success"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
