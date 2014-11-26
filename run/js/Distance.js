function Distance () {

    var prevPosition
    var distance = 0

    return {
        add: function (position) {
            if (prevPosition) {
                distance += DistanceBetweenPositions(prevPosition, position)
            }
            prevPosition = position
        },
        get: function () {
            return distance
        },
        reset: function () {
            positions.splice(0)
        },
    }

}
