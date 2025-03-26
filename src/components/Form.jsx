import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import programs from "../constants/programs.js";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const titles = [
    'Your settings',
    'Height and weight',
    'Lifestyle',
    'Training',
    'Level',
    'Your goal',
    'Select a program'
];

const Form = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [target, setTarget] = useState(null);
    const [gender, setGender] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [lifestyle, setLifestyle] = useState(null);
    const [trainingPlace, setTrainingPlace] = useState(null); 
    const [trainingFrequency, setTrainingFrequency] = useState(null);
    const [level, setLevel] = useState(null);
    const [goal, setGoal] = useState(null);
    const [goalTermin, setGoalTermin] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    const handleNext = async () => {
        if (step === 0 && target && gender) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 1 && height && weight) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 2 && lifestyle) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 3 && trainingPlace && trainingFrequency) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 4 && level) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 5 && goal && goalTermin) {
            setStep(prevStep => prevStep + 1);
        } else if (step === 6 && selectedProgram) {
            await handleSave();
            navigation.navigate("GymScreen");
        }
    };

    const buttonDisabled = () => {
        if (step === 0 && (!target || !gender)) return true;
        if (step === 1 && (!height || !weight)) return true;
        if (step === 2 && !lifestyle) return true;
        if (step === 3 && (!trainingPlace || !trainingFrequency)) return true;
        if (step === 4 && !level) return true;
        if (step === 5 && (!goal || !goalTermin)) return true;
        if (step === 6 && !selectedProgram) return true;
    
        return false;
    };

    const handleSave = async () => {
        const data = {
            target,
            gender,
            height,
            weight,
            lifestyle,
            trainingPlace,
            trainingFrequency,
            level,
            goal,
            goalTermin,
            selectedProgram
        };
    
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            console.log('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    
    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <Text style={styles.title}>{titles[step]}</Text>

                {
                    step === 0 && (
                        <View style={styles.innerContainer}>
                            <Text style={[styles.label, {marginBottom: 20}]}>Enter your settings</Text>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
                                <TouchableOpacity 
                                    style={[styles.targetBtn, target === 'Chest' && {backgroundColor: '#731de5'}]} 
                                    onPress={() => setTarget('Chest')}
                                    >
                                    <Text style={styles.targetBtnText}>Chest</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.targetBtn, target === 'Waist' && {backgroundColor: '#731de5'}]} 
                                    onPress={() => setTarget('Waist')}
                                    >
                                    <Text style={styles.targetBtnText}>Waist</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.targetBtn, target === 'Hips' && {backgroundColor: '#731de5'}]} 
                                    onPress={() => setTarget('Hips')}
                                    >
                                    <Text style={styles.targetBtnText}>Hips</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.label, {marginBottom: 20}]}>Your gender</Text>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setGender('Male')}>
                                    {gender === 'Male' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Male</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setGender('Female')}>
                                    {gender === 'Female' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Female</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setGender('Doesn`t matter')}>
                                    {gender === 'Doesn`t matter' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Doesn`t matter</Text>
                            </View>
                        </View>
                    )
                }
                {
                    step === 1 && (
                        <View style={styles.innerContainer}>
                            <Text style={[styles.label, {marginBottom: 20}]}>Height</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="In centimeters"
                                placeholderTextColor="#999"
                                value={height}
                                onChangeText={setHeight}
                            />
                            <Text style={[styles.label, {marginBottom: 20}]}>Weight</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="In kilograms"
                                placeholderTextColor="#999"
                                value={weight}
                                onChangeText={setWeight}
                            />
                        </View>
                    )
                }
                {
                    step === 2 && (
                        <View style={styles.innerContainer}>
                            <Text style={[styles.label, {marginBottom: 20}]}>Select your lifestyle</Text>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLifestyle('Healthy lifestyle')}>
                                    {lifestyle === 'Healthy lifestyle' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Healthy lifestyle</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLifestyle('Sedentary, office work, studying')}>
                                    {lifestyle === 'Sedentary, office work, studying' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Sedentary, office work, studying</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLifestyle('Irregular workouts, moderate activity')}>
                                    {lifestyle === 'Irregular workouts, moderate activity' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Irregular workouts, moderate activity</Text>
                            </View>

                            <Image source={require('../assets/decor/wolf-form.png')} style={{width: 390, height: 300, resizeMode: 'contain', position: 'absolute', bottom: 10, right: 0}} />

                        </View>
                    )
                }
                {
                    step === 3 && (
                        <View style={styles.innerContainer}>
                            <ScrollView style={{width: '100%'}}>
                                <Text style={[styles.label, {marginBottom: 20}]}>Where do you train?</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingPlace('Gym')}>
                                        {trainingPlace === 'Gym' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Gym</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingPlace('Swimming pool')}>
                                        {trainingPlace === 'Swimming pool' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Swimming pool</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingPlace('Section')}>
                                        {trainingPlace === 'Section' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Section</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingPlace('At home')}>
                                        {trainingPlace === 'At home' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>At home</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingPlace('Other')}>
                                        {trainingPlace === 'Other' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Other</Text>
                                </View>

                                <Text style={[styles.label, {marginVertical: 20}]}>How often do you train?</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingFrequency('Once a month')}>
                                        {trainingFrequency === 'Once a month' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Once a month</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingFrequency('1-2 times a week')}>
                                        {trainingFrequency === '1-2 times a week' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>1-2 times a week</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingFrequency('3-4 times a week')}>
                                        {trainingFrequency === '3-4 times a week' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>3-4 times a week</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingFrequency('More than 4 times a week')}>
                                        {trainingFrequency === 'More than 4 times a week' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>More than 4 times a week</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setTrainingFrequency('Less often')}>
                                        {trainingFrequency === 'Less often' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Less often</Text>
                                </View>
                                <View style={{height: 150}} />
                            </ScrollView>
                        </View>
                    )
                }
                {
                    step === 4 && (
                        <View style={styles.innerContainer}>
                            <Text style={[styles.label, {marginBottom: 20}]}>What level are you?</Text>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLevel('Beginner')}>
                                    {level === 'Beginner' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Beginner</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLevel('Amateur')}>
                                    {level === 'Amateur' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Amateur</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLevel('Experienced')}>
                                    {level === 'Experienced' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Experienced</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLevel('Athlete')}>
                                    {level === 'Athlete' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Athlete</Text>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24, zIndex: 10}}>
                                <TouchableOpacity style={styles.checkBtn} onPress={() => setLevel('Professional')}>
                                    {level === 'Professional' && (
                                        <View style={{width: 24, height: 24}}>
                                            <Icons type={'selected'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.label}>Professional</Text>
                            </View>

                            <Image source={require('../assets/decor/wolf-form2.png')} style={{width: 390, height: 300, resizeMode: 'contain', position: 'absolute', bottom: 20, right: -20}} />
                        </View>
                    )
                }
                {
                    step === 5 && (
                        <View style={styles.innerContainer}>
                            <ScrollView style={{width: '100%'}}>
                                <Text style={[styles.label, {marginBottom: 20}]}>Please specify your current goal</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoal('Improve physical condition')}>
                                        {goal === 'Improve physical condition' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Improve physical condition</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoal('Gain muscle mass')}>
                                        {goal === 'Gain muscle mass' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Gain muscle mass</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoal('Lose excess weight')}>
                                        {goal === 'Lose excess weight' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Lose excess weight</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoal('Just for fun')}>
                                        {goal === 'Just for fun' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Just for fun</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoal('Other')}>
                                        {goal === 'Other' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Other</Text>
                                </View>

                                <Text style={[styles.label, {marginVertical: 20}]}>How long do you want to achieve your goal?</Text>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoalTermin('1-2 months')}>
                                        {goalTermin === '1-2 months' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>1-2 months</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoalTermin('3-6 months')}>
                                        {goalTermin === '3-6 months' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>3-6 months</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoalTermin('Half a year to a year')}>
                                        {goalTermin === 'Half a year to a year' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Half a year to a year</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoalTermin('More than a year')}>
                                        {goalTermin === 'More than a year' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>More than a year</Text>
                                </View>
                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
                                    <TouchableOpacity style={styles.checkBtn} onPress={() => setGoalTermin('Other')}>
                                        {goalTermin === 'Other' && (
                                            <View style={{width: 24, height: 24}}>
                                                <Icons type={'selected'} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.label}>Other</Text>
                                </View>
                                <View style={{height: 150}} />
                            </ScrollView>
                        </View>
                    )
                }
                {
                    step === 6 && (
                        <View style={styles.innerContainer}>
                            <ScrollView style={{width: '100%'}}>
                                {
                                    programs.map((program, index) => (
                                        <TouchableOpacity 
                                            style={[styles.programCard, selectedProgram === program && {backgroundColor: '#731de5'}]} 
                                            key={index} 
                                            onPress={() => setSelectedProgram(program)}
                                            >
                                            <View style={{width: '48%', justifyContent: 'space-between', height: '100%'}}>
                                                <Text style={styles.programTitle}>{program.title}</Text>
                                                <Text style={styles.programDesc} numberOfLines={3} ellipsizeMode="tail">{program.description}</Text>
                                            </View>
                                            <Image style={styles.programImage} source={program.image} />
                                        </TouchableOpacity>
                                    ))
                                }
                                <View style={{height: 150}} />
                            </ScrollView>
                        </View>
                    )
                }

                <TouchableOpacity style={[styles.nextBtn, buttonDisabled() && {backgroundColor: '#261305'}]} onPress={handleNext}>
                    <Text style={[styles.nextBtnText,  buttonDisabled() && {color: '#999'}]}>Continue</Text>
                </TouchableOpacity>

                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        paddingTop: height * 0.07
    },

    innerContainer: {
        width: '100%', 
        flexGrow: 1,
    },

    title: {
        fontSize: 34,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 41,
        marginBottom: 24,
        alignSelf: 'flex-start'
    },

    label: {
        fontSize: 17,
        fontWeight: '400',
        color: '#fff',
        lineHeight: 20
    },

    targetBtn: {
        width: '32%',
        padding: 18,
        borderRadius: 14,
        backgroundColor: '#261305',
        alignItems: 'center',
        justifyContent: 'center',
    },

    targetBtnText: {
        fontSize: 17,
        fontWeight: '400',
        color: '#999',
        lineHeight: 24
    },

    checkBtn: {
        width: 24,
        height: 24,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    nextBtn: {
        width: '100%',
        padding: 18,
        borderRadius: 20,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30
    },

    nextBtnText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 20.3
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
        marginBottom: 12
    },

    programCard: {
        width: '100%',
        height: 150,
        padding: 16,
        borderRadius: 14,
        backgroundColor: '#261305',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 12
    },

    programTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 19.1,
        marginBottom: 12
    },

    programDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#999',
        lineHeight: 16.7
    },

    programImage: {
        width: '49%',
        height: 108,
        borderRadius: 32,
        resizeMode: 'cover'
    }
    
});

export default Form;
