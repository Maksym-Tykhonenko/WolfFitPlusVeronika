import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const titles = [
    'Choose a programme and start training',
    'Track your workouts and receive reminders so you don`t forget',
    'Keep track of your diet',
    'Read helpful articles on various topics',
    'Easily manage your account'
];

const Welcome = () => {
    const navigation = useNavigation();
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState(null);

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

    const handleNavigate = () => {
        if(userData) {
            navigation.navigate("GymScreen");
        } else {
            navigation.navigate("FormScreen");
        }
    }

    const handleNext = () => {
        if (step === 4) {
            handleNavigate();
        } else {
            setStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0 ) {
            setStep((prev) => prev - 1);
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginBottom: height * 0.04}}>
                    <View style={styles.dotsContainer}>
                        {[0, 1, 2, 3, 4].map((index) => (
                            <View 
                                key={index}
                                style={[
                                    styles.dot,
                                    step === index ? styles.activeDot : null
                                ]}
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.skipBtn} onPress={handleNavigate}>
                        <Icons type={'close'} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.title}>{titles[step]}</Text>

                {
                    step === 0 && (
                        <View style={styles.innerContainer}>
                            <Text style={styles.subtitle}>You can also follow your own programme</Text>
                            <Image source={require('../assets/onboarding/steps/1/wolf.png')} style={{ position: 'absolute', left: -16, top: 50, zIndex: 10}} />
                            <View style={{ position: 'absolute', right: -16, top: 100}}>
                                <Image source={require('../assets/onboarding/steps/1/piece1.png')} style={{marginBottom: 16}} />
                                <Image source={require('../assets/onboarding/steps/1/piece2.png')} />
                            </View>
                        </View>
                    )
                }
                {
                    step === 1 && (
                        <View style={styles.innerContainer}>
                            <Image source={require('../assets/onboarding/steps/2/calendar.png')} style={{marginTop: height * 0.06}} />
                            <Text style={[styles.subtitle, {marginTop: 24, marginBottom: 16}]}>Workouts</Text>
                            <View>
                                <Image source={require('../assets/onboarding/steps/2/ex1.png')} style={{alignSelf: 'center', marginBottom: 16}} />
                                <Image source={require('../assets/onboarding/steps/2/ex2.png')} style={{marginLeft: -16}} />
                            </View>
                        </View>
                    )
                }
                {
                    step === 2 && (
                        <View style={styles.innerContainer}>
                            <Image source={require('../assets/onboarding/steps/3/piece.png')} style={{marginTop: 30}} />
                            <Image source={require('../assets/onboarding/steps/3/wolf.png')} style={{width: 205, height: 210, resizeMode: 'contain', position: 'absolute', right: -16, top: height * 0.52}} />
                        </View>
                    )
                }
                {
                    step === 3 && (
                        <View style={styles.innerContainer}>
                            <Image source={require('../assets/onboarding/steps/4/piece.png')} style={{width: '100%', height: 324, resizeMode: 'contain', marginVertical: 'auto'}} />
                        </View>
                    )
                }
                {
                    step === 4 && (
                        <View style={styles.innerContainer}>
                            <Image source={require('../assets/onboarding/steps/5/piece.png')} style={{width: 300, height: 280, resizeMode: 'cover', borderRadius: 16, marginTop: height * 0.04, alignSelf: 'center'}} />
                            <Image source={require('../assets/onboarding/steps/5/wolf.png')}  style={{width: 205, height: 210, resizeMode: 'contain', position: 'absolute', left: -32, top: height * 0.52}} />
                        </View>
                    )
                }

                <View style={[styles.btnsContainer, step === 0 && {justifyContent: 'flex-end'}]}>
                    {
                        step > 0 && (
                            <TouchableOpacity onPress={handlePrevious} style={styles.btn}>
                                <View style={{width: 28, height: 28, marginRight: 10}}>
                                    <Icons type={'previous'} />
                                </View>
                                <Text style={styles.backText}>Back</Text>
                            </TouchableOpacity>    
                        )
                    }
                    <TouchableOpacity onPress={handleNext} style={styles.btn}>
                        <Text style={styles.nextText}>Next</Text>
                        <View style={{width: 28, height: 28, marginLeft: 10}}>
                            <Icons type={'next'} />
                        </View>
                    </TouchableOpacity>
                </View>

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

    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    dot: {
        width: 50,
        height: 4,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#adadad',
    },

    activeDot: {
        backgroundColor: '#fff',
        height: 6
    },

    skipBtn: {
        width: 32,
        height: 32,
    },

    title: {
        fontSize: 24,
        fontWeight: '700', 
        color: '#fff',
        lineHeight: 28.64,
        alignSelf: 'flex-start'
    },

    innerContainer: {
        width: '100%', 
        flexGrow: 1,
    },

    subtitle: {
        fontSize: 17,
        fontWeight: '400', 
        color: '#fff',
        lineHeight: 20.3,
        marginTop: height * 0.03
    },

    btnsContainer: {
        width: '100%',
         alignItems: 'center',
         justifyContent: 'space-between',
         flexDirection: 'row',
         position: 'absolute',
         bottom: 30,
    },

    btn: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    backText: {
        fontSize: 20,
        color: '#adadad',
        fontWeight: '700',
        lineHeight: 22
    },

    nextText: {
        fontSize: 20,
        color: '#fa8009',
        fontWeight: '700',
        lineHeight: 22 
    }
    
});

export default Welcome;
