import { View } from "react-native"
import AddWorkout from "../components/AddWorkout"

const AddWorkoutScreen = () => {

    return (
        <View style={styles.container}>
            <AddWorkout />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddWorkoutScreen;