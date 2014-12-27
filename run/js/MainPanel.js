function MainPanel () {

    function setDarkTheme () {

        tripDistancePanel.setDarkTheme()
        tripTimePanel.setDarkTheme()
        altitudePanel.setDarkTheme()
        headingPanel.setDarkTheme()
        statusPanel.setDarkTheme()
        speedLabel.setDarkTheme()
        maxSpeedPanel.setDarkTheme()
        averageSpeedPanel.setDarkTheme()
        clockPanel.setDarkTheme()
        settingsPanel.setDarkTheme()
        tabs.setDarkTheme()
        startStopButton.setDarkTheme()
        resetButton.setDarkTheme()

        classList.remove('lightTheme')
        classList.add('darkTheme')

        settings.theme = 'dark'
        settings.save()

    }

    function setImperialUnit () {
        setUnit(imperialUnit)
    }

    function setLightTheme () {

        tripDistancePanel.setLightTheme()
        tripTimePanel.setLightTheme()
        altitudePanel.setLightTheme()
        headingPanel.setLightTheme()
        statusPanel.setLightTheme()
        speedLabel.setLightTheme()
        maxSpeedPanel.setLightTheme()
        averageSpeedPanel.setLightTheme()
        clockPanel.setLightTheme()
        settingsPanel.setLightTheme()
        tabs.setLightTheme()
        startStopButton.setLightTheme()
        resetButton.setLightTheme()

        classList.add('lightTheme')
        classList.add('darkTheme')

        settings.theme = 'light'
        settings.save()

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
        if (started) maxSpeedPanel.setSpeed(speed)
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

    var requestAnimationFrame = window.requestAnimationFrame
    if (!requestAnimationFrame) {
        requestAnimationFrame = window.mozRequestAnimationFrame
    }

    var started = false

    var tripDistance = TripDistance()

    var imperialUnit = ImperialUnit(),
        metricUnit = MetricUnit()

    var speedLabel = SpeedLabel(metricUnit)

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
    })

    var tripTimePanel = TripTimePanel()

    var tripDistancePanel = TripDistancePanel(tripDistance, metricUnit)

    var altitudePanel = AltitudePanel(metricUnit)

    var headingPanel = HeadingPanel()

    var clockPanel = ClockPanel()

    var maxSpeedPanel = MaxSpeedPanel(metricUnit)

    var averageSpeedPanel = AverageSpeedPanel(tripDistance, tripTimePanel, metricUnit)

    var settings = Settings()

    var settingsPanel = SettingsPanel(settings,
        setDarkTheme, setLightTheme, setImperialUnit, setMetricUnit)

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
    })

    var startStopButton = StartStopButton(function () {
        started = true
        tripTimePanel.start()
        tripDistance.start()
        altitudePanel.start()
    }, function () {
        started = false
        tripTimePanel.stop()
        altitudePanel.stop()
    })

    var statusPanel = StatusPanel()

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

            element.style.transform = 'scale(' + scale +  ')'
            headingPanel.resize(scale)

        },
    }

}
