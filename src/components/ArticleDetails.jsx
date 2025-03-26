import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image, Share, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const ArticleDetails = ({ article }) => {
    const navigation = useNavigation();

    const handleShare = async () => {
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

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 27}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack('')}>
                        <View style={{width: 13, height: 20, marginRight: 10}}>
                            <Icons type={'back'} />
                        </View>
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 47, height: 44, padding: 10}} onPress={() => handleShare(article)}>
                        <Icons type={'share'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.title}>{article.title}</Text>
                    <Image source={article.image} style={{width: '100%', height: 200, borderRadius: 20, resizeMode: 'cover', marginBottom: 20}} />
                    <Text style={styles.content}>{article.content}</Text>
                    <View style={{height: 100}} />
                </ScrollView>

                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        paddingTop: height * 0.07
    },

    backBtnText: {
        color: '#731de5',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        marginRight: 16
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 41,
        marginBottom: 24,
        alignSelf: 'flex-start'
    },

    content: {
        fontSize: 16,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 24,
    }
    
});

export default ArticleDetails;
