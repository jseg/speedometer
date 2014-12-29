function Tabs (tripTimeListener, tripDistanceListener, clockListener,
    maxSpeedListener, averageSpeedListener, settingsListener, altitudeListener,
    headingListener, setDarkTheme, setLightTheme, enableTransition) {

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
    }, setDarkTheme, setLightTheme, enableTransition)

    var tripTimeTab = TripTimeTab(function () {
        select(tripTimeTab)
        tripTimeListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var maxSpeedTab = MaxSpeedTab(function () {
        select(maxSpeedTab)
        maxSpeedListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var averageSpeedTab = AverageSpeedTab(function () {
        select(averageSpeedTab)
        averageSpeedListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var altitudeTab = AltitudeTab(function () {
        select(altitudeTab)
        altitudeListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var headingTab = HeadingTab(function () {
        select(headingTab)
        headingListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var clockTab = ClockTab(function () {
        select(clockTab)
        clockListener()
    }, setDarkTheme, setLightTheme, enableTransition)

    var settingsTab = SettingsTab(function () {
        select(settingsTab)
        settingsListener()
    }, setDarkTheme, setLightTheme, enableTransition)

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
    }, setDarkTheme, setLightTheme, enableTransition)

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
    }, setDarkTheme, setLightTheme, enableTransition)

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

    return {
        element: element,
        enableTransition: function () {
            tabs.forEach(function (tab) {
                tab.enableTransition()
            })
            page1Tab.enableTransition()
            page2Tab.enableTransition()
        },
        setDarkTheme: function () {
            tabs.forEach(function (tab) {
                tab.setDarkTheme()
            })
            page1Tab.setDarkTheme()
            page2Tab.setDarkTheme()
        },
        setLightTheme: function () {
            tabs.forEach(function (tab) {
                tab.setLightTheme()
            })
            page1Tab.setLightTheme()
            page2Tab.setLightTheme()
        },
    }

}
