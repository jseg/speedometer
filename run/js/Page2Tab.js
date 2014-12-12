function Page2Tab (listener) {
    return OneLineTab('PAGE 2', 'Page2Tab', function (wasSelected) {
        if (!wasSelected) listener()
    })
}
