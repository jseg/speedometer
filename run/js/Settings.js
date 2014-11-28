function Settings () {

    var unit
    try {
        unit = localStorage.unit
    } catch (e) {
    }

    var that = {
        unit: unit,
        save: function () {
            try {
                localStorage.unit = that.unit
            } catch (e) {
            }
        },
    }

    return that

}
