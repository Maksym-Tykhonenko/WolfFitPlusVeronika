import { View } from "react-native"
import AddMeal from "../components/AddMeal"

const AddMealScreen = () => {

    return (
        <View style={styles.container}>
            <AddMeal />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default AddMealScreen;