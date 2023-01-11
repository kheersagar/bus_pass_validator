import 'dotenv/config';
export default {
  "expo": {
    "name": "Pass Checker",
    "slug": "Pass-Checker",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.Validator",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.sagarrrr.Validator",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "apiKey": process.env.apiKey,
      "authDomain": process.env.authDomain,
      "projectId": process.env.projectId,
      "storageBucket": process.env.storageBucket,
      "messagingSenderId": process.env.messagingSenderId,
      "appId": process.env.appId,
      "eas": {
        "projectId": "40bc5605-18c3-47d7-abc3-156d47834158"
      }
    }
  }
}
