function ImperialUnit () {
    return {
        key: 'imperial',
        distanceLabel: 'MI',
        speedLabel: 'MI/H',
        fix: function (n) {
            return n * 1.609344
        },
    }
}
