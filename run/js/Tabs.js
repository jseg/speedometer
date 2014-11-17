function Tabs () {

//    var maxSpeedTab = MaxSpeedTab()

    var tripTimeTab = TripTimeTab()

    var tripDistanceTab = TripDistanceTab()

    var clockTab = ClockTab()

    var element = Div('Tabs')
    element.appendChild(tripDistanceTab)
    element.appendChild(tripTimeTab)
//    element.appendChild(maxSpeedTab.element)
    element.appendChild(clockTab)

    return { element: element }

}
