#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs'),
    uglifyCss = require('uglifycss')

var files = [
    'Main',
    'AverageSpeedPanel',
    'Button',
    'BottomPanel',
    'Tab',
    'ClockPanel',
    'ClockTab',
    'MaxSpeedPanel',
    'ResetButton',
    'SettingsPanel',
    'SettingsTab',
    'SpeedLabel',
    'StartStopButton',
    'StatusPanel',
    'TripDistancePanel',
    'TripTimePanel',
    'Tabs',
    'MainPanel',
]

var source = ''
files.forEach(function (file) {
    source += fs.readFileSync('css/' + file + '.css', 'utf-8') + '\n'
})

var compressCss = uglifyCss.processString(source)
fs.writeFileSync('compressed.css', compressCss)
