import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView, ImageBackground, Dimensions, StyleSheet } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Food = () => {
    const navigation = useNavigation();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [food, setFood] = useState([]);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const today = new Date();
        const dateArray = [];

        for (let i = -7; i <= 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dateArray.push(date);
        }

        setDates(dateArray);
        setSelectedDate(today);
    }, []);

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const foodData = await AsyncStorage.getItem("food");

                if (foodData) {
                    setFood(JSON.parse(foodData));
                }
            } catch (error) {
                console.error("Error retrieving food records:", error);
            }
        };

        fetchFood();
    }, []);

    const filterByDate = (data, selectedDate) => {
        return data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === selectedDate.toDateString();
        });
    };

    const filteredFood = filterByDate(food, selectedDate);

    useEffect(() => {
        if (selectedDate && scrollViewRef.current) {
            const selectedIndex = dates.findIndex(date => date.toDateString() === selectedDate.toDateString());
            if (selectedIndex !== -1) {
                scrollViewRef.current.scrollTo({ x: selectedIndex * 100, animated: true });
            }
        }
    }, [selectedDate, dates]);

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.upperTitle}>Dietary plan</Text>

                <View style={styles.datesContainer}>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false} 
                        style={{ flexDirection: "row" }}
                        ref={scrollViewRef}
                        >
                        {dates.map((date, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[styles.dateBox, selectedDate.toDateString() === date.toDateString() && {backgroundColor: '#731de5'}]} 
                                onPress={() => setSelectedDate(date)}
                                >
                                <Text style={styles.dateText}>{format(date, 'eee, dd')}</Text>
                                <Text style={styles.monthText}>{format(date, 'MMM')}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView style={{width: '100%'}}>
                {
                    filteredFood.length > 0 && (
                        filteredFood.map((meal, index) => (
                            <View key={index} style={{width: '100%', marginBottom: 20}}>
                                <Text style={styles.foodTime}>{meal.time}</Text>
                                <View style={styles.foodCard}>
                                    <Text style={styles.foodName}>{meal.name}</Text>
                                    <Text style={styles.foodDesc}>{meal.grams}g / {meal.calories} kcal / {meal.carbo} carbs / {meal.proteins} proteins / {meal.fats} fats</Text>
                                </View>  
                            </View>
                        ))
                    )
                }
                <View style={{height: 150}} />
                </ScrollView>

                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddMealScreen')}>
                    <Icons type={'add'} />
                </TouchableOpacity>

                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        paddingTop: height * 0.07
    },

    upperTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 19.1,
        marginBottom: 22
    },

    datesContainer: {
        marginBottom: 30,
        height: 53
    },

    dateBox: {
        marginRight: 10,
        alignItems: 'center',
        width: 100,
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(120, 120, 120, 0.3)',
    },

    dateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    monthText: {
        color: '#999',
        fontSize: 12,
        fontWeight: '400',
    },

    label: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 20.3,
        color: '#fff',
        marginBottom: 16
    },

    foodTime: {
        fontSize: 17,
        fontWeight: '500',
        lineHeight: 20.3,
        color: '#fff',
        textAlign: 'right',
        marginBottom: 8
    },

    foodCard: {
        width: '100%',
        padding: 16,
        borderRadius: 24,
        backgroundColor: '#261305',
    },

    foodName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 19.1,
        marginBottom: 12
    },

    foodDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#999',
        lineHeight: 16.7
    },

    addBtn: {
        width: 64,
        height: 64,
        padding: 18,
        borderRadius: 100,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 110,
        right: 0
    },

});

export default Food;