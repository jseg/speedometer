function Tabs (tripTimeListener, tripDistanceListener,
    clockListener, maxSpeedListener, averageSpeedListener, settingsListener) {

    var tripDistanceTab = TripDistanceTab(function () {
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        elevationTab.deselect()
        tripDistanceListener()
    })

    var tripTimeTab = TripTimeTab(function () {
        tripDistanceTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        elevationTab.deselect()
        tripTimeListener()
    })

    var clockTab = ClockTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        elevationTab.deselect()
        clockListener()
    })

    var maxSpeedTab = MaxSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        elevationTab.deselect()
        maxSpeedListener()
    })

    var averageSpeedTab = AverageSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        settingsTab.deselect()
        elevationTab.deselect()
        averageSpeedListener()
    })

    var settingsTab = SettingsTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        elevationTab.deselect()
        settingsListener()
    })

    var page1Tab = Page1Tab(function () {
        page2Tab.deselect()
        element.removeChild(elevationTab.element)
        element.removeChild(settingsTab.element)
        element.removeChild(clockTab.element)
        element.appendChild(tripDistanceTab.element)
        element.appendChild(tripTimeTab.element)
        element.appendChild(maxSpeedTab.element)
        element.appendChild(averageSpeedTab.element)
    })
    page1Tab.select()

    var page2Tab = Page2Tab(function () {
        page1Tab.deselect()
        element.removeChild(tripDistanceTab.element)
        element.removeChild(tripTimeTab.element)
        element.removeChild(maxSpeedTab.element)
        element.removeChild(averageSpeedTab.element)
        element.appendChild(elevationTab.element)
        element.appendChild(settingsTab.element)
        element.appendChild(clockTab.element)
    })

    var elevationTab = ElevationTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
    })

    var classPrefix = 'Tabs'

    var element = Div(classPrefix)
    element.appendChild(tripDistanceTab.element)
    element.appendChild(tripTimeTab.element)
    element.appendChild(maxSpeedTab.element)
    element.appendChild(averageSpeedTab.element)
    element.appendChild(page1Tab.element)
    element.appendChild(page2Tab.element)

    return { element: element }

}
