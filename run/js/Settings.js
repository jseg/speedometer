function Settings () {

    var theme, unit
    try {
        theme = localStorage.theme
        unit = localStorage.unit
    } catch (e) {
    }

    var that = {
        theme: theme,
        unit: unit,
        save: function () {
            try {
                localStorage.theme = that.theme
                localStorage.unit = that.unit
            } catch (e) {
            }
        },
    }

    return that

}
