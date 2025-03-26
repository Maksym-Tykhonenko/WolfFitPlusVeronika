import { View } from "react-native"
import Articles from "../components/Articles"
import Menu from "../components/Menu";

const ArticlesScreen = () => {
    return (
        <View style={styles.container}>
            <Articles />
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

export default ArticlesScreen;