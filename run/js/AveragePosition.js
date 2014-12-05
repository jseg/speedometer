function AveragePosition (positions) {

    var averageCoords = {
        latitude: 0,
        longitude: 0,
    }
    positions.forEach(function (position) {
        averageCoords.latitude += position.coords.latitude
        averageCoords.longitude += position.coords.longitude
    })
    averageCoords.latitude /= positions.length
    averageCoords.longitude /= positions.length

    return { coords: averageCoords }

}
