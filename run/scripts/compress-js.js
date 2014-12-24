#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs')
var uglifyJs = require('uglify-js')

var files = [
    'AltitudePanel',
    'AltitudeStatsPanel',
    'AltitudeTab',
    'AveragePosition',
    'AverageSpeedPanel',
    'AverageSpeedTab',
    'ClockPanel',
    'ClockTab',
    'CompassPanel',
    'DistanceBetweenPositions',
    'Div',
    'FormatAltitude',
    'HeadingPanel',
    'HeadingTab',
    'ImperialUnit',
    'MainPanel',
    'MaxSpeedPanel',
    'MaxSpeedTab',
    'MetricUnit',
    'OnClick',
    'OneLineTab',
    'Page1Tab',
    'Page2Tab',
    'ResetButton',
    'Settings',
    'SettingsPanel',
    'SettingsTab',
    'SpeedLabel',
    'StartStopButton',
    'StatField',
    'StatusPanel',
    'Tabs',
    'TextNode',
    'TripDistance',
    'TripDistancePanel',
    'TripDistanceTab',
    'TripTimePanel',
    'TripTimeTab',
    'TwoDigitPad',
    'TwoLineTab',
    'Main',
]

var source = '(function () {\n'
files.forEach(function (file) {
    source += fs.readFileSync('js/' + file + '.js', 'utf8') + ';\n'
})
source += '\n})()'

var ast = uglifyJs.parse(source)
ast.figure_out_scope()
var compressor = uglifyJs.Compressor({})
var compressedAst = ast.transform(compressor)
compressedAst.figure_out_scope()
compressedAst.compute_char_frequency()
compressedAst.mangle_names()
var compressedSource = compressedAst.print_to_string()

fs.writeFileSync('combined.js', source)
fs.writeFileSync('compressed.js', compressedSource)
