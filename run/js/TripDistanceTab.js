function TripDistanceTab (listener, setDarkTheme, setLightTheme, enableTransition) {
    var tab = TwoLineTab('TRIP', 'DISTANCE', 'TripDistanceTab',
        listener, setDarkTheme, setLightTheme, enableTransition)
    tab.select()
    return tab
}
