import { firebaseDb } from './main.js'
var bestLineup = function (currentTeam, freeAgents) {
  var offensiveStats
  var defensiveStats
  var lineup = []
  var offenseRef = firebaseDb.ref('offense')
  offenseRef.once('value').then(function (offSnap) {
    offensiveStats = offSnap.val()
    var defenseRef = firebaseDb.ref('defense')
    defenseRef.once('value').then(function (defSnap) {
      defensiveStats = defSnap.val()
      /* Use offensiveStats and defensiveStats here */
      console.log(offensiveStats)
      console.log(defensiveStats)
      return lineup
    })
  })
}

export {bestLineup}
