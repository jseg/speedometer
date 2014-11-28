(function () {
function AverageSpeedPanel (tripDistance, tripTimePanel, unit) {

    function update () {

        var tripTime = tripTimePanel.getTripTime()

        var speed
        if (tripTime == 0) speed = 0
        else speed = tripDistance.get() / (tripTime / 1000)
        speed = speed * 18 / 5
        speed = unit.fix(speed)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = String(Math.floor(speed))
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'AverageSpeedPanel'

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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('AVERAGE SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        reset: update,
        update: update,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.speedLabel
            update()
        },
    }

}
;
function AverageSpeedTab (listener) {

    var classPrefix = 'AverageSpeedTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('AVERAGE'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('SPEED'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
;
function ClockPanel () {

    var classPrefix = 'ClockPanel'

    var hourNode = TextNode('00')

    var hourElement = Div(classPrefix + '-hour')
    hourElement.appendChild(hourNode)

    var minuteNode = TextNode('00')

    var minuteElement = Div(classPrefix + '-minute')
    minuteElement.appendChild(minuteNode)

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(hourElement)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteElement)
    contentElement.appendChild(secondElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('CLOCK'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
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
function ClockTab (listener) {

    var element = Div('Tab ClockTab Button')
    element.appendChild(TextNode('CLOCK'))

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
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
function ImperialUnit () {
    return {
        distanceLabel: 'M',
        speedLabel: 'M/H',
        fix: function (n) {
            return n
        },
    }
}
;
function MainPanel () {

    function setUnit (unit) {
        speedLabel.setUnit(unit)
        tripDistancePanel.setUnit(unit)
        maxSpeedPanel.setUnit(unit)
        averageSpeedPanel.setUnit(unit)
    }

    function update () {
        requestAnimationFrame(function () {
            setTimeout(function () {
                tripDistancePanel.update()
                tripTimePanel.update()
                clockPanel.update()
                averageSpeedPanel.update()
                update()
            }, 50)
        })
    }

    function updatePosition (position) {

        if (started) tripDistance.add(position)

        var coords = position.coords,
            speed = coords.speed

        speedLabel.setSpeed(speed)
        if (started) maxSpeedPanel.setSpeed(speed)

        var accuracy = coords.accuracy
        if (accuracy < 6) statusPanel.setStatus('SIGNAL GOOD')
        else if (accuracy < 12) statusPanel.setStatus('SIGNAL OK')
        else statusPanel.setStatus('SIGNAL WEAK')

    }

    var requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame
    if (!requestAnimationFrame) {
        requestAnimationFrame = window.mozRequestAnimationFrame
        cancelAnimationFrame = window.mozCancelAnimationFrame
    }

    var started = false

    var tripDistance = TripDistance()

    var imperialUnit = ImperialUnit(),
        metricUnit = MetricUnit()

    var speedLabel = SpeedLabel(metricUnit)

    var tabs = Tabs(function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripTimePanel.element)
        tripTimePanel.highlight()
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripDistancePanel.element)
        tripDistancePanel.highlight()
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(clockPanel.element)
        clockPanel.highlight()
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(maxSpeedPanel.element)
        maxSpeedPanel.highlight()
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(averageSpeedPanel.element)
        averageSpeedPanel.highlight()
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(settingsPanel.element)
        settingsPanel.highlight()
    })

    var tripTimePanel = TripTimePanel()

    var tripDistancePanel = TripDistancePanel(tripDistance, metricUnit)

    var clockPanel = ClockPanel()

    var maxSpeedPanel = MaxSpeedPanel(metricUnit)

    var averageSpeedPanel = AverageSpeedPanel(tripDistance, tripTimePanel, metricUnit)

    var settingsPanel = SettingsPanel(function () {
        setUnit(imperialUnit)
    }, function () {
        setUnit(metricUnit)
    })

    setUnit(metricUnit)

    var classPrefix = 'MainPanel'

    var panelElement = Div(classPrefix + '-panel')
    panelElement.appendChild(tripDistancePanel.element)

    var resetButton = ResetButton(function () {
        tripDistance.reset()
        tripTimePanel.reset()
        tripDistancePanel.reset()
        maxSpeedPanel.reset()
        averageSpeedPanel.reset()
    })

    var startStopButton = StartStopButton(function () {
        started = true
        tripTimePanel.start()
        tripDistance.start()
    }, function () {
        started = false
        tripTimePanel.stop()
    })

    var statusPanel = StatusPanel()

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(speedLabel.element)
    contentElement.appendChild(panelElement)
    contentElement.appendChild(tabs.element)
    contentElement.appendChild(resetButton)
    contentElement.appendChild(startStopButton.element)
    contentElement.appendChild(statusPanel.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

/*
    setInterval(function () {
        updatePosition({
            coords: {
                latitude: 40 + Math.random() * 0.001,
                longitude: 40 + Math.random() * 0.001,
                altitude: -10 + Math.random() * 20,
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
            statusPanel.setStatus('TIMEOUT')
        }
    }, {
        enableHighAccuracy: true,
    })
//*/

    update()

    if (navigator.requestWakeLock) navigator.requestWakeLock('screen')

    return {
        element: element,
        resize: function (width, height) {
            var scale = width / 320
            if (scale * 452 > height) scale = height / 452
            element.style.transform = 'scale(' + scale +  ')'
        },
    }

}
;
function MaxSpeedPanel (unit) {

    function setSpeed (speed) {
        maxSpeed = speed
        update()
    }

    function update () {

        speed = maxSpeed * 18 / 5
        speed = unit.fix(speed)
        speed = Math.min(999.99, speed)

        integerPartNode.nodeValue = String(Math.floor(speed))
        fractionalPartNode.nodeValue = Math.floor(speed % 1 * 10)

    }

    var classPrefix = 'MaxSpeedPanel'

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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('MAX SPEED'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    var maxSpeed = 0

    return {
        element: element,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        reset: function () {
            setSpeed(0)
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
function MaxSpeedTab (listener) {

    var classPrefix = 'MaxSpeedTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('MAX'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('SPEED'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
;
function MetricUnit () {
    return {
        distanceLabel: 'KM',
        speedLabel: 'KM/H',
        fix: function (n) {
            return n * 1.609344
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

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    }

    function touchStart (e) {
        e.preventDefault()
        touched = true
        click()
    }

    var timeout

    var classList = element.classList

    var touched = false

    return {
        disable: function () {
            element.removeEventListener('touchstart', touchStart)
            element.removeEventListener('mousedown', mouseDown)
        },
        enable: function () {
            element.addEventListener('mousedown', mouseDown)
            element.addEventListener('touchstart', touchStart)
        },
    }

}
;
function ResetButton (clickListener) {

    var element = Div('ResetButton Button')
    element.appendChild(TextNode('RESET'))

    var click = OnClick(element, clickListener)
    click.enable()

    return element

}
;
function SettingsPanel (imperialListener, metricListener) {

    var classPrefix = 'SettingsPanel'

    var imperialButton = Div(classPrefix + '-button Button')
    imperialButton.appendChild(TextNode('IMPERIAL'))

    var imperialClick = OnClick(imperialButton, function () {
        metricButton.classList.remove('selected')
        imperialButton.classList.add('selected')
        imperialListener()
    })
    imperialClick.enable()

    var metricButton = Div(classPrefix + '-metricButton ' + classPrefix + '-button Button selected')
    metricButton.appendChild(TextNode('METRIC'))

    var metricClick = OnClick(metricButton, function () {
        imperialButton.classList.remove('selected')
        metricButton.classList.add('selected')
        metricListener()
    })
    metricClick.enable()

    var fieldLabelElement = Div(classPrefix + '-fieldLabel')
    fieldLabelElement.appendChild(TextNode('UNITS:'))

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(fieldLabelElement)
    contentElement.appendChild(imperialButton)
    contentElement.appendChild(metricButton)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SETTINGS'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
    }

}
;
function SettingsTab (listener) {

    var element = Div('Tab SettingsTab Button')
    element.appendChild(TextNode('SETTINGS'))

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
;
function SpeedLabel (unit) {

    function update () {

        var visualSpeed = unit.fix(speed * 18 / 5)
        visualSpeed = Math.min(999.99, visualSpeed)

        integerPartNode.nodeValue = Math.floor(visualSpeed)
        fractionalPartNode.nodeValue = Math.floor(visualSpeed % 1 * 10)

    }

    var classPrefix = 'SpeedLabel'

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

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('SPEED'))

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var element = Div(classPrefix)
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var speed = 0

    return {
        element: element,
        setSpeed: function (_speed) {
            if (!isFinite(_speed)) _speed = 0
            speed = _speed
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
function StartStopButton (startListener, stopListener) {

    var started = false

    var node = TextNode('START')

    var element = Div('StartStopButton Button')
    element.appendChild(node)

    var click = OnClick(element, function () {
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
    click.enable()

    return { element: element }

}
;
function StatusPanel () {

    var node = TextNode('INITIALIZING')

    var element = Div('StatusPanel')
    element.appendChild(TextNode('GPS: '))
    element.appendChild(node)

    var classList = element.classList

    var timeout

    return {
        element: element,
        setStatus: function (text) {
            if (text != node.nodeValue) {
                node.nodeValue = text
                clearTimeout(timeout)
                classList.add('highlight')
                timeout = setTimeout(function () {
                    classList.remove('highlight')
                }, 200)
            }
        },
    }

}
;
function Tabs (tripTimeListener, tripDistanceListener,
    clockListener, maxSpeedListener, averageSpeedListener, settingsListener) {

    var tripDistanceTab = TripDistanceTab(function () {
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        tripDistanceListener()
    })

    var tripTimeTab = TripTimeTab(function () {
        tripDistanceTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        tripTimeListener()
    })

    var clockTab = ClockTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        clockListener()
    })

    var maxSpeedTab = MaxSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        averageSpeedTab.deselect()
        settingsTab.deselect()
        maxSpeedListener()
    })

    var averageSpeedTab = AverageSpeedTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        settingsTab.deselect()
        averageSpeedListener()
    })

    var settingsTab = SettingsTab(function () {
        tripDistanceTab.deselect()
        tripTimeTab.deselect()
        clockTab.deselect()
        maxSpeedTab.deselect()
        averageSpeedTab.deselect()
        settingsListener()
    })

    var classPrefix = 'Tabs'

    var row1Element = Div(classPrefix + '-row1')
    row1Element.appendChild(tripDistanceTab.element)
    row1Element.appendChild(tripTimeTab.element)
    row1Element.appendChild(clockTab.element)

    var row2Element = Div(classPrefix + '-row2')
    row2Element.appendChild(maxSpeedTab.element)
    row2Element.appendChild(averageSpeedTab.element)
    row2Element.appendChild(settingsTab.element)

    var element = Div(classPrefix)
    element.appendChild(row1Element)
    element.appendChild(row2Element)

    return { element: element }

}
;
function TextNode (text) {
    return document.createTextNode(text)
}
;
function TripDistance () {

    var prevPosition = null
    var value = 0

    return {
        add: function (position) {
            if (prevPosition) {
                value += DistanceBetweenPositions(prevPosition, position)
            }
            prevPosition = position
        },
        get: function () {
            return value
        },
        reset: function () {
            prevPosition = null
            value = 0
        },
        start: function () {
            prevPosition = null
        },
    }

}
;
function TripDistancePanel (tripDistance, unit) {

    function update () {

        var distance = tripDistance.get()
        distance = unit.fix(distance)
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

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(integerPartElement)
    contentElement.appendChild(fractionalPartElement)
    contentElement.appendChild(unitElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('TRIP DISTANCE'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    return {
        element: element,
        reset: update,
        update: update,
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        setUnit: function (_unit) {
            unit = _unit
            unitNode.nodeValue = unit.distanceLabel
            update()
        },
    }

}
;
function TripDistanceTab (listener) {

    var classPrefix = 'TripDistanceTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('TRIP'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('DISTANCE'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)

    var classList = element.classList
    classList.add('selected')

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
;
function TripTimePanel () {

    var classPrefix = 'TripTimePanel'

    var hourNode = TextNode('00')

    var hourElement = Div(classPrefix + '-hour')
    hourElement.appendChild(hourNode)

    var minuteNode = TextNode('00')

    var minuteElement = Div(classPrefix + '-minute')
    minuteElement.appendChild(minuteNode)

    var secondNode = TextNode('00')

    var secondElement = Div(classPrefix + '-second')
    secondElement.appendChild(TextNode(':'))
    secondElement.appendChild(secondNode)

    var contentElement = Div(classPrefix + ' BottomPanel-content')
    contentElement.appendChild(hourElement)
    contentElement.appendChild(TextNode(':'))
    contentElement.appendChild(minuteElement)
    contentElement.appendChild(secondElement)

    var labelElement = Div(classPrefix + '-label')
    labelElement.appendChild(TextNode('TRIP TIME'))

    var labelClassList = labelElement.classList

    var element = Div('BottomPanel')
    element.appendChild(labelElement)
    element.appendChild(contentElement)

    var classList = element.classList

    var timeout

    var tripTime = 0,
        startTime = null,
        maxTripTime = 1000 * 60 * 60 * 100 - 1000

    return {
        element: element,
        getTripTime: function () {
            return tripTime
        },
        highlight: function () {
            clearTimeout(timeout)
            classList.add('highlight')
            labelClassList.add('highlight')
            timeout = setTimeout(function () {
                classList.remove('highlight')
                labelClassList.remove('highlight')
            }, 200)
        },
        reset: function () {
            tripTime = 0
            if (startTime !== null) startTime = Date.now()
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
function TripTimeTab (listener) {

    var classPrefix = 'TripTimeTab'

    var contentElement = Div(classPrefix + '-content Tab-content')
    contentElement.appendChild(TextNode('TRIP'))
    contentElement.appendChild(document.createElement('br'))
    contentElement.appendChild(TextNode('TIME'))

    var element = Div(classPrefix + ' Tab Button')
    element.appendChild(Div(classPrefix + '-aligner Tab-aligner'))
    element.appendChild(contentElement)

    var classList = element.classList

    var click = OnClick(element, function () {
        listener()
        classList.add('selected')
    })
    click.enable()

    return {
        element: element,
        deselect: function () {
            classList.remove('selected')
        },
    }

}
;
function TwoDigitPad (n) {
    n = String(n)
    if (n.length == 1) n = '0' + n
    return n
}
;
(function () {

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

    var mainPanel = MainPanel()
    document.body.appendChild(mainPanel.element)

    addEventListener('resize', resize)
    resize()

})()
;

})()