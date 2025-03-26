import { View } from "react-native"
import ArticleDetails from "../components/ArticleDetails"

const ArticleDetailsScreen = ({ route }) => {
    const { article } = route.params;

    return (
        <View style={styles.container}>
            <ArticleDetails article={article} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default ArticleDetailsScreen;