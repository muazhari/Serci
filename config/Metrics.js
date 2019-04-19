import {Dimensions} from "react-native";

// const {height, width} = Dimensions.get("window");

const metrics = {
    DEVICE_WIDTH: Dimensions.get("window").width,
    DEVICE_HEIGHT: Dimensions.get("window").height
};

export default metrics;
