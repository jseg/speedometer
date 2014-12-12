function Tabs (tripTimeListener, tripDistanceListener, clockListener,
    maxSpeedListener, averageSpeedListener, settingsListener, altitudeListener) {

    var page = 1

    var tripDistanceTab = TripDistanceTab(function () {

        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        altitudeTab.deselect()

        tripDistanceTab.select()
        tripDistanceListener()

    })

    var tripTimeTab = TripTimeTab(function () {

        tripDistanceTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        altitudeTab.deselect()

        tripTimeTab.select()
        tripTimeListener()

    })

    var clockTab = ClockTab(function () {

        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        altitudeTab.deselect()

        clockTab.select()
        clockListener()

    })

    var maxSpeedTab = MaxSpeedTab(function () {

        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        altitudeTab.deselect()

        maxSpeedTab.select()
        maxSpeedListener()

    })

    var averageSpeedTab = AverageSpeedTab(function () {

        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        settingsTab.deselect()
        altitudeTab.deselect()

        averageSpeedTab.select()
        averageSpeedListener()

    })

    var settingsTab = SettingsTab(function () {

        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        altitudeTab.deselect()

        settingsTab.select()
        settingsListener()

    })

    var altitudeTab = AltitudeTab(function () {

        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()

        altitudeTab.select()
        altitudeListener()

    })

    var page1Tab = Page1Tab(function () {
        if (page != 1) {
            page = 1
            page2Tab.deselect()
            element.removeChild(altitudeTab.element)
            element.removeChild(settingsTab.element)
            element.removeChild(clockTab.element)
            element.appendChild(tripDistanceTab.element)
            element.appendChild(tripTimeTab.element)
            element.appendChild(maxSpeedTab.element)
            element.appendChild(averageSpeedTab.element)
        }
        tripDistanceTab.highlight()
        tripTimeTab.highlight()
        maxSpeedTab.highlight()
        averageSpeedTab.highlight()
    })

    var page2Tab = Page2Tab(function () {
        if (page != 2) {
            page = 2
            page1Tab.deselect()
            element.removeChild(tripDistanceTab.element)
            element.removeChild(tripTimeTab.element)
            element.removeChild(maxSpeedTab.element)
            element.removeChild(averageSpeedTab.element)
            element.appendChild(altitudeTab.element)
            element.appendChild(settingsTab.element)
            element.appendChild(clockTab.element)
        }
        altitudeTab.highlight()
        settingsTab.highlight()
        clockTab.highlight()
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
