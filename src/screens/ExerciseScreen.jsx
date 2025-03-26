import { View } from "react-native"
import Exercise from "../components/Exercise"

const ExerciseScreen = () => {

    return (
        <View style={styles.container}>
            <Exercise />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ExerciseScreen;