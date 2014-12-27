function TripDistanceTab (listener, setDarkTheme, setLightTheme) {
    var tab = TwoLineTab('TRIP', 'DISTANCE', 'TripDistanceTab',
        listener, setDarkTheme, setLightTheme)
    tab.select()
    return tab
}
