function TripDistance () {

    var prevPosition = null
    var value = 0

    return {
        add: function (position) {
            if (prevPosition) {
                value += DistanceBetweenPositions(prevPosition, position)
            }
            prevPosition = position
        },
        get: function () {
            return value
        },
        reset: function () {
            prevPosition = null
            value = 0
        },
        start: function () {
            prevPosition = null
        },
    }

}
