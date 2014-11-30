#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs'),
    uglifyCss = require('uglifycss')

var files = [
    'Main',
    'SpeedPanel',
    'Button',
    'BottomPanel',
    'Tab',
    'AverageSpeedTab',
    'ClockPanel',
    'ClockTab',
    'MaxSpeedTab',
    'ResetButton',
    'SettingsPanel',
    'SettingsTab',
    'SpeedLabel',
    'StartStopButton',
    'StatusPanel',
    'TripDistancePanel',
    'TripDistanceTab',
    'TripTimeTab',
    'Tabs',
    'MainPanel',
]

var source = ''
files.forEach(function (file) {
    source += fs.readFileSync('css/' + file + '.css', 'utf-8') + '\n'
})

var compressCss = uglifyCss.processString(source)
fs.writeFileSync('compressed.css', compressCss)
