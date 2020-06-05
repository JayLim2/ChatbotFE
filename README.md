# Quick Start

To start development of this application, you need to:
1. Enable **developer mode** on your Android phone
2. Connect Android-based phone with PC by USB.
3. Enable **USB debug** in developer menu on phone.
4. Download this source code.
5. Install NodeJS (version 12+)
6. Open project in WebStorm or another IDE for TypeScript
7. Open root folder in terminal ("Terminal" in WebStorm) and run `npm install`

Then if you would like develop application in DEBUG mode, without installing on your device,
you need do the following:
1. Run in command line: `npm install -g expo-cli`
_This command installs Expo CLI on your PC. This is one time action._
2. Connect Android-based phone with PC by USB.
2. Open project root folder in terminal ("Terminal" in WebStorm) and run `expo start`

If you want eject ReactNative scripts to native platform code (Android/iOS):
1. Make sure you already installed Expo (`npm install -g expo-cli`)
2. Open project root folder in terminal ("Terminal" in WebStorm) and run `expo start`
3. Run in command line: `expo eject`
_Expo will ask names of Android/iOS projects. You can name their such as you want._

If you want run native projects in DEBUG mode, **with** installing on your device:
1. Make sure you already ejected sources to native platform code.
2. Open project root folder in terminal ("Terminal" in WebStorm) and run `expo start`
3. Run in command line: `npm run android`
4. Accept installing application on your device when Android ask it.
