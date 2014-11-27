function Tabs (tripTimeListener, tripDistanceListener,
    clockListener, maxSpeedListener, averageSpeedListener, settingsListener) {

    var tripDistanceTab = TripDistanceTab(function () {
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        tripDistanceListener()
    })

    var tripTimeTab = TripTimeTab(function () {
        tripDistanceTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        tripTimeListener()
    })

    var clockTab = ClockTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        clockListener()
    })

    var maxSpeedTab = MaxSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        maxSpeedListener()
    })

    var averageSpeedTab = AverageSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        settingsTab.deselect()
        averageSpeedListener()
    })

    var settingsTab = SettingsTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsListener()
    })

    var classPrefix = 'Tabs'

    var row1Element = Div(classPrefix + '-row1')
    row1Element.appendChild(tripDistanceTab.element)
    row1Element.appendChild(tripTimeTab.element)
    row1Element.appendChild(clockTab.element)

    var row2Element = Div(classPrefix + '-row2')
    row2Element.appendChild(maxSpeedTab.element)
    row2Element.appendChild(averageSpeedTab.element)
    row2Element.appendChild(settingsTab.element)

    var element = Div(classPrefix)
    element.appendChild(row1Element)
    element.appendChild(row2Element)

    return { element: element }

}
