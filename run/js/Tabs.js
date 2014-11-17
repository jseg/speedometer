function Tabs (tripTimeListener, tripDistanceListener, clockListener) {

//    var maxSpeedTab = MaxSpeedTab()

    var tripTimeTab = TripTimeTab(tripTimeListener)

    var tripDistanceTab = TripDistanceTab(tripDistanceListener)

    var clockTab = ClockTab(clockListener)

    var element = Div('Tabs')
    element.appendChild(tripDistanceTab)
    element.appendChild(tripTimeTab)
//    element.appendChild(maxSpeedTab.element)
    element.appendChild(clockTab)

    return { element: element }

}
