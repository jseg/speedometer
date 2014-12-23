function HeadingPanel () {

    function update () {
        var value
        if (heading === null) value = '\xb7'
        else value = Math.round(heading)
        valueNode.nodeValue = value
    }

    var classPrefix = 'HeadingPanel'

    var unitElement = Div(classPrefix + '-unit')
    unitElement.appendChild(TextNode('\xb0'))

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
        highlight: function () {
            classList.add(highlightClass)
            labelClassList.add(highlightClass)
            clearTimeout(highlightTimeout)
            highlightTimeout = setTimeout(function () {
                classList.remove(highlightClass)
                labelClassList.remove(highlightClass)
            }, 200)
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
    }

}
