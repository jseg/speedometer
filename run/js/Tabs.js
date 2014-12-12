function Tabs (tripTimeListener, tripDistanceListener,
    clockListener, maxSpeedListener, averageSpeedListener,
    settingsListener, altitudeListener, headingListener) {

    function select (tab) {
        tabs.forEach(function (itemTab) {
            if (tab != itemTab) itemTab.deselect()
        })
        tab.select()
    }

    var page = 1

    var tripDistanceTab = TripDistanceTab(function () {
        select(tripDistanceTab)
        tripDistanceListener()
    })

    var tripTimeTab = TripTimeTab(function () {
        select(tripTimeTab)
        tripTimeListener()
    })

    var maxSpeedTab = MaxSpeedTab(function () {
        select(maxSpeedTab)
        maxSpeedListener()
    })

    var averageSpeedTab = AverageSpeedTab(function () {
        select(averageSpeedTab)
        averageSpeedListener()
    })

    var altitudeTab = AltitudeTab(function () {
        select(altitudeTab)
        altitudeListener()
    })

    var headingTab = HeadingTab(function () {
        select(headingTab)
        headingListener()
    })

    var clockTab = ClockTab(function () {
        select(clockTab)
        clockListener()
    })

    var settingsTab = SettingsTab(function () {
        select(settingsTab)
        settingsListener()
    })

    var page1Tab = Page1Tab(function () {
        if (page != 1) {
            page = 1
            page2Tab.deselect()
            element.removeChild(altitudeTab.element)
            element.removeChild(headingTab.element)
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
            element.appendChild(headingTab.element)
            element.appendChild(settingsTab.element)
            element.appendChild(clockTab.element)
        }
        altitudeTab.highlight()
        headingTab.highlight()
        settingsTab.highlight()
        clockTab.highlight()
    })

    var tabs = [tripDistanceTab, tripTimeTab, maxSpeedTab,
        averageSpeedTab, altitudeTab, headingTab, clockTab, settingsTab]

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
