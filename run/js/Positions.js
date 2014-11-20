function Positions () {

    var positions = []

    var distance = 0

    return {
        add: function (position) {
            positions.push(position)
            distance += 32435
        },
        distance: function () {
            return distance
        },
        reset: function () {
            positions.splice(0)
        },
    }

}
