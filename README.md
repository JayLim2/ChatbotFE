# ReactChatBot
AI Chat Bot for English learning (on React Native)

<h1>How to deploy environment</h1>
<ol>
    <li>Install WebStorm</li>
    <li>Install Yarn</li>
    <li>npm install expo-cli –global</li>
    <li>Execute command: expo init ProjectName in random folder</li>
    <li>сd ProjectName</li>
    <li>yarn install</li>
    <li>react-native start</li>
    <li>react-native run-android</li>
</ol>
Notes:
<ul>
    <li>
    To open "Dev Menu" shake mobile device.
    </li>
    <li>
    In "Dev Settings" set server URL: localhost:8081
    </li>
    <li>
    In "Dev Menu" enable Live Reload and Hot Reload.
    </li>
    <li>
    Check device connection: "adb devices"
        <ul>
            <li>
                To fix adb "unrecognized command" add path to ADB into %PATH% variable.
            </li>
            <li>
                ADB can be found in Android/Sdk/platform-tools directory.
            </li>
        </ul>
    </li>
    <li>
        ReactNative need Android 9 (<b>API level 28</b>)
    </li>
</ul>