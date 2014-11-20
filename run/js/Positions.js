function Positions () {

    var positions = []

    return {
        add: function (position) {
            positions.push(position)
        },
        reset: function () {
            positions.splice(0)
        },
    }

}
