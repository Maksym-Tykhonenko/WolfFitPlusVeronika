import { View } from "react-native"
import Workouts from "../components/Workouts"

const WorkoutsScreen = ({ route }) => {
    const { workout } = route.params;

    return (
        <View style={styles.container}>
            <Workouts workout={workout} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default WorkoutsScreen;