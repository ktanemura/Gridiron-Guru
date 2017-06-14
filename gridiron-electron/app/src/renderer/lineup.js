import { firebaseDb } from './main.js'

var bestLineup = function (currentTeam, freeAgents) {
  var offensiveStats
  var defensiveStats
  var schedule
  var lineup = []
  var offenseRef = firebaseDb.ref('offense')
  offenseRef.once('value').then(function (offSnap) {
    offensiveStats = offSnap.val()
    var defenseRef = firebaseDb.ref('defense')
    defenseRef.once('value').then(function (defSnap) {
      defensePlayers = defSnap.val()
      /* Use offensiveStats and defensiveStats here */
      console.log(offensiveStats)
      console.log(defensiveStats)
      var scheduleRef = firebaseDb.ref('schedule')
      scheduleRef.once('value').then(function (schedSnap) {
        schedule = schedSnap.val()
        console.log(offensiveStats)
        console.log(defensiveStats)
        console.log(schedule)
        return lineup
      })
    })
  })
}

export {bestLineup}
