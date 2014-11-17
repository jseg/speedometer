function MainPanel () {

    function setSpeed (n) {
        speedLabel.setSpeed(n)
    }

    var speedLabel = SpeedLabel()

    var element = Div('MainPanel')
    element.appendChild(speedLabel.element)

    setInterval(function () {
        setSpeed(Math.random() * 10)
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

    return { element: element }

}
