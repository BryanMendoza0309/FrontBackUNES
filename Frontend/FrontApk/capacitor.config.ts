import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FrontApk',
  webDir: 'www',
  bundledWebRuntime: false,
  /*plugins: {
    android: {
      path: "android/app/src/main/AndroidManifest.xml"
    }
 }*/
 "plugins": {
  "CapacitorHttp": {
    "enabled": true
  }
}
};


export default config;
