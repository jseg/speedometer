function MainPanel () {

    function setSpeed (n) {
        speedLabel.setSpeed(n)
    }

    function update () {
        requestAnimationFrame(function () {
            clockPanel.update()
            update()
        })
    }

    var speedLabel = SpeedLabel()

    var tabs = Tabs(function () {
        panelElement.removeChild(panelElement.firstChild)
        panelElement.appendChild(tripTimePanel)
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

    var element = Div(classPrefix)
    element.appendChild(speedLabel.element)
    element.appendChild(tabs.element)
    element.appendChild(panelElement)

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

    return { element: element }

}
