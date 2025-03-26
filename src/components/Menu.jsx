import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Menu = () => {
    const navigation = useNavigation();
    const [activeButton, setActiveButton] = useState('GymScreen');

    const handleNavigate = (screen) => {
        setActiveButton(screen);
        navigation.navigate(screen)
    };    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setActiveButton(currentRoute);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('GymScreen')}>
                <View style={{width: 32, height: 32, marginBottom: 8}}>
                    <Icons type={'1'} active={activeButton === 'GymScreen'}/>
                </View>
                <Text style={[styles.btnText, activeButton === 'GymScreen' && {color: '#fa8009'}]}>Gym</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('FoodScreen')}>
                <View style={{width: 32, height: 32, marginBottom: 8}}>
                    <Icons type={'2'} active={activeButton === 'FoodScreen'}/>
                </View>
                <Text style={[styles.btnText, activeButton === 'FoodScreen' && {color: '#fa8009'}]}>Food</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('ArticlesScreen')}>
                <View style={{width: 32, height: 32, marginBottom: 8}}>
                    <Icons type={'3'} active={activeButton === 'ArticlesScreen'}/>
                </View>
                <Text style={[styles.btnText, activeButton === 'ArticlesScreen' && {color: '#fa8009'}]}>Articles</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleNavigate('ProfileScreen')}>
                <View style={{width: 32, height: 32, marginBottom: 8}}>
                    <Icons type={'4'} active={activeButton === 'ProfileScreen'}/>
                </View>
                <Text style={[styles.btnText, activeButton === 'ProfileScreen' && {color: '#fa8009'}]}>Profile</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: 'center',
        padding: 16,
        paddingBottom: 30,
        flexDirection: 'row',
        backgroundColor: '#261305',
    },
    
    button: {
        width: '23%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#999'
    }
});

export default Menu;
