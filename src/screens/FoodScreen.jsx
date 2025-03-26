import { View } from "react-native"
import Food from "../components/Food"
import Menu from "../components/Menu";

const FoodScreen = () => {
    return (
        <View style={styles.container}>
            <Food />
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

export default FoodScreen;