function MainPanel (enableTransition) {

    function setDarkTheme () {

        tripDistancePanel.setDarkTheme()
        tripTimePanel.setDarkTheme()
        maxSpeedPanel.setDarkTheme()
        averageSpeedPanel.setDarkTheme()
        altitudePanel.setDarkTheme()
        headingPanel.setDarkTheme()
        clockPanel.setDarkTheme()
        settingsPanel.setDarkTheme()

        statusPanel.setDarkTheme()
        speedLabel.setDarkTheme()
        tabs.setDarkTheme()

        setDarkThemeTool(classList)
        settings.theme = 'dark'
        settings.save()

    }

    function setDarkThemeTool (classList) {
        classList.remove(lightThemeClass)
        classList.add(darkThemeClass)
    }

    function setImperialUnit () {
        setUnit(imperialUnit)
    }

    function setLightTheme () {

        tripDistancePanel.setLightTheme()
        tripTimePanel.setLightTheme()
        maxSpeedPanel.setLightTheme()
        averageSpeedPanel.setLightTheme()
        altitudePanel.setLightTheme()
        headingPanel.setLightTheme()
        clockPanel.setLightTheme()
        settingsPanel.setLightTheme()

        statusPanel.setLightTheme()
        speedLabel.setLightTheme()
        tabs.setLightTheme()

        setLightThemeTool(classList)
        settings.theme = 'light'
        settings.save()

    }

    function setLightThemeTool (classList) {
        classList.remove(darkThemeClass)
        classList.add(lightThemeClass)
    }

    function setMetricUnit () {
        setUnit(metricUnit)
    }

    function showPanel (panel) {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(panel.element)
        panel.highlight()
    }

    function setSpeed (speed) {
        speedLabel.setSpeed(speed)
        if (started) maxSpeedPanel.setSpeed(speedLabel.getSpeed())
    }

    function setUnit (unit) {
        speedLabel.setUnit(unit)
        tripDistancePanel.setUnit(unit)
        maxSpeedPanel.setUnit(unit)
        averageSpeedPanel.setUnit(unit)
        altitudePanel.setUnit(unit)
        settings.unit = unit.key
        settings.save()
    }

    function update () {
        var time = Date.now()
        requestAnimationFrame(function () {
            tripTimePanel.update()
            clockPanel.update()
            averageSpeedPanel.update()
            setTimeout(update, Math.max(0, time + 1000 - Date.now()))
        })
    }

    function updatePosition (position) {

        if (started) {
            tripDistance.add(position)
            tripDistancePanel.update()
        }

        var coords = position.coords
        setSpeed(coords.speed)

        var accuracy = coords.accuracy
        if (accuracy < 8) statusPanel.setStatus('SIGNAL GOOD')
        else if (accuracy < 16) statusPanel.setStatus('SIGNAL OK')
        else statusPanel.setStatus('SIGNAL WEAK')

        setAltitude(coords.altitude)
        setHeading(coords.heading)
        statusPanel.hideError()

    }

    var darkThemeClass = 'darkTheme',
        lightThemeClass = 'lightTheme'

    var requestAnimationFrame = window.requestAnimationFrame
    if (!requestAnimationFrame) {
        requestAnimationFrame = window.mozRequestAnimationFrame
    }

    var started = false

    var tripDistance = TripDistance()

    var imperialUnit = ImperialUnit(),
        metricUnit = MetricUnit()

    var speedLabel = SpeedLabel(metricUnit,
        setDarkThemeTool, setLightThemeTool, enableTransition)

    var tabs = Tabs(function () {
        showPanel(tripTimePanel)
    }, function () {
        showPanel(tripDistancePanel)
    }, function () {
        showPanel(clockPanel)
    }, function () {
        showPanel(maxSpeedPanel)
    }, function () {
        showPanel(averageSpeedPanel)
    }, function () {
        showPanel(settingsPanel)
    }, function () {
        showPanel(altitudePanel)
    }, function () {
        showPanel(headingPanel)
    }, setDarkThemeTool, setLightThemeTool, enableTransition)

    var tripTimePanel = TripTimePanel(setDarkThemeTool,
        setLightThemeTool, enableTransition)

    var tripDistancePanel = TripDistancePanel(tripDistance,
        metricUnit, setDarkThemeTool, setLightThemeTool, enableTransition)

    var altitudePanel = AltitudePanel(metricUnit,
        setDarkThemeTool, setLightThemeTool, enableTransition)

    var headingPanel = HeadingPanel(setDarkThemeTool,
        setLightThemeTool, enableTransition)

    var clockPanel = ClockPanel(setDarkThemeTool,
        setLightThemeTool, enableTransition)

    var maxSpeedPanel = MaxSpeedPanel(metricUnit,
        setDarkThemeTool, setLightThemeTool, enableTransition)

    var averageSpeedPanel = AverageSpeedPanel(tripDistance,
        tripTimePanel, metricUnit, setDarkThemeTool,
        setLightThemeTool, enableTransition)

    var settings = Settings()

    var settingsPanel = SettingsPanel(settings, setDarkTheme,
        setLightTheme, setImperialUnit, setMetricUnit, setDarkThemeTool,
        setLightThemeTool, enableTransition)

    var classPrefix = 'MainPanel'

    var panelElement = Div(classPrefix + '-panel')
    panelElement.appendChild(tripDistancePanel.element)

    var resetButton = ResetButton(function () {
        tripDistance.reset()
        tripDistancePanel.update()
        tripTimePanel.reset()
        maxSpeedPanel.reset()
        averageSpeedPanel.reset()
        altitudePanel.reset()
        startStopButton.reset()
    }, enableTransition)

    var wakeLock = WakeLock()

    var startStopButton = StartStopButton(function () {
        started = true
        tripTimePanel.start()
        tripDistance.start()
        altitudePanel.start()
        wakeLock.lock()
    }, function () {
        started = false
        tripTimePanel.stop()
        altitudePanel.stop()
        wakeLock.unlock()
    }, enableTransition)

    var statusPanel = StatusPanel(setDarkThemeTool, setLightThemeTool, enableTransition)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(speedLabel.element)
    contentElement.appendChild(panelElement)
    contentElement.appendChild(statusPanel.element)
    contentElement.appendChild(tabs.element)
    contentElement.appendChild(resetButton.element)
    contentElement.appendChild(startStopButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = document.body.classList

    var setAltitude = altitudePanel.setAltitude,
        setHeading = headingPanel.setHeading

    if (settings.theme == 'light') setLightTheme()
    else setDarkTheme()

    if (settings.unit == 'imperial') setImperialUnit()
    else setMetricUnit()

/*
    setInterval(function () {
        updatePosition({
            coords: {
                latitude: 40 + Math.random() * 0.001,
                longitude: 40 + Math.random() * 0.001,
                altitude: -20 + Math.random() * 40,
                accuracy: Math.random() * 20,
                altitudeAccuracy: Math.random() * 10,
                heading: Math.random() * 360,
                speed: Math.random() * 30,
            },
            timestamp: Date.now(),
        })
    }, 500)
*/
///*
    navigator.geolocation.watchPosition(updatePosition, function (error) {
        var code = error.code
        if (code == error.PERMISSION_DENIED) {
            statusPanel.setStatus('PERMISSION DENIED')
        } else if (code == error.POSITION_UNAVAILABLE) {
            statusPanel.setStatus('POSITION UNAVAILABLE')
        } else {
            statusPanel.setStatus('TIMEOUT, RETRYING')
        }
        setSpeed(null)
        setAltitude(null)
        setHeading(null)
        statusPanel.showError()
    }, {
        enableHighAccuracy: true,
        maximumAge: 30 * 1000,
        timeout: 30 * 1000,
    })
//*/

    update()

    return {
        element: element,
        enableTransition: function () {

            statusPanel.enableTransition()
            speedLabel.enableTransition()
            resetButton.enableTransition()
            startStopButton.enableTransition()
            tabs.enableTransition()

            tripDistancePanel.enableTransition()
            tripTimePanel.enableTransition()
            maxSpeedPanel.enableTransition()
            averageSpeedPanel.enableTransition()
            altitudePanel.enableTransition()
            headingPanel.enableTransition()
            clockPanel.enableTransition()
            settingsPanel.enableTransition()

        },
        resize: function (windowWidth, windowHeight) {

            var width = 320,
                height = 480

            if (windowWidth > windowHeight) {
                var t = width
                width = height
                height = t
            }

            contentElement.style.width = width + 'px'
            contentElement.style.height = height + 'px'
            contentElement.style.top = -height / 2 + 'px'
            contentElement.style.left = -width / 2 + 'px'

            var scale = windowWidth / width
            if (scale * height > windowHeight) scale = windowHeight / height

            element.style.transform = element.style.webkitTransform = 'scale(' + scale +  ')'
            headingPanel.resize(scale)

        },
    }

}
