import {Platform} from "react-native";

const EnvInfo = {
    IS_ENV_DEVELOPMENT: __DEV__,
    IS_ANDROID: Platform.OS === "android",
    IS_IOS: Platform.OS === "ios",
    IS_DEBUG_MODE_ENABLED: Boolean(window.navigator.userAgent)
};

export default EnvInfo;
