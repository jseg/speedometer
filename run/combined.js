(function () {
function AltitudePanel (unit, setDarkTheme, setLightTheme, enableTransition) {

    function update () {
        var integerPart, fractionalPart
        if (altitude === null) {
            fractionalPart = '\xb7\xb7\xb7'
            integerPart = '\xb7'
        } else {
            var formatAltitude = FormatAltitude(altitude, unit)
            fractionalPart = formatAltitude.fractionalPart
            integerPart = formatAltitude.integerPart
        }
        integerPartNode.nodeValue = integerPart
        fractionalPartNode.nodeValue = fractionalPart
    }

    var classPrefix = 'AltitudePanel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('000')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.distanceLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('ALTITUDE'))

    var labelClassList = labelElement.classList

    var altitudeStatPanel = AltitudeStatPanel(unit, setDarkTheme, setLightTheme)

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)
    element.appendChild(altitudeStatPanel.element)

    var classList = element.classList

    var altitude = null

    var previousAltitudes = []

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        reset: altitudeStatPanel.reset,
        start: altitudeStatPanel.start,
        stop: altitudeStatPanel.stop,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setAltitude: function (_altitude) {
            if (typeof _altitude == 'number' && isFinite(_altitude)) {

                previousAltitudes.push(_altitude)
                if (previousAltitudes.length > 3) previousAltitudes.shift()

                var averageAltitude = 0
                previousAltitudes.forEach(function (previousAltitude) {
                    averageAltitude += previousAltitude
                })
                averageAltitude /= previousAltitudes.length

                altitude = averageAltitude

            } else {
                altitude = null
                previousAltitudes.splice(0)
            }
            altitudeStatPanel.setAltitude(altitude)
            update()
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
            altitudeStatPanel.setDarkTheme()
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
            altitudeStatPanel.setLightTheme()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
            altitudeStatPanel.setUnit(unit)
        },
    }

}
;
function AltitudeStatPanel (unit, setDarkTheme, setLightTheme) {

    function setValue (field, altitude) {
        var formatAltitude = FormatAltitude(altitude, unit)
        field.setValue(formatAltitude.integerPart, formatAltitude.fractionalPart)
    }

    function update () {
        if (altitude === null) return
        if (minValue === null) {
            minValue = maxValue = altitude
        } else {
            minValue = Math.min(minValue, altitude)
            maxValue = Math.max(maxValue, altitude)
        }
        setValue(minValueField, minValue)
        setValue(maxValueField, maxValue)
    }

    var classPrefix = 'AltitudeStatPanel'

    var minValueField = StatField('MIN', setDarkTheme, setLightTheme)

    var maxValueField = StatField('MAX', setDarkTheme, setLightTheme)

    var element = Div(classPrefix)
    element.appendChild(minValueField.element)
    element.appendChild(maxValueField.element)

    var started = false,
        altitude = null,
        minValue = null,
        maxValue = null

    return {
        element: element,
        reset: function () {
            minValue = maxValue = null
            minValueField.reset()
            maxValueField.reset()
            if (started) update()
        },
        setAltitude: function (_altitude) {
            altitude = _altitude
            if (started) update()
        },
        setDarkTheme: function () {
            minValueField.setDarkTheme()
            maxValueField.setDarkTheme()
        },
        setLightTheme: function () {
            minValueField.setLightTheme()
            maxValueField.setLightTheme()
        },
        setUnit: function (_unit) {
            unit = _unit
            if (started) update()
        },
        start: function () {
            started = true
            update()
        },
        stop: function () {
            started = false
        },
    }

}
;
function AltitudeTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('ALTITUDE', 'AltitudeTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
}
;
function AveragePosition (positions) {

    var averageCoords = {
        latitude: 0,
        longitude: 0,
    }
    positions.forEach(function (position) {
        averageCoords.latitude += position.coords.latitude
        averageCoords.longitude += position.coords.longitude
    })
    averageCoords.latitude /= positions.length
    averageCoords.longitude /= positions.length

    return { coords: averageCoords }

}
;
function AverageSpeedPanel (tripDistance, tripTimePanel,
    unit, setDarkTheme, setLightTheme, enableTransition) {

    function update () {

        var tripTime = tripTimePanel.getTripTime()

        var speed
        if (tripTime == 0) speed = 0
        else speed = tripDistance.get() / (tripTime / 1000)
        speed = unit.fix(speed * 18 / 5)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = Math.floor(speed)
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'SpeedPanel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('0')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.speedLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('AVERAGE SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        reset: update,
        update: update,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
;
function AverageSpeedTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return TwoLineTab('AVERAGE', 'SPEED', 'AverageSpeedTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
}
;
function ClockPanel (setDarkTheme, setLightTheme, enableTransition) {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var minuteNode = TextNode('00')

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var contentElement = Div(classPrefix + '-content BottomPanel-content')
    contentElement.appendChild(hourNode)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteNode)
    contentElement.appendChild(secondElement)

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('CLOCK'))

    var labelClassList = labelElement.classList

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
        },
        update: function () {
            var date = new Date
            hourNode.nodeValue = TwoDigitPad(date.getHours())
            minuteNode.nodeValue = TwoDigitPad(date.getMinutes())
            secondNode.nodeValue = TwoDigitPad(date.getSeconds())
        },
    }

}
;
function ClockTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('CLOCK', 'ClockTab', listener,
        setDarkTheme, setLightTheme, enableTransition)
}
;
function CompassPanel () {

    function render () {

        var angle
        if (heading === null) angle = 0
        else angle = heading * Math.PI / 180

        c.clearRect(0, 0, size, size)
        c.save()
        c.translate(halfSize, halfSize)
        c.rotate(-angle)

        if (heading !== null) {

            var lineWidth = size * 0.01
            c.save()
            c.lineWidth = lineWidth
            c.beginPath()
            c.moveTo(0, 0)
            c.rotate(-Math.PI / 2)
            c.arc(0, 0, halfSize - lineWidth, 0, angle)
            c.closePath()
            c.fillStyle = angleBackgroundColor
            c.fill()
            c.lineJoin = 'round'
            c.strokeStyle = angleBorderColor
            c.stroke()
            c.restore()

        }

        c.save()
        for (var i = 0; i < 60; i++) {
            c.beginPath()
            if (i % 5 || heading === null) {
                var lineWidth = size * 0.01
                c.lineWidth = lineWidth
                c.moveTo(0, halfSize * 0.98)
                c.lineTo(0, halfSize * 0.95)
                c.strokeStyle = smallBarColor
            } else {
                c.lineWidth = size * 0.03
                c.moveTo(0, halfSize * 0.98)
                c.lineTo(0, halfSize * 0.92)
                c.strokeStyle = bigBarColor
            }
            c.stroke()
            c.rotate(Math.PI / 30)
        }
        c.restore()

        if (heading !== null) {
            var radius = -halfSize * 0.92
            c.save()
            c.font = 'bold ' + size * 0.25 + 'px FreeMono, monospace'
            c.textAlign = 'center'
            c.textBaseline = 'top'
            c.fillStyle = '#f00'
            c.fillText('N', 0, radius)
            c.fillStyle = textColor
            c.rotate(Math.PI / 2)
            c.fillText('E', 0, radius)
            c.rotate(Math.PI / 2)
            c.fillText('S', 0, radius)
            c.rotate(Math.PI / 2)
            c.fillText('W', 0, radius)
            c.restore()

        }
        c.restore()

    }

    var textColor, bigBarColor, smallBarColor,
        angleBorderColor, angleBackgroundColor

    var canvas = document.createElement('canvas')
    canvas.className = 'CompassPanel'

    var c = canvas.getContext('2d')

    var heading = null
    var size, halfSize

    return {
        element: canvas,
        resize: function (scale) {
            size = 116 * scale * devicePixelRatio
            halfSize = size / 2
            canvas.width = canvas.height = size
            render()
        },
        setDarkTheme: function () {
            angleBorderColor = '#999'
            angleBackgroundColor = '#444'
            textColor = '#999'
            bigBarColor = '#fff'
            smallBarColor = '#999'
            render()
        },
        setHeading: function (_heading) {
            heading = _heading
            render()
        },
        setLightTheme: function () {
            angleBorderColor = '#666'
            angleBackgroundColor = '#bbb'
            textColor = '#666'
            bigBarColor = '#000'
            smallBarColor = '#666'
            render()
        },
    }

}
;
function DistanceBetweenPositions (position1, position2) {

    function toRad (n) {
       return n * Math.PI / 180
    }

    var coords1 = position1.coords,
        coords2 = position2.coords

    var lat1 = toRad(coords1.latitude),
        lon1 = toRad(coords1.longitude)

    var lat2 = toRad(coords2.latitude),
        lon2 = toRad(coords2.longitude)

    var earthRadius = 6371000

    var dLat = lat2 - lat1,
        dLon = lon2 - lon1

    var sinDLat2 = Math.sin(dLat / 2),
        sinDLon2 = Math.sin(dLon / 2)

    var a = sinDLat2 * sinDLat2
        + Math.cos(lat1) * Math.cos(lat2) * sinDLon2 * sinDLon2

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    var d = earthRadius * c

    return d

}
;
function Div (className) {
    var div = document.createElement('div')
    div.className = className
    return div
}
;
function FormatAltitude (altitude, unit) {

    var visualAltitude = Math.floor(unit.fix(altitude))
    visualAltitude = Math.min(999999, Math.max(-99999, visualAltitude))

    var fractionalPart = String(Math.abs(visualAltitude) % 1000)
    if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
    else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart

    integerPart = Math.floor(Math.abs(visualAltitude) / 1000)
    if (visualAltitude < 0) integerPart = '-' + integerPart

    return {
        fractionalPart: fractionalPart,
        integerPart: integerPart,
    }

}
;
function HeadingPanel (setDarkTheme, setLightTheme, enableTransition) {

    function update () {
        var value
        if (heading === null) value = '\xb7'
        else value = Math.round(heading)
        valueNode.nodeValue = value
    }

    var classPrefix = 'HeadingPanel'

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(TextNode('\xb0'))

    var unitClassList = unitElement.classList

    var valueNode = TextNode('\xb7')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)
    valueElement.appendChild(unitElement)

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('HEADING'))

    var labelClassList = labelElement.classList

    var compassPanel = CompassPanel()

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(valueElement)
    element.appendChild(compassPanel.element)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    var heading = null,
        previousRawHeading = null

    var previousHeadings = []

    return {
        element: element,
        resize: compassPanel.resize,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
            compassPanel.setDarkTheme()
        },
        setHeading: function (_heading) {
            if (typeof _heading == 'number' && isFinite(_heading)) {

                if (previousRawHeading != null) {
                    if (_heading - previousRawHeading > 180) _heading -= 360
                    else if (_heading - previousRawHeading < -180) _heading += 360
                }
                previousRawHeading = _heading

                previousHeadings.push(_heading)
                if (previousHeadings.length > 3) previousHeadings.shift()

                var averageHeading = 0
                previousHeadings.forEach(function (previousHeading) {
                    averageHeading += previousHeading
                })
                averageHeading /= previousHeadings.length

                heading = (averageHeading % 360 + 360) % 360

            } else {
                heading = null
                previousRawHeading = null
                previousHeadings.splice(0)
            }
            compassPanel.setHeading(heading)
            update()
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
            compassPanel.setLightTheme()
        },
    }

}
;
function HeadingTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('HEADING', 'HeadingTab', listener,
        setDarkTheme, setLightTheme, enableTransition)
}
;
function ImperialUnit () {
    return {
        key: 'imperial',
        distanceLabel: 'MI',
        speedLabel: 'MI/H',
        fix: function (n) {
            return n / 1.609344
        },
    }
}
;
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
        startStopButton.setDarkTheme()
        resetButton.setDarkTheme()

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
        startStopButton.setLightTheme()
        resetButton.setLightTheme()

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
    }, setDarkThemeTool, setLightThemeTool, enableTransition)

    var startStopButton = StartStopButton(function () {
        started = true
        tripTimePanel.start()
        tripDistance.start()
        altitudePanel.start()
    }, function () {
        started = false
        tripTimePanel.stop()
        altitudePanel.stop()
    }, setDarkThemeTool, setLightThemeTool, enableTransition)

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

            element.style.transform = 'scale(' + scale +  ')'
            headingPanel.resize(scale)

        },
    }

}
;
function MaxSpeedPanel (unit, setDarkTheme, setLightTheme, enableTransition) {

    function setSpeed (speed) {
        maxSpeed = speed
        update()
    }

    function update () {

        var speed = unit.fix(maxSpeed * 18 / 5)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = Math.floor(speed)
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'SpeedPanel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('0')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.speedLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('MAX SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var maxSpeed = 0

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        reset: function () {
            setSpeed(0)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
        },
        setSpeed: function (speed) {
            if (!isFinite(speed)) speed = 0
            if (speed > maxSpeed) setSpeed(speed)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
;
function MaxSpeedTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return TwoLineTab('MAX', 'SPEED', 'MaxSpeedTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
}
;
function MetricUnit () {
    return {
        key: 'metric',
        distanceLabel: 'KM',
        speedLabel: 'KM/H',
        fix: function (n) {
            return n
        },
    }
}
;
function OnClick (element, listener) {

    function click () {
        classList.add('active')
        clearTimeout(timeout)
        timeout = setTimeout(function () {
            listener()
            timeout = setTimeout(function () {
                classList.remove('active')
            }, 150)
        }, 100)
    }

    var timeout

    var classList = element.classList

    var touched = false

    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    })
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        touched = true
        click()
    })

}
;
function OneLineTab (line, className, listener,
    setDarkTheme, setLightTheme, enableTransition) {

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(TextNode(line))

    var highlightClassList = highlightElement.classList

    var buttonContentElement = Div('Button-content')
    buttonContentElement.appendChild(highlightElement)
    OnClick(buttonContentElement, listener)

    var buttonContentClassList = buttonContentElement.classList

    var element = Div(className + ' OneLineTab Tab Button')
    element.appendChild(buttonContentElement)

    var classList = element.classList

    var selected = false

    var selectedClass = 'selected'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        deselect: function () {
            selected = false
            buttonContentClassList.remove(selectedClass)
            highlightClassList.remove(selectedClass)
        },
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(highlightClassList)
        },
        highlight: function () {
            highlightClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                highlightClassList.remove(highlightClass)
            }, 200)
        },
        select: function () {
            selected = true
            buttonContentClassList.add(selectedClass)
            highlightClassList.add(selectedClass)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(buttonContentClassList)
            setDarkTheme(highlightClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(buttonContentClassList)
            setLightTheme(highlightClassList)
        },
    }

}
;
function Page1Tab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('PAGE 1', 'Page1Tab', listener,
        setDarkTheme, setLightTheme, enableTransition)
}
;
function Page2Tab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('PAGE 2', 'Page2Tab', listener,
        setDarkTheme, setLightTheme, enableTransition)
}
;
function ResetButton (clickListener, setDarkTheme, setLightTheme, enableTransition) {

    var contentElement = Div('Button-content')
    contentElement.appendChild(TextNode('RESET'))
    OnClick(contentElement, clickListener)

    var contentClassList = contentElement.classList

    var element = Div('ResetButton Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(contentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(contentClassList)
        },
    }

}
;
function Settings () {

    var theme, unit
    try {
        theme = localStorage.theme
        unit = localStorage.unit
    } catch (e) {
    }

    var that = {
        theme: theme,
        unit: unit,
        save: function () {
            try {
                localStorage.theme = that.theme
                localStorage.unit = that.unit
            } catch (e) {
            }
        },
    }

    return that

}
;
function SettingsPanel (settings, darkListener,
    lightListener, imperialListener, metricListener,
    setDarkTheme, setLightTheme, enableTransition) {

    var classPrefix = 'SettingsPanel'

    var selectedClass = 'selected'

    var lightButtonContent = Div('Button-content')
    lightButtonContent.appendChild(TextNode('LIGHT'))
    OnClick(lightButtonContent, function () {
        darkButtonContentClassList.remove(selectedClass)
        lightButtonContentClassList.add(selectedClass)
        lightListener()
    })

    var lightButtonContentClassList = lightButtonContent.classList

    var lightButton = Div(classPrefix + '-lightButton ' + classPrefix + '-button Button')
    lightButton.appendChild(lightButtonContent)

    var lightButtonClassList = lightButton.classList

    var darkButtonContent = Div('Button-content')
    darkButtonContent.appendChild(TextNode('DARK'))
    OnClick(darkButtonContent, function () {
        lightButtonContentClassList.remove(selectedClass)
        darkButtonContentClassList.add(selectedClass)
        darkListener()
    })

    var darkButtonContentClassList = darkButtonContent.classList

    var darkButton = Div(classPrefix + '-darkButton ' + classPrefix + '-button Button')
    darkButton.appendChild(darkButtonContent)

    var darkButtonClassList = darkButton.classList

    var imperialButtonContent = Div('Button-content')
    imperialButtonContent.appendChild(TextNode('IMPERIAL'))
    OnClick(imperialButtonContent, function () {
        metricButtonContentClassList.remove(selectedClass)
        imperialButtonContentClassList.add(selectedClass)
        imperialListener()
    })

    var imperialButtonContentClassList = imperialButtonContent.classList

    var imperialButton = Div(classPrefix + '-imperialButton ' + classPrefix + '-button Button')
    imperialButton.appendChild(imperialButtonContent)

    var imperialButtonClassList = imperialButton.classList

    var metricButtonContent = Div('Button-content')
    metricButtonContent.appendChild(TextNode('METRIC'))
    OnClick(metricButtonContent, function () {
        imperialButtonContentClassList.remove(selectedClass)
        metricButtonContentClassList.add(selectedClass)
        metricListener()
    })

    var metricButtonContentClassList = metricButtonContent.classList

    var metricButton = Div(classPrefix + '-metricButton ' + classPrefix + '-button Button')
    metricButton.appendChild(metricButtonContent)

    var metricButtonClassList = metricButton.classList

    if (settings.unit == 'imperial') imperialButtonContentClassList.add(selectedClass)
    else metricButtonContentClassList.add(selectedClass)

    if (settings.theme == 'light') lightButtonContentClassList.add(selectedClass)
    else darkButtonContentClassList.add(selectedClass)

    var unitsLabelElement = Div(classPrefix + '-fieldLabel units')
    unitsLabelElement.appendChild(TextNode('UNITS:'))

    var themeLabelElement = Div(classPrefix + '-fieldLabel theme')
    themeLabelElement.appendChild(TextNode('THEME:'))

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('SETTINGS'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(themeLabelElement)
    element.appendChild(lightButton)
    element.appendChild(darkButton)
    element.appendChild(unitsLabelElement)
    element.appendChild(imperialButton)
    element.appendChild(metricButton)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
            enableTransition(lightButtonClassList)
            enableTransition(darkButtonClassList)
            enableTransition(imperialButtonClassList)
            enableTransition(metricButtonClassList)
            enableTransition(themeLabelElement.classList)
            enableTransition(unitsLabelElement.classList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(lightButtonClassList)
            setDarkTheme(lightButtonContentClassList)
            setDarkTheme(darkButtonClassList)
            setDarkTheme(darkButtonContentClassList)
            setDarkTheme(imperialButtonClassList)
            setDarkTheme(imperialButtonContentClassList)
            setDarkTheme(metricButtonClassList)
            setDarkTheme(metricButtonContentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(lightButtonClassList)
            setLightTheme(lightButtonContentClassList)
            setLightTheme(darkButtonClassList)
            setLightTheme(darkButtonContentClassList)
            setLightTheme(imperialButtonClassList)
            setLightTheme(imperialButtonContentClassList)
            setLightTheme(metricButtonClassList)
            setLightTheme(metricButtonContentClassList)
        },
    }

}
;
function SettingsTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return OneLineTab('SETTINGS', 'SettingsTab', listener,
        setDarkTheme, setLightTheme, enableTransition)
}
;
function SpeedLabel (unit, setDarkTheme, setLightTheme, enableTransition) {

    function update () {
        var integerPart, fractionalPart, arrow
        if (speed === null) {
            arrow = ''
            integerPart = '\xb7'
            fractionalPart = '\xb7'
        } else {

            var visualSpeed = unit.fix(speed * 18 / 5)
            visualSpeed = Math.min(999.99, visualSpeed)

            integerPart = Math.floor(visualSpeed)
            fractionalPart = Math.floor(visualSpeed % 1 * 10)

            if (increasing) {
                if (decreasing) arrow = ''
                else arrow = '\u2191'
            } else if (decreasing) {
                arrow = '\u2193'
            } else {
                arrow = ''
            }

        }
        integerPartNode.nodeValue = integerPart
        fractionalPartNode.nodeValue = fractionalPart
        arrowNode.nodeValue = arrow
    }

    var classPrefix = 'SpeedLabel'

    var integerPartNode = TextNode('\xb7')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('\xb7')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.speedLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SPEED'))

    var labelClassList = labelElement.classList

    var arrowNode = TextNode('\u2195')

    var arrowElement = Div(classPrefix + '-arrow')
    arrowElement.appendChild(arrowNode)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(arrowElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var speed = null,
        previousSpeed = null

    var decreasing = false,
        increasing = false

    var decreasingTimeout,
        increasingTimeout

    var ignoreDifference = 0.02

    var previousSpeeds = []

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
            enableTransition(integerPartElement.classList)
            enableTransition(fractionalPartElement.classList)
            enableTransition(unitClassList)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
        },
        setSpeed: function (_speed) {
            if (typeof _speed == 'number' && isFinite(_speed)) {

                previousSpeeds.push(_speed)
                if (previousSpeeds.length > 3) previousSpeeds.shift()

                var averageSpeed = 0
                previousSpeeds.forEach(function (previousSpeed) {
                    averageSpeed += previousSpeed
                })
                averageSpeed /= previousSpeeds.length

                if (previousSpeed !== null) {
                    if (averageSpeed > previousSpeed + ignoreDifference) {
                        increasing = true
                        clearTimeout(increasingTimeout)
                        increasingTimeout = setTimeout(function () {
                            increasing = false
                            update()
                        }, 2500)
                    } else if (averageSpeed < previousSpeed - ignoreDifference) {
                        decreasing = true
                        clearTimeout(decreasingTimeout)
                        decreasingTimeout = setTimeout(function () {
                            decreasing = false
                            update()
                        }, 2500)
                    }
                }

                previousSpeed = speed
                speed = averageSpeed

            } else {
                speed = null
                previousSpeed = null
                previousSpeeds.splice(0)
                decreasing = increasing = false
                clearTimeout(decreasingTimeout)
                clearTimeout(increasingTimeout)
            }
            update()
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
;
function StartStopButton (startListener, stopListener,
    setDarkTheme, setLightTheme, enableTransition) {

    var started = false

    var node = TextNode('START')

    var contentElement = Div('Button-content')
    contentElement.appendChild(node)
    OnClick(contentElement, function () {
        if (started) {
            started = false
            node.nodeValue = 'START'
            stopListener()
        } else {
            started = true
            node.nodeValue = 'STOP'
            startListener()
        }
    })

    var contentClassList = contentElement.classList

    var element = Div('StartStopButton Button')
    element.appendChild(contentElement)

    var classList = element.classList

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(contentClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(contentClassList)
        },
    }

}
;
function StatField (label, setDarkTheme, setLightTheme) {

    var classPrefix = 'StatField'

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode(label))

    var labelClassList = labelElement.classList

    var integerPartNode = TextNode('\xb7')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('\xb7')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(integerPartElement)
    valueElement.appendChild(fractionalPartElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(valueElement)

    return {
        element: element,
        reset: function () {
            integerPartNode.nodeValue = fractionalPartNode.nodeValue = '\xb7'
        },
        setDarkTheme: function () {
            setDarkTheme(labelClassList)
        },
        setLightTheme: function () {
            setLightTheme(labelClassList)
        },
        setValue: function (integerPart, fractionalPart) {
            integerPartNode.nodeValue = integerPart
            fractionalPartNode.nodeValue = fractionalPart
        },
    }

}
;
function StatusPanel (setDarkTheme, setLightTheme, enableTransition) {

    function highlight () {
        classList.add(highlightClass)
        clearTimeout(highlightTimeout)
        highlightTimeout = setTimeout(function () {
            classList.remove(highlightClass)
        }, 200)
    }

    var classPrefix = 'StatusPanel'

    var valueNode = TextNode('ACQUIRING')

    var valueElement = Div(classPrefix + '-value')
    valueElement.appendChild(valueNode)

    var valueClassList = valueElement.classList

    var element = Div(classPrefix)
    element.appendChild(TextNode('GPS'))
    element.appendChild(valueElement)

    var classList = element.classList

    var error = false,
        errorClass = 'error'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(valueClassList)
        },
        hideError: function () {
            if (error) {
                error =false
                valueClassList.remove(errorClass)
                highlight()
            }
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(valueClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(valueClassList)
        },
        setStatus: function (value) {
            valueNode.nodeValue = value
        },
        showError: function () {
            if (!error) {
                error = true
                valueClassList.add(errorClass)
                highlight()
            }
        },
    }

}
;
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
;
function TextNode (text) {
    return document.createTextNode(text)
}
;
function TripDistance () {

    var value = 0
    var prevPositions = []

    return {
        add: function (newPosition) {

            var prevPosition
            if (prevPositions.length) prevPosition = AveragePosition(prevPositions)

            prevPositions.push(newPosition)
            if (prevPositions.length > 3) prevPositions.shift()

            if (prevPosition) {
                var position = AveragePosition(prevPositions)
                value += DistanceBetweenPositions(prevPosition, position)
            }

        },
        get: function () {
            return value
        },
        reset: function () {
            prevPositions.splice(0)
            value = 0
        },
        start: function () {
            prevPositions.splice(0)
        },
    }

}
;
function TripDistancePanel (tripDistance, unit,
    setDarkTheme, setLightTheme, enableTransition) {

    function update () {

        var distance = unit.fix(tripDistance.get())
        distance = Math.min(999999, Math.floor(distance))

        var fractionalPart = String(distance % 1000)
        if (fractionalPart.length == 1) fractionalPart = '00' + fractionalPart
        else if (fractionalPart.length == 2) fractionalPart = '0' + fractionalPart
        fractionalPartNode.nodeValue = fractionalPart

        integerPartNode.nodeValue = Math.floor(distance / 1000)

    }

    var classPrefix = 'TripDistancePanel'

    var integerPartNode = TextNode('0')

    var integerPartElement = Div(classPrefix + '-integerPart')
    integerPartElement.appendChild(integerPartNode)

    var fractionalPartNode = TextNode('000')

    var fractionalPartElement = Div(classPrefix + '-fractionalPart')
    fractionalPartElement.appendChild(TextNode('.'))
    fractionalPartElement.appendChild(fractionalPartNode)

    var unitNode = TextNode(unit.distanceLabel)

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(unitNode)

    var unitClassList = unitElement.classList

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('TRIP DISTANCE'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(integerPartElement)
    element.appendChild(fractionalPartElement)
    element.appendChild(unitElement)

    var classList = element.classList

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        update: update,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
            setDarkTheme(unitClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
            setLightTheme(unitClassList)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
        },
    }

}
;
function TripDistanceTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    var tab = TwoLineTab('TRIP', 'DISTANCE', 'TripDistanceTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
    tab.select()
    return tab
}
;
function TripTimePanel (setDarkTheme, setLightTheme, enableTransition) {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var minuteNode = TextNode('00')

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var labelElement = Div('BottomPanel-label')
    labelElement.appendChild(TextNode('TRIP TIME'))

    var labelClassList = labelElement.classList

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(hourNode)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteNode)
    contentElement.appendChild(secondElement)

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var tripTime = 0,
        startTime = null,
        maxTripTime = 1000 * 60 * 60 * 100 - 1000

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(labelClassList)
        },
        getTripTime: function () {
            return tripTime
        },
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
        },
        reset: function () {
            tripTime = 0
            if (startTime !== null) startTime = Date.now()
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(labelClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(labelClassList)
        },
        start: function () {
            startTime = Date.now()
        },
        stop: function () {
            tripTime += Date.now() - startTime
            tripTime = Math.min(tripTime, maxTripTime)
            startTime = null
        },
        update: function () {

            if (startTime !== null) {
                var now = Date.now()
                tripTime += now - startTime
                startTime = now
            }
            tripTime = Math.min(tripTime, maxTripTime)

            var seconds = tripTime / 1000
            secondNode.nodeValue = TwoDigitPad(Math.floor(seconds % 60))

            var minutes = seconds / 60
            minuteNode.nodeValue = TwoDigitPad(Math.floor(minutes % 60))

            var hours = minutes / 60
            hourNode.nodeValue = TwoDigitPad(Math.floor(hours))

        },
    }

}
;
function TripTimeTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    return TwoLineTab('TRIP', 'TIME', 'TripTimeTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
}
;
function TwoDigitPad (n) {
    n = String(n)
    if (n.length == 1) n = '0' + n
    return n
}
;
function TwoLineTab (line1, line2, className,
    listener, setDarkTheme, setLightTheme, enableTransition) {

    var classPrefix = 'TwoLineTab ' + className

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode(line1))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode(line2))

    var highlightElement = Div('Tab-highlight')
    highlightElement.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    highlightElement.appendChild(contentElement)

    var highlightClassList = highlightElement.classList

    var buttonContentElement = Div('Button-content')
    buttonContentElement.appendChild(highlightElement)
    OnClick(buttonContentElement, listener)

    var buttonContentClassList = buttonContentElement.classList

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(buttonContentElement)

    var classList = element.classList

    var selected = false

    var selectedClass = 'selected'

    var highlightTimeout,
        highlightClass = 'highlight'

    return {
        element: element,
        deselect: function () {
            selected = false
            buttonContentClassList.remove(selectedClass)
            highlightClassList.remove(selectedClass)
        },
        enableTransition: function () {
            enableTransition(classList)
            enableTransition(highlightClassList)
        },
        highlight: function () {
            highlightClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                highlightClassList.remove(highlightClass)
            }, 200)
        },
        select: function () {
            selected = true
            buttonContentClassList.add(selectedClass)
            highlightClassList.add(selectedClass)
        },
        setDarkTheme: function () {
            setDarkTheme(classList)
            setDarkTheme(buttonContentClassList)
            setDarkTheme(highlightClassList)
        },
        setLightTheme: function () {
            setLightTheme(classList)
            setLightTheme(buttonContentClassList)
            setLightTheme(highlightClassList)
        },
    }

}
;
(function () {

    function enableTransition (classList) {
        classList.add('enableTransition')
    }

    function resize () {
        mainPanel.resize(innerWidth, innerHeight)
    }

    ;(function () {
        var style = document.createElement('style')
        style.innerHTML =
            '@font-face {' +
                'font-family: FreeMono;' +
                'src: url(fonts/FreeMono.ttf);' +
                'src: local("FreeMono"), url(fonts/FreeMono.ttf);' +
                'font-weight: normal;' +
            '}' +
            '@font-face {' +
                'font-family: FreeMono;' +
                'src: url(fonts/FreeMonoBold.ttf);' +
                'src: local("FreeMono Bold"), url(fonts/FreeMonoBold.ttf);' +
                'font-weight: bold;' +
            '}'
        document.head.appendChild(style)
    })()

    var mainPanel = MainPanel(enableTransition)

    var body = document.body
    body.appendChild(mainPanel.element)

    addEventListener('resize', resize)
    resize()

    setTimeout(function () {
        enableTransition(body.classList)
        mainPanel.enableTransition()
    }, 200)

})()
;

})()