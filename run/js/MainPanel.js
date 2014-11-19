function MainPanel () {

    function setSpeed (n) {
        speedLabel.setSpeed(n)
    }

    function update () {
        requestAnimationFrame(function () {
            tripTimePanel.update()
            clockPanel.update()
            update()
        })
    }

    var speedLabel = SpeedLabel()

    var tabs = Tabs(function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripTimePanel.element)
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripDistancePanel)
    }, function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(clockPanel.element)
    })

    var tripTimePanel = TripTimePanel()

    var tripDistancePanel = TripDistancePanel()

    var clockPanel = ClockPanel()

    var classPrefix = 'MainPanel'

    var panelElement = Div(classPrefix + '-panel')
    panelElement.appendChild(tripDistancePanel)

    var startStopButton = StartStopButton(function () {
        tripTimePanel.start()
    }, function () {
        tripTimePanel.stop()
    })

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(speedLabel.element)
    contentElement.appendChild(panelElement)
    contentElement.appendChild(tabs.element)
    contentElement.appendChild(startStopButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    setInterval(function () {
        setSpeed(Math.random() * 20)
    }, 500)
/*
    navigator.geolocation.watchPosition(function (position) {
        var div = document.createElement('div')
        div.appendChild(TextNode(position.coords.speed))
        element.appendChild(div)
    }, function (error) {
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
