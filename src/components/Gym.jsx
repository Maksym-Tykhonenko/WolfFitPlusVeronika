import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView, Image, Dimensions, StyleSheet, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Gym = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [history, setHistory] = useState([]);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem("userData");
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                }
            } catch (error) {
                console.error("Error retrieving user data:", error);
            }
        };

        fetchUserData();
    }, []);

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
        const fetchWorkoutsAndHistory = async () => {
            try {
                const workoutsData = await AsyncStorage.getItem("workouts");
                const historyData = await AsyncStorage.getItem("history");

                if (workoutsData) {
                    setWorkouts(JSON.parse(workoutsData));
                }
                if (historyData) {
                    setHistory(JSON.parse(historyData));
                }
            } catch (error) {
                console.error("Error retrieving workouts and history:", error);
            }
        };

        fetchWorkoutsAndHistory();
    }, []);

    const filterByDate = (data, selectedDate) => {
        return data.filter(item => {
            const itemDate = new Date(item.selectedDate);
            return itemDate.toDateString() === selectedDate.toDateString();
        });
    };

    const filteredWorkouts = filterByDate(workouts, selectedDate);
    const filteredHistory = filterByDate(history, selectedDate);

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

                <Text style={styles.upperTitle}>Wolf Fit Plus</Text>

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
                        userData?.selectedProgram && (
                            <View style={{width: '100%'}}>
                                <Text style={styles.label}>Workouts</Text>
                                {
                                    userData?.selectedProgram.workouts.map((workout, index) => (
                                        <TouchableOpacity 
                                            style={styles.workoutCard}
                                            onPress={() => navigation.navigate('WorkoutsScreen', {workout: workout})}
                                            key={index}
                                            >
                                            <View style={{width: 52, height: 52, marginRight: 16}}>
                                                <Icons type={'workout'} />
                                            </View>
                                            <View style={{height: '100%', justifyContent: 'space-between'}}>
                                                <Text style={styles.workoutTitle}>{workout.title}</Text>
                                                <Text style={styles.workoutDesc}>{workout.duration} min / {workout.exercises.length} workouts</Text>
                                            </View>
                                        </TouchableOpacity>    
                                    ))
                                }
                                {
                                    filteredWorkouts?.map((workout, index) => (
                                        <TouchableOpacity 
                                            style={styles.workoutCard}
                                            onPress={() => navigation.navigate('WorkoutsScreen', {workout: workout})}
                                            key={index}
                                            >
                                            <View style={{width: 52, height: 52, marginRight: 16}}>
                                                <Icons type={'workout'} />
                                            </View>
                                            <View style={{height: '100%', justifyContent: 'space-between'}}>
                                                <Text style={styles.workoutTitle}>{workout.name}</Text>
                                                <Text style={styles.workoutDesc}>{workout.duration} min / {workout.exercises.length} workouts</Text>
                                            </View>
                                        </TouchableOpacity>  
                                    ))
                                }
                            </View>
                        ) 
                    }
                    {
                        filteredHistory.length > 0 && (
                            <View style={{width: '100%'}}>
                                <Text style={styles.label}>Workout History</Text>
                                {
                                    filteredHistory?.map((workout, index) => (
                                        <TouchableOpacity 
                                            style={[styles.workoutCard, {opacity: 0.5}]}
                                            onPress={() => navigation.navigate('WorkoutsScreen', {workout: workout})}
                                            key={index}
                                            >
                                            <View style={{width: 52, height: 52, marginRight: 16}}>
                                                <Icons type={'workout'} />
                                            </View>
                                            <View style={{height: '100%', justifyContent: 'space-between'}}>
                                                <Text style={[styles.workoutTitle, { textDecorationLine: 'line-through' }]}>{workout.name}</Text>
                                                <Text style={styles.workoutDesc}>{workout.duration} min / {workout.calories} cal / {workout.exercises.length} workouts</Text>
                                            </View>
                                            <View style={{width: 16, height: 16, position: 'absolute', right: 15, top: 34}}>
                                                <Icons type={'done'} />
                                            </View>
                                        </TouchableOpacity>  
                                    ))
                                }
                            </View>
                        )
                    }
                <View style={{height: 150}} />
                </ScrollView>

                {
                    !userData?.selectedProgram && (
                        <View style={{width: '100%', flexGrow: 1}}>
                            <Text style={[styles.label, {marginBottom: 450, textAlign: 'center'}]}>There are no trainings on this day, you can add one</Text>
                            <Image source={require('../assets/decor/wolf-form2.png')} style={{width: 390, height: 300, resizeMode: 'contain', position: 'absolute', bottom: 120, right: -20}} />
                        </View>
                    )
                }


                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddWorkoutScreen')}>
                    <Text style={styles.addBtnText}>Add workout</Text>
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

    workoutCard: {
        width: '100%',
        height: 84,
        padding: 16,
        borderRadius: 24,
        backgroundColor: '#261305',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: 16
    },

    workoutTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 19.1,
        marginBottom: 12
    },

    workoutDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#999',
        lineHeight: 16.7
    },

    addBtn: {
        width: '100%',
        padding: 18,
        borderRadius: 20,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 110
    },

    addBtnText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 20.3
    },


});

export default Gym;