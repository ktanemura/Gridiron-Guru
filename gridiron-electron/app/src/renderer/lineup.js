import { firebaseDb } from './main.js'
import { stdFantasy, meanFantasy } from './draft.js'

var bestLineup = function (currentTeam, freeAgents, weekNum = 1) {
  var offensiveStats
  var offenseRef = firebaseDb.ref('offense')
  offenseRef.once('value').then(function (offSnap) {
    offensiveStats = offSnap.val()
    var defenseRef = firebaseDb.ref('players').child('DF')
    defenseRef.once('value').then(function (defSnap) {
      var defensePlayers = defSnap.val()
      var scheduleRef = firebaseDb.ref('schedule')
      scheduleRef.once('value').then(function (schedSnap) {
        var schedule = schedSnap.val()

        var players = currentTeam.concat(freeAgents)
        var posPlayers = {}
        var positions = ['QB', 'RB', 'WR', 'TE', 'PK', 'DEF']
        var pickNums = {
          'QB': 1,
          'RB': 2,
          'WR': 3,
          'TE': 1,
          'DEF': 1,
          'PK': 1,
          'FLEX': 0
        }
        var starters = {}
        for (var i in positions) {
          var pos = positions[i]
          posPlayers[pos] = subsetPosition(players, pos)
          var posStd = stdFantasy(posPlayers[pos], meanFantasy(posPlayers[pos]))
          for (var idx in posPlayers[pos]) {
            var curTeam
            if (pos === 'DEF') {
              curTeam = posPlayers[pos][idx]['Player']
            } else {
              curTeam = posPlayers[pos][idx]['Team']
            }
            var oppTeam = getOpposingTeam(curTeam, weekNum, schedule)
            if (oppTeam === 'BYE') {
              posPlayers[pos][idx]['PredFantasyPoints'] = 0
              continue
            }

            var ownOffStats = getTeam(offensiveStats, curTeam)
            var oppOffStats = getTeam(offensiveStats, oppTeam)
            var ownDefStats = getTeam(defensePlayers, curTeam)
            var oppDefStats = getTeam(defensePlayers, oppTeam)

            var offDiff = ownOffStats['OffPointsPerGame'] - oppOffStats['OffPointsPerGame']
            var defDiff = oppDefStats['PredSeasonPointsAllowed'] - ownDefStats['PredSeasonPointsAllowed']
            var pointDiff = ((offDiff + (defDiff / 2)) / 5) * posStd

            posPlayers[pos][idx]['PredNextGamePoints'] = (posPlayers[pos][idx]['PredFantasyPoints'] + pointDiff) / 16
          }

          starters[pos] = getTopN(posPlayers[pos], pickNums[pos])
          console.log('DONE: ' + starters[pos])
        }

        var flexPlayers = posPlayers['WR'].concat(posPlayers['RB'])
        starters['FLEX'] = getTopN(flexPlayers, pickNums['FLEX'])

        var starterList = []
        for (var pos2 in starters) {
          for (var k = 0; k < starters[pos2].length; k++) {
            console.log(starters[pos2])
            starterList.push(starters[pos2][k])
          }
        }

        console.log(starterList)
        return starterList
      })
    })
  })
}

var getTopN = function (players, N) {
  var topN = []

  for (var i = 0; i < N; i++) {
    var maxIdx = -1
    var maxScr = -999

    for (var idx in players) {
      if (players[idx]['PredNextGamePoints'] > maxScr) {
        maxIdx = idx
        maxScr = players[idx]['PredNextGamePoints']
      }
    }

    topN.push(players[maxIdx])
    players.splice(maxIdx, 1)
  }

  return topN
}

var getTeam = function (data, team) {
  if (team === 'ARZ') {
    team = 'ARI'
  }
  for (var idx in data) {
    if (data.hasOwnProperty(idx)) {
      if (data[idx]['Team'] === team) {
        return data[idx]
      }
      var ply = data[idx]['Player']
      if (ply === 'JAC') {
        ply = 'JAX'
      }
      if (ply === team) {
        return data[idx]
      }
    }
  }
}

var getOpposingTeam = function (team, week, schedule) {
  for (var idx in schedule) {
    if (schedule.hasOwnProperty(idx)) {
      if (schedule[idx]['Week'] === week) {
        if (schedule[idx]['Home'] === team) {
          return schedule[idx]['Away']
        }
        if (schedule[idx]['Away'] === team) {
          return schedule[idx]['Home']
        }
      }
    }
  }

  return 'BYE'
}

var subsetPosition = function (players, position) {
  var posPlayers = []

  for (var player in players) {
    if (players[player]['Position'] === position) {
      posPlayers.push(players[player])
    }
  }

  return posPlayers
}

export {bestLineup}
