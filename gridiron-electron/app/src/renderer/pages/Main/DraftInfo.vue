<template>
  <div id="app-draftInfo">
    <div class="main-cnt">
      <el-row :gutter="20">
        <el-col :span="12" :offset="2">
          <p style="color:black;font-size:18px;">Create a Draft</p>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form :model="draftInfoForm" ref="draftInfoForm" label-width="150px" class="demo-ruleForm">
            <el-form-item
              label="Number of Teams"
              prop="numTeams">
                <el-input-number v-model="draftInfoForm.teams" :min="4" :max="16"></el-input-number>
            </el-form-item>
            <el-form-item
              label="Number of Rounds"
              prop="numRounds">
                <el-input-number v-model="draftInfoForm.rounds" :min="15" :max="20"></el-input-number>
            </el-form-item>
            <el-form-item
              label="Your Pick Number"
              prop="pickNo">
                <el-input-number v-model="draftInfoForm.pickNo" :min="1" :max="16"></el-input-number>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="Snake Draft" prop="isSnake" v-model="draftInfoForm.isSnake"></el-checkbox>
            </el-form-item>
            <el-form-item>
              <router-link :to="{ path: 'login' }" tag="el-button">Back to Login</router-link>
              <el-button type="primary" @click="submitForm(draftInfoForm.teams, draftInfoForm.rounds, draftInfoForm.pickNo, draftInfoForm.isSnake)">Draft</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :offset="2">
          </br><p style="color:black;font-size:18px;">Join a Draft</p>
          <el-form :model="joinDraft" ref="joinDraft" label-width="150px" class="demo-ruleForm">
              <el-form-item label="Draft Key">
                <el-input v-model="joinDraft.key" style="width:50%;"></el-input><el-button type="primary" @click="joinDraftWithKey(joinDraft.key)">Join Draft</el-button>
              </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { firebaseDb } from '../../main.js'
  export default {
    data () {
      return {
        draftInfoForm: {
          teams: 0,
          rounds: 0,
          pickNo: 0,
          isSnake: false
        },
        joinDraft: {
          key: ''
        }
      }
    },
    methods: {
      submitForm (numTeams, numRounds, pick, snake) {
        pick -= 1
        var draftRefs = firebaseDb.ref().child('drafts')
        var pushRef = draftRefs.push()
        var newKey = pushRef.getKey()
        var draftI = {
          rounds: numRounds,
          teams: numTeams,
          pickNo: pick,
          isSnake: snake,
          picks: [],
          teamRoster: []
        }
        pushRef.set({draftInfo: draftI})
        console.log(pushRef.getKey())
        this.$router.push(
          {
            name: 'DRAFT',
            params: {
              'id': newKey
            }
          }
        )
      },
      joinDraftWithKey (draftKey) {
        console.log('draft key: ' + draftKey)
      }
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
