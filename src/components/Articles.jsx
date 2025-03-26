import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions, StyleSheet, Share, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";
import articles from "../constants/articles";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Articles = () => {
    const navigation = useNavigation();

    const handleShare = async (article) => {
        try {
            await Share.share({
                message: `${article.title}\n\n${article.content}`,
            });
        } catch (error) {
            console.error("Error sharing article:", error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.upperTitle}>Helpful articles</Text>

                <ScrollView style={{width: '100%', flexGrow: 1}} contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    {
                        articles.map((article, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.articleCard}
                                onPress={() => navigation.navigate('ArticleDetailsScreen', {article: article})}
                                >
                                <Image source={article.image} style={styles.articleImage} />
                                <View style={{width: '100%', flexGrow: 1, padding: 10}}>
                                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                        <Text style={styles.articleTitle} numberOfLines={1} ellipsizeMode="tail">{article.title}</Text>
                                        <TouchableOpacity style={{width: 38, height: 35, padding: 10}} onPress={() => handleShare(article)}>
                                            <Icons type={'share'} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.articleContent} numberOfLines={1} ellipsizeMode="tail">{article.content}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        paddingTop: height * 0.07,
        paddingBottom: 100
    },

    upperTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 19.1,
        marginBottom: 22
    },

    articleCard: {
        width: '48.5%',
        height: 205,
        borderRadius: 16,
        backgroundColor: '#261305',
        padding: 2,
        marginBottom: 12
    },

    articleImage: {
        width: '100%',
        height: 128,
        borderTopColor: '#261305',
        borderWidth: 2,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        resizeMode: 'cover'
    },

    articleTitle: {
        width: '80%',
        fontSize: 15,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 20.25,
        marginBottom: 4
    },

    articleContent: {
        width: '100%',
        fontSize: 13,
        color: '#999',
        fontWeight: '400',
        lineHeight: 15.5,
    }

});

export default Articles;