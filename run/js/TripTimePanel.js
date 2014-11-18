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

    var element = Div(classPrefix + ' BottomPanel')
    element.appendChild(hourElement)
    element.appendChild(TextNode(':'))
    element.appendChild(minuteElement)
    element.appendChild(secondElement)

    var tripTime = 0,
        startTime = null

    return {
        element: element,
        start: function () {
            startTime = Date.now()
        },
        stop: function () {
            tripTime += Date.now() - startTime
            startTime = null
        },
        update: function () {

            if (startTime !== null) {
                var now = Date.now()
                tripTime += now - startTime
                startTime = now
            }

            var tripSeconds = tripTime / 1000
            hourNode.nodeValue = TwoDigitPad(Math.floor(tripSeconds / (60 * 60)))
            minuteNode.nodeValue = TwoDigitPad(Math.floor(tripSeconds / 60))
            secondNode.nodeValue = TwoDigitPad(Math.floor(tripSeconds))

        },
    }

}
