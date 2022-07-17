#!/usr/bin/env bash
xcodebuild -project "safari/GitHub Navbar Quick Access.xcodeproj" -target extension
open -a "$(pwd)safari/build/Release/GitHub Navbar Quick Access.app"
