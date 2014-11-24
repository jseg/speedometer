function DistanceBetweenPositions (position1, position2) {

    function toRad (n) {
       return n * Math.PI / 180
    }

    var coords1 = position1.coords,
        coords2 = position2.coords

    var lat1 = toRad(coords1.latitude),
        lon1 = toRad(coords1.longitude)

    var lat2 = toRad(coords2.latitude),
        lon2 = toRad(coords2.longitude)

    var earthRadius = 6371000

    var dLat = lat2 - lat1,
        dLon = lon2 - lon1

    var sinDLat2 = Math.sin(dLat / 2),
        sinDLon2 = Math.sin(dLon / 2)

    var a = sinDLat2 * sinDLat2
        + Math.cos(lat1) * Math.cos(lat2) * sinDLon2 * sinDLon2

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    var d = earthRadius * c

    return d

}
