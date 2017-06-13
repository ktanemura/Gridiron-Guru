var recommendPlayers = function (teamPlayers, undraftedPlayers) {
  var zScales = {
    'QB': 1.45,
    'RB': 1.05,
    'WR': 2.70,
    'TE': 1.10,
    'PK': 1.1,
    'DEF': 1.1
  }

  var idealDist = {
    'QB': 1,
    'RB': 5,
    'WR': 5,
    'TE': 1,
    'PK': 0,
    'DEF': 0
  }

  var draftPriority = {
    'QB': 3.0,
    'RB': 5.0,
    'WR': 5.0,
    'TE': 3.0,
    'PK': 1.0,
    'DEF': 1.0
  }

  var rosterDist = calcRosterDist(teamPlayers)
  var neededDist = calcNeededDist(idealDist, rosterDist)

  var posPlayers = {}
  var rightSkew = {}

  var minSkew = 999
  var maxSkew = -999
  for (var position in rosterDist) {
    if (position === 'DEF') {
      continue
    }
    posPlayers[position] = sortFantasy(subsetPosition(undraftedPlayers, position))
    var posStd = stdFantasy(posPlayers[position], meanFantasy(posPlayers[position]))
    rightSkew[position] = calcRightSkewness(getTierCounts(posPlayers[position], posStd))
    if (rightSkew[position] < minSkew) {
      minSkew = rightSkew[position]
    }
    if (rightSkew[position] > maxSkew) {
      maxSkew = rightSkew[position]
    }
  }

  var playerValues = []
  for (var pos in rightSkew) {
    var normSkew = 1 - ((rightSkew[pos] + minSkew) / (maxSkew - minSkew))
    var posMetric = (neededDist[pos] / idealDist[pos]) * draftPriority[pos] * normSkew
    playerValues = playerValues.concat(getDraftValue(posPlayers[pos], zScales[pos], posMetric))
  }

  var top3 = getTopN(playerValues, 15)
  for (var k in top3) {
    console.log(top3[k]['Player'])
    console.log(top3[k]['Position'])
    console.log(top3[k]['PredFantasyPoints'])
    console.log(top3[k]['DraftValue'])
  }

  return top3
}

var getDraftValue = function (players, zScalar, posMetric) {
  var mean = meanFantasy(players)
  var std = stdFantasy(players, mean)

  for (var idx in players) {
    var zScore = (players[idx]['PredFantasyPoints'] - mean) / std
    players[idx]['DraftValue'] = zScore * zScalar * posMetric
  }

  return players
}

var getTopN = function (playerValues, N) {
  var topN = []

  for (var i = 0; i < N; i++) {
    var maxIdx = -1
    var maxScr = -999

    for (var idx in playerValues) {
      if (playerValues[idx]['DraftValue'] > maxScr) {
        maxIdx = idx
        maxScr = playerValues[idx]['DraftValue']
      }
    }

    topN.push(playerValues[maxIdx])
    playerValues.splice(maxIdx, 1)
  }

  return topN
}

var calcRightSkewness = function (tierCounts, numParticipants = 6) {
  var score = 0
  var len = tierCounts.length - 1

  for (var n = 0; n < len; n++) {
    score += calcTierSkewness(tierCounts) * calcSum(tierCounts)
    tierCounts.pop()
  }

  return score
}

var calcTierSkewness = function (tierCounts, numParticipants = 6) {
  var resids = 0
  var fullDist = []

  for (var i = 0; i < tierCounts.length; i++) {
    for (var j = 0; j < tierCounts[i]; j++) {
      fullDist.push(i + 1)
    }
  }

  var meanTier = calcMean(fullDist)
  var stdTier = calcStd(fullDist)

  for (i = 0; i < fullDist.length; i++) {
    resids += Math.pow((fullDist[i] - meanTier), 3)
  }

  return resids / Math.pow(stdTier, 3)
}

var calcSum = function (list) {
  var total = 0

  for (var i in list) {
    total += list[i]
  }

  return total
}

var calcMean = function (list) {
  return calcSum(list) / list.length
}

var calcStd = function (list) {
  var resids = 0
  var mean = calcMean(list)

  for (var i in list) {
    resids += Math.pow(list[i] - mean, 2)
  }

  return Math.sqrt(resids / list.length)
}

var getTierCounts = function (sortedPlayers, std, minTiers = 4, numParticipants = 6) {
  var betweenTiers = Math.sqrt(std)

  do {
    var tierCounts = []
    var curTier = 1
    var prevPoints = 999
    var count = 0

    for (var player in sortedPlayers) {
      if (prevPoints - sortedPlayers[player]['PredFantasyPoints'] > betweenTiers) {
        curTier++
        tierCounts.push(1)
      } else {
        tierCounts[curTier - 2]++
      }

      prevPoints = sortedPlayers[player]['PredFantasyPoints']
      count++
      if (count >= numParticipants * 2) {
        break
      }
    }
    betweenTiers *= 0.85
  } while (tierCounts.length < minTiers)

  return tierCounts
}

var sortFantasy = function (players) {
  var compare = function (a, b) {
    if (a['PredFantasyPoints'] < b['PredFantasyPoints']) {
      return 1
    }
    if (a['PredFantasyPoints'] > b['PredFantasyPoints']) {
      return -1
    }
    return 0
  }

  players.sort(compare)
  return players
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

var stdFantasy = function (players, mean) {
  var total = 0
  var n = 0

  for (var player in players) {
    total += Math.pow((players[player]['PredFantasyPoints'] - mean), 2)
    n++
  }

  return Math.sqrt(total / n)
}

var meanFantasy = function (players) {
  var total = 0
  var n = 0

  for (var player in players) {
    total += players[player]['PredFantasyPoints']
    n += 1
  }

  return total / n
}

var calcNeededDist = function (idealDist, rosterDist) {
  var neededDist = {
    'QB': 0,
    'RB': 0,
    'WR': 0,
    'TE': 0,
    'PK': 0,
    'DEF': 0
  }

  for (var position in rosterDist) {
    neededDist[position] = idealDist[position] - rosterDist[position]
  }

  return neededDist
}

var calcRosterDist = function (teamPlayers) {
  var rosterDist = {
    'QB': 0,
    'RB': 0,
    'WR': 0,
    'TE': 0,
    'PK': 0,
    'DEF': 0
  }

  for (var player in teamPlayers) {
    rosterDist[teamPlayers[player]['Position']] = rosterDist[teamPlayers[player]['Position']] + 1
  }

  return rosterDist
}

export {recommendPlayers}
