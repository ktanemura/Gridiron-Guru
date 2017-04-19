<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-blue-dark">
            <h3>AI Profiles</h3>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-blue">
            <p>View and create new AI profiles here. You can assign a profile to a team to manage.</p>
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
              fixed
              prop="date"
              label="Date"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="Name"
              width="120">
            </el-table-column>
            <el-table-column
              prop="state"
              label="State"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="City"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="Address"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="Zip"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Operations"
              width="120">
              <template scope="scope">
                <el-button @click="handleClick" type="text" size="small">Detail</el-button>
                <el-button type="text" size="small">Edit</el-button>
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
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Home'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }]
      }
    }
  }
</script>