1. "react-navigation": "3.0.9"  https://reactnavigation.org/docs/en/getting-started.html;
2. "native-base": "^2.10.0"  http://docs.nativebase.io/docs/GetStarted.html;
3. "react-redux" "redux"  https://blog.cloudboost.io/getting-started-with-react-native-and-redux-6cd4addeb29;
4. "redux-thunk": "^2.3.0"  https://github.com/reduxjs/redux-thunk;
5. "react-native-keyboard-aware-scroll-view": "^0.8.0"  https://github.com/APSL/react-native-keyboard-aware-scroll-view

## to build debug.apk run 
    mkdir -p android/app/src/main/assets && rm -rf android/app/build && react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && cd android && ./gradlew assembleDebug 

## Создание билда для android First, from your app's root dir, run the following command: 
    react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug 
 
## Then the second and final step: 
    cd android && ./gradlew assembleDebug 
 
## If ERROR when run dev-mode, need clean all build android: 
    cd android && ./gradlew clean 
 
## Generating the release APK: 
    cd android && ./gradlew assembleRelease 
    Run: react-native run-android --variant=release 

## Создание билда для ios 
    react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios react-native run-ios --configuration Release
