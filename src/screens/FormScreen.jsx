import { View } from "react-native"
import Form from "../components/Form"

const FormScreen = () => {

    return (
        <View style={styles.container}>
            <Form />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default FormScreen;