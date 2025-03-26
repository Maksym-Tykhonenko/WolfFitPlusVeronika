import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Workouts = ({ workout }) => {
    const navigation = useNavigation();
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false); 
    const [timeLeft, setTimeLeft] = useState(workout.duration * 60);
    const [timers, setTimers] = useState([]);
    const [isPaused, setIsPaused] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    const date = formattedDate.replace(/\//g, ".");

    const intervalTime = workout.duration * 60 / workout.exercises.length;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    
    useEffect(() => {
        if (isPaused || !isStarted) return; 
    
        if (exerciseIndex < workout.exercises.length) {
            const interval = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        setExerciseIndex(prevIndex => prevIndex + 1);
                        setTimeLeft(intervalTime);
                        return intervalTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
    
            setTimers(prevTimers => [...prevTimers, interval]);
    
            return () => clearInterval(interval);
        } else {
            setIsCompleted(true);
        }
    }, [exerciseIndex, isPaused, isStarted, workout.exercises.length, intervalTime]);
    
    const handleStart = () => {
        setIsStarted(true);
        setIsPaused(false);
        setExerciseIndex(0);
        setTimeLeft(intervalTime);
        setIsCompleted(false);
    };

    const handlePause = () => {
        if (isPaused) {
            timers.forEach(timer => {
                timer = setInterval(() => {
                    setTimeLeft(prevTime => prevTime - 1);
                }, 1000);
            });
            setIsPaused(false);
        } else {
            timers.forEach(timer => clearInterval(timer));
            setIsPaused(true);
        }
    };
        
    useEffect(() => {
        return () => {
            handleStop();
        };
    }, []);
    
    const handleStop = () => {
        setIsStarted(false);
        setExerciseIndex(0);
        setTimeLeft(workout.duration * 60);
        setIsPaused(false);
        timers.forEach(timer => clearInterval(timer));
        setTimers([]);
    };

    useEffect(() => {
        const saveToHistory = async () => {
            try {
                const existingHistory = await AsyncStorage.getItem("history");
                const history = existingHistory ? JSON.parse(existingHistory) : [];
                history.push(workout);
                await AsyncStorage.setItem("history", JSON.stringify(history));
            } catch (error) {
                console.error("Error saving workout to history:", error);
            }
        };
    
        if (isCompleted) {
            saveToHistory();
        }
    }, [isCompleted, workout]);    

    const handleRestart = async () => {
        handleStart();
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginBottom: 27}}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.goBack('')}>
                        <View style={{width: 13, height: 20, marginRight: 10}}>
                            <Icons type={'back'} />
                        </View>
                        <Text style={styles.backBtnText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{workout.title}</Text>
                </View>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: 16}}>
                    <Text style={styles.workoutDesc}>{date}</Text>
                    {isStarted && <Text style={styles.timer}>{formatTime(timeLeft)}</Text>}
                    <Text style={styles.workoutDesc}>{workout.duration} min</Text>
                </View>

                <ScrollView style={{width: '100%'}}>
                    {
                        workout.exercises.map((item, index) => (
                            <TouchableOpacity 
                                style={styles.workoutCard}
                                key={index}
                                >
                                <View style={{width: 52, height: 52, marginRight: 16}}>
                                    <Icons type={'workout'} />
                                </View>
                                <View style={{width: '78%'}}>
                                    <Text style={styles.workoutTitle}>{item.name}</Text>
                                    <Text style={styles.workoutDesc}>{item.description}</Text>
                                    {item.exDuration && <Text style={styles.workoutDesc}>{item.exDuration} / {item.repetitions} reps / {item.sets} sets</Text>}
                                </View>

                                {
                                    isStarted && (
                                        <>
                                            {exerciseIndex === index && timeLeft > 0 && (
                                                <ActivityIndicator size="small" color="#731de5" marginLeft={-20} />
                                            )}
                                        </>
                                    )
                                }

                            </TouchableOpacity>    
                        ))
                    }               
                    <View style={{height: 100}} />
                </ScrollView>

                {
                    isStarted ? (
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', bottom: 30}}>
                            <TouchableOpacity style={styles.toolBtn} onPress={handleStop}>
                                <Icons type={'stop'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.toolBtn} onPress={handlePause}>
                                <Icons type={'pause'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.startBtn, {width: '60%'}]} onPress={handlePause}>
                                <Text style={styles.startBtnText}>{isPaused ? 'Continue' : 'In process'}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity style={[styles.startBtn, {position: 'absolute', bottom: 30}]} onPress={isCompleted ? handleRestart() : handleStart()}>
                            <Text style={styles.startBtnText}>{isCompleted ? 'Restart' : 'Start'}</Text>
                        </TouchableOpacity>
                    )
                }

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

    backBtnText: {
        color: '#731de5',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
        marginRight: 16
    },

    title: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
        alignSelf: 'center'
    },

    timer: {
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fa8009', 
        alignSelf: 'center'
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
        lineHeight: 16.7,
    },

    startBtn: {
        width: '100%',
        padding: 18,
        borderRadius: 20,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
    },

    startBtnText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 20.3
    },

    toolBtn: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 16
    }


});

export default Workouts;