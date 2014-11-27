function Tabs (tripTimeListener, tripDistanceListener, clockListener) {

    var tripDistanceTab = TripDistanceTab(function () {
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        tripDistanceListener()
    })

    var tripTimeTab = TripTimeTab(function () {
        tripDistanceTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        tripTimeListener()
    })

    var clockTab = ClockTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        maxSpeedTab.deselect()
        clockListener()
    })

    var maxSpeedTab = MaxSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        //maxSpeedListener()
    })

    var classPrefix = 'Tabs'

    var row1Element = Div(classPrefix + '-row1')
    row1Element.appendChild(tripDistanceTab.element)
    row1Element.appendChild(tripTimeTab.element)
    row1Element.appendChild(clockTab.element)

    var row2Element = Div(classPrefix + '-row2')
    row2Element.appendChild(maxSpeedTab.element)

    var element = Div(classPrefix)
    element.appendChild(row1Element)
    element.appendChild(row2Element)

    return { element: element }

}
