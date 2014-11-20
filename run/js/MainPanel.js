function MainPanel () {

    function update () {
        requestAnimationFrame(function () {
            setTimeout(function () {
                tripDistancePanel.update()
                tripTimePanel.update()
                clockPanel.update()
                update()
            }, 50)
        })
    }

    function updatePosition (position) {
        if (started) positions.add(position)
        speedLabel.setSpeed(position.coords.speed * 18 / 5)
    }

    var requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame
    if (!requestAnimationFrame) {
        requestAnimationFrame = window.mozRequestAnimationFrame
        cancelAnimationFrame = window.mozCancelAnimationFrame
    }

    var started = false

    var positions = Positions()

    var speedLabel = SpeedLabel()

    var tabs = Tabs(function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripTimePanel.element)
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripDistancePanel.element)
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(clockPanel.element)
    })

    var tripTimePanel = TripTimePanel()

    var tripDistancePanel = TripDistancePanel(positions)

    var clockPanel = ClockPanel()

    var classPrefix = 'MainPanel'

    var panelElement = Div(classPrefix + '-panel')
    panelElement.appendChild(tripDistancePanel.element)

    var resetButton = ResetButton(function () {
        tripTimePanel.reset()
        tripDistancePanel.reset()
        positions.reset()
    })

    var startStopButton = StartStopButton(function () {
        started = true
        tripTimePanel.start()
    }, function () {
        started = false
        tripTimePanel.stop()
    })

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(speedLabel.element)
    contentElement.appendChild(panelElement)
    contentElement.appendChild(tabs.element)
    contentElement.appendChild(resetButton)
    contentElement.appendChild(startStopButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    setInterval(function () {
        updatePosition({
            coords: {
                latitude: Math.round() * 360,
                longitude: Math.round() * 360,
                altitude: -10 + Math.random() * 20,
                acuracy: Math.random() * 20,
                altitudeAcuracy: Math.random() * 10,
                heading: Math.round() * 360,
                speed: Math.random() * 10,
            },
            timestamp: Date.now(),
        })
    }, 500)
/*
    navigator.geolocation.watchPosition(updatePosition, function (error) {
        var div = document.createElement('div')
        div.appendChild(TextNode(error.message))
        element.appendChild(div)
    }, {
        enableHighAccuracy: true,
    })
*/

    update()

    return {
        element: element,
        resize: function (width, height) {
            var scale = width / 320
            if (scale * 370 > height) scale = height / 370
            element.style.transform = 'scale(' + scale +  ')'
        },
    }

}
