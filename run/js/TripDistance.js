function TripDistance () {

    var value = 0
    var prevPositions = []

    return {
        add: function (newPosition) {

            var prevPosition
            if (prevPositions.length) prevPosition = AveragePosition(prevPositions)

            prevPositions.push(newPosition)
            if (prevPositions.length > 3) prevPositions.shift()

            if (prevPosition) {
                var position = AveragePosition(prevPositions)
                value += DistanceBetweenPositions(prevPosition, position)
            }

        },
        get: function () {
            return value
        },
        reset: function () {
            prevPositions.splice(0)
            value = 0
        },
        start: function () {
            prevPositions.splice(0)
        },
    }

}
