function MetricUnit () {
    return {
        distanceLabel: 'KM',
        speedLabel: 'KM/H',
        fix: function (n) {
            return n * 1.609344
        },
    }
}
