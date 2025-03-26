import { View } from "react-native"
import Gym from "../components/Gym"
import Menu from "../components/Menu";

const GymScreen = () => {
    return (
        <View style={styles.container}>
            <Gym />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
}

export default GymScreen;