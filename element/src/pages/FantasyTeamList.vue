<template>
  <div class="app-fantasyteamlist">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h2>Fantasy Team List</h2>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-blue">
            <p>View the Fantasy Team List here.</p>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-blue">
            <p>Profile stats here</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height="250">
            <el-table-column
              prop="team"
              label="Team">
            </el-table-column>
            <el-table-column
              prop="league"
              label="League">
            </el-table-column>
            <el-table-column
              prop="wins"
              label="Wins">
            </el-table-column>
            <el-table-column
              prop="losses"
              label="Losses">
            </el-table-column>
            <el-table-column
              prop="status"
              label="AI Status">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Options">
              <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">Reports</el-button>
                <el-button type="text" size="small">Edit AI</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        console.log('click');
      }
    },
    data() {
      return {
        tableData: [
          {
            team: 'Professional Winners',
            league: 'The League of Extraordinary Bots',
            wins: 1,
            losses: 4,
            status: 'The Brady Bot (Managing)'
          },
          {
            team: 'Ballers',
            league: 'The League of Extraordinary Bots',
            wins: 3,
            losses: 0,
            status: 'Predicti-Ball (Advising)'
          },
          {
            team: 'The Greatest',
            league: 'The League of Extraordinary Bots',
            wins: 6,
            losses: 0,
            status: 'Twin TE'
          },
          {
            team: 'Snakes n Ladders',
            league: 3,
            wins: 1,
            losses: 3,
            status: ''
          },
          {
            team: 'Sportz',
            league: 5,
            wins: 4,
            losses: 0,
            status: 'Run Heavy'
          },
          {
            team: 'The Besties',
            league: 10,
            wins: 3,
            losses: 1,
            status: 'Arial Attack'
          },
          {
            team: 'Cool Beans',
            league: 2,
            wins: 0,
            losses: 2,
            status: 'None'
          },
        ]
      }
    }
  }
</script>
