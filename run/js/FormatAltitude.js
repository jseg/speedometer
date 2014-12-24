function FormatAltitude (altitude, unit) {

    var visualAltitude = Math.floor(unit.fix(altitude))
    visualAltitude = Math.min(999999, Math.max(-99999, visualAltitude))

    var fractionalPart = String(Math.abs(visualAltitude) % 1000)
    if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
    else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart

    integerPart = Math.floor(Math.abs(visualAltitude) / 1000)
    if (visualAltitude < 0) integerPart = '-' + integerPart

    return {
        fractionalPart: fractionalPart,
        integerPart: integerPart,
    }

}
