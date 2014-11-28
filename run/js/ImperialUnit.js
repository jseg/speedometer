function ImperialUnit () {
    return {
        key: 'imperial',
        distanceLabel: 'M',
        speedLabel: 'M/H',
        fix: function (n) {
            return n
        },
    }
}
