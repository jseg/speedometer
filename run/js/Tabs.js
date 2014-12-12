function Tabs (tripTimeListener, tripDistanceListener, clockListener,
    maxSpeedListener, averageSpeedListener, settingsListener, altitudeListener) {

    function showTab (tab) {
        element.appendChild(tab.element)
        tab.highlight()
    }

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
            showTab(tripDistanceTab)
            showTab(tripTimeTab)
            showTab(maxSpeedTab)
            showTab(averageSpeedTab)
        }
    })

    var page2Tab = Page2Tab(function () {
        if (page != 2) {
            page = 2
            page1Tab.deselect()
            element.removeChild(tripDistanceTab.element)
            element.removeChild(tripTimeTab.element)
            element.removeChild(maxSpeedTab.element)
            element.removeChild(averageSpeedTab.element)
            showTab(altitudeTab)
            showTab(settingsTab)
            showTab(clockTab)
        }
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
