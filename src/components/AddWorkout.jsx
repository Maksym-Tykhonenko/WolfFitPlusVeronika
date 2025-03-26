import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, ImageBackground } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const AddWorkout = () => {
    const navigation = useNavigation();
    const [when, setWhen] = useState('Schedule');
    const [name, setName] = useState(null);
    const [calories, setCalories] = useState(null);
    const [duration, setDuration] = useState(null);
    const [exercises, setExercises] = useState([]);

    const [selectDuration, setSelectDuration] = useState(false);
    const [selectRest, setSelectRest] = useState(false);
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const today = new Date();
        const dateArray = [];
        
        if (when === 'Schedule') {
            for (let i = 0; i < 7; i++) {
                const futureDate = new Date(today);
                futureDate.setDate(today.getDate() + i);
                dateArray.push(futureDate);
            }
        } else {
            for (let i = -3; i <= 0; i++) {
                const pastDate = new Date(today);
                pastDate.setDate(today.getDate() + i);
                dateArray.push(pastDate);
            }
        }

        setDates(dateArray);
    }, [when]);

    const handleDurationChange = (event, selectedTime, index) => {
        setSelectDuration(false);
    
        if (selectedTime && exercises[index]) { 
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            const seconds = selectedTime.getSeconds();
    
            const formattedTime = `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    
            setExercises((prevExercises) => {
                const newExercises = prevExercises.map((ex, i) =>
                    i === index ? { ...ex, exDuration: formattedTime } : ex
                );
                console.log("Updated Exercises:", newExercises);
                return newExercises;
            });
        }
    };
    
    const handleSelectRest = (event, selectedTime, index) => {
        setSelectRest(false);
    
        if (selectedTime && exercises[index]) {
            const minutes = selectedTime.getMinutes();
            const seconds = selectedTime.getSeconds();
    
            const formattedRestTime = `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
    
            setExercises((prevExercises) => {
                const newExercises = prevExercises.map((ex, i) =>
                    i === index ? { ...ex, rest: formattedRestTime } : ex
                );
                console.log("Updated Exercises:", newExercises);
                return newExercises;
            });
        }
    };
        
    const handleDurationToggle = (index) => {
        setSelectDuration((prevIndex) => (prevIndex === index ? false : index));
    };
    
    const handleRestToggle = (index) => {
        setSelectRest((prevIndex) => (prevIndex === index ? false : index));
    };
        
    const handleAddExercise = () => {
        setExercises([
            ...exercises,
            { name: "", repetitions: "", sets: "", exDuration: "", rest: "" }
        ]);
    };    

    const handleSave = async () => {
        try {

            if (!name || !calories || !duration || exercises.length === 0 || exercises.some(ex => !ex.name || !ex.repetitions || !ex.sets || !ex.exDuration || !ex.rest)) {
                alert('Please fill out all fields before saving!');
                return;
            }

            const newWorkout = {
                when,
                name,
                calories,
                duration,
                exercises,
                selectedDate
            };
    
            const storageKey = when === 'Past' ? 'history' : 'workouts';
            
            const existingWorkouts = await AsyncStorage.getItem(storageKey);
            const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
    
            workouts.push(newWorkout);
    
            await AsyncStorage.setItem(storageKey, JSON.stringify(workouts));
    
            navigation.goBack();
        } catch (error) {
            console.error("Error saving workout:", error);
        }
    };
        
    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginBottom: 27}} onPress={() => navigation.goBack('')}>
                    <View style={{width: 13, height: 20, marginRight: 10}}>
                        <Icons type={'back'} />
                    </View>
                    <Text style={styles.backBtnText}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Add workout</Text>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={[styles.toggleBtn, when === 'Schedule' && {backgroundColor: '#731de5'}]} onPress={() => setWhen('Schedule')}>
                        <Text style={styles.toggleBtnText}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.toggleBtn, when === 'Past' && {backgroundColor: '#731de5'}]} onPress={() => setWhen('Past')}>
                        <Text style={styles.toggleBtnText}>Past</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="What will you call it?"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Calories</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a number"
                        placeholderTextColor="#999"
                        value={calories}
                        onChangeText={setCalories}
                    />

                    <Text style={styles.label}>Workout duration</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="In minutes"
                        placeholderTextColor="#999"
                        value={duration}
                        onChangeText={setDuration}
                    />

                    <Text style={styles.label}>Exercises</Text>
                    {exercises.map((exercise, index) => (
                        <View key={index} style={{ width: "100%", marginBottom: 12 }}>
                            <TextInput
                                style={styles.input}
                                placeholder="Exercise name"
                                placeholderTextColor="#999"
                                value={exercise.name}
                                onChangeText={(text) => {
                                    const newExercises = [...exercises];
                                    newExercises[index].name = text;
                                    setExercises(newExercises);
                                }}
                            />
                            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                                <TextInput
                                    style={[styles.input, { width: "48.5%", textAlign: "center" }]}
                                    placeholder="Repetitions"
                                    placeholderTextColor="#999"
                                    value={exercise.repetitions}
                                    onChangeText={(text) => {
                                        const newExercises = [...exercises];
                                        newExercises[index].repetitions = text;
                                        setExercises(newExercises);
                                    }}
                                />
                                <TextInput
                                    style={[styles.input, { width: "48.5%", textAlign: "center" }]}
                                    placeholder="Sets"
                                    placeholderTextColor="#999"
                                    value={exercise.sets}
                                    onChangeText={(text) => {
                                        const newExercises = [...exercises];
                                        newExercises[index].sets = text;
                                        setExercises(newExercises);
                                    }}
                                />
                                <TouchableOpacity style={styles.exBtn} onPress={() => handleDurationToggle(index)}>
                                    <Text style={styles.exBtnText}>{exercise.exDuration ? exercise.exDuration : "Duration hh:mm"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.exBtn} onPress={() => handleRestToggle(index)}>
                                    <Text style={styles.exBtnText}>{exercise.rest ? exercise.rest : "Rest mm:ss"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                    {selectDuration !== false && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            themeVariant="dark"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedTime) => handleDurationChange(event, selectedTime, selectDuration)}
                        />
                    )}
                    {selectRest !== false && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            themeVariant="dark"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedTime) => handleSelectRest(event, selectedTime, selectRest)}
                        />
                    )}

                    <Text style={styles.backBtnText} onPress={handleAddExercise}>+ Add exercise</Text>

                    <View style={styles.datesContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: "row" }}>
                            {dates.map((date, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    style={[styles.dateBox, selectedDate === date && {backgroundColor: '#731de5'}]} 
                                    onPress={() => setSelectedDate(date)}
                                    >
                                    <Text style={styles.dateText}>{format(date, 'eee, dd')}</Text>
                                    <Text style={styles.monthText}>{format(date, 'MMM')}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={{height: 100}} />
                </ScrollView>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>

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

    toggleContainer: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(120, 120, 120, 0.3)',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        padding: 2
    },

    toggleBtn: {
        width: '50%',
        height: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    toggleBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 18,
    },

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 20,
        marginBottom: 12
    },

    exBtn: {
        width: '48.5%',
        padding: 18,
        borderRadius: 14,
        backgroundColor: '#261305',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    exBtnText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#999',
        lineHeight: 24
    },

    input: {
        width: '100%',
        backgroundColor: '#261305',
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 12,
        color: '#fff',
        fontSize: 17,
        fontWeight: '400',
        marginBottom: 15
    },

    saveBtn: {
        width: '100%',
        padding: 18,
        borderRadius: 20,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30
    },

    saveBtnText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 20.3
    },

    datesContainer: {
        marginTop: 20,
        marginBottom: 30
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
    
});

export default AddWorkout;
