function Page1Tab (listener) {
    return OneLineTab('PAGE 1', 'Page1Tab', function (wasSelected) {
        if (!wasSelected) listener()
    })
}
