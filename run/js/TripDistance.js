function TripDistance () {

    function getAveragePosition () {

        var averageCoords = {
            latitude: 0,
            longitude: 0,
        }
        prevPositions.forEach(function (prevPosition) {
            averageCoords.latitude += prevPosition.coords.latitude
            averageCoords.longitude += prevPosition.coords.longitude
        })
        averageCoords.latitude /= prevPositions.length
        averageCoords.longitude /= prevPositions.length

        return {
            coords: averageCoords,
        }

    }

    var value = 0
    var prevPositions = []

    return {
        add: function (newPosition) {

            var prevPosition
            if (prevPositions.length) prevPosition = getAveragePosition()

            prevPositions.push(newPosition)
            if (prevPositions.length > 3) prevPositions.shift()

            if (prevPosition) {
                var position = getAveragePosition()
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
