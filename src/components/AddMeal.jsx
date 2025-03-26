import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView, ImageBackground } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const AddMeal = () => {
    const navigation = useNavigation();
    const [name, setName] = useState(null);
    const [calories, setCalories] = useState(null);
    const [grams, setGrams] = useState(null);
    const [carbo, setCarbo] = useState(null);
    const [proteins, setProteins] = useState(null);
    const [fats, setFats] = useState(null);

    const [selectTime, setSelectTime] = useState(false);
    const [time, setTime] = useState(null);
    
    const handleSelectTime = (event, selectedTime, index) => {
        setSelectTime(false);
    
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

            setTime(formattedTime)
        }

    };
        
    const handleTimeToggle = (index) => {
        setSelectTime((prevIndex) => (prevIndex === index ? false : index));
    };
          
    const handleSave = async () => {
        try {

            if (!name || !calories || !grams || !time) {
                alert('Please fill out all fields before saving!');
                return;
            }

            const date = new Date();

            const newMeal = {
                name,
                calories,
                grams,
                carbo,
                proteins,
                fats,
                time,
                date
            };
                
            const existingFood = await AsyncStorage.getItem('food');
            const food = existingFood ? JSON.parse(existingFood) : [];
    
            food.push(newMeal);
    
            await AsyncStorage.setItem('food', JSON.stringify(food));
    
            navigation.goBack();
        } catch (error) {
            console.error("Error saving your meal:", error);
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

                <Text style={styles.title}>Add meal</Text>

                <ScrollView style={{width: '100%'}}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="What will you call it?"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Exercises</Text>
                        <View style={{ width: "100%", marginBottom: 12 }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    style={[styles.input, {width: '48.5%'}]}
                                    placeholder="Size, g"
                                    placeholderTextColor="#999"
                                    value={grams}
                                    onChangeText={setGrams}
                                />
                                <TextInput
                                    style={[styles.input, {width: '48.5%'}]}
                                    placeholder="Kcal"
                                    placeholderTextColor="#999"
                                    value={calories}
                                    onChangeText={setCalories}
                                />
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    style={[styles.input, {width: '40%'}]}
                                    placeholder="Carbohydrates"
                                    placeholderTextColor="#999"
                                    value={carbo}
                                    onChangeText={setCarbo}
                                />
                                <TextInput
                                    style={[styles.input, {width: '28%'}]}
                                    placeholder="Proteins"
                                    placeholderTextColor="#999"
                                    value={proteins}
                                    onChangeText={setProteins}
                                />
                                <TextInput
                                    style={[styles.input, {width: '26%'}]}
                                    placeholder="Fats"
                                    placeholderTextColor="#999"
                                    value={fats}
                                    onChangeText={setFats}
                                />
                            </View>
                        </View>

                    <Text style={styles.label}>Time of intake</Text>
                    <TouchableOpacity style={styles.indicatorBrn} onPress={handleTimeToggle}>
                        <Text style={styles.indicatorBrnText}>{time ? time : 'XX:XX'}</Text>
                    </TouchableOpacity>

                    {selectTime !== false && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            themeVariant="dark"
                            is24Hour={false}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleSelectTime}
                        />
                    )}

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

    indicatorBrn: {
        width: 120,
        padding: 18,
        borderRadius: 14,
        backgroundColor: '#261305',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },

    indicatorBrnText: {
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

export default AddMeal;
