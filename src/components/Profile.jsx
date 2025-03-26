import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet, Linking, Modal, TextInput, ScrollView, ImageBackground } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const avatars = [
    require('../assets/avatars/1.png'),
    require('../assets/avatars/2.png'),
    require('../assets/avatars/3.png'),
    require('../assets/avatars/4.png'),
    require('../assets/avatars/5.png'),
]

const Profile = () => {
    const [avatar, setAvatar] = useState(avatars[0]);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePP = () => {
        const url = 'https://www.termsfeed.com/live/f051495c-df19-407e-9f9c-e4ca8a46f325';
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }; 

    const handleR = () => {
        const url = Platform.select({
            ios: 'https://apps.apple.com/us/app/wolf-tressure/id6742177832',
        });
    
        Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    };

    const handleEdit = () => {
        if(edit) {
            setEdit(false);
        } else {
            setEdit(true);
        }
    };

    const handleSave = async () => {
        try {
            const user = { avatar, name };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setEdit(false);
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    const handleReset = async () => {
        try {
            const keys = ['user', 'workouts', 'history', 'food', 'userData'];
            await AsyncStorage.multiRemove(keys);
            alert("All progress has been reset successfully!");
    
            const savedUser = await AsyncStorage.getItem('user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                setAvatar(user.avatar || avatars[0]);
                setName(user.name || '');
            } else {
                setAvatar(avatars[0]);
                setName('');
            }
    
            setModalVisible(false);
        } catch (error) {
            console.error("Error resetting progress:", error);
        }
    };
    
    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
            <View style={styles.container}>

                <View style={{width: '100%', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 27}}>
                    <Text style={[styles.upperTitle, {alignSelf: 'center', marginBottom: 0, marginRight: '32%'}]}>Profile</Text>
                    <TouchableOpacity style={{width: 34, height: 34, padding: 5}} onPress={() => setModalVisible(true)}>
                        <Icons type={'reset'} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{width: '100%'}}>
                    <View style={styles.userContainer}>
                        <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={avatar} style={{width: 58, height: 74, marginRight: 12}} />
                                <Text style={styles.username}>{name}</Text>
                            </View>
                            <TouchableOpacity style={{width: 25, height: 25}} onPress={handleEdit}>
                                <Icons type={edit ? 'cross' : 'edit'} />
                            </TouchableOpacity>
                        </View>
                        {
                            edit && (
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Username"
                                        placeholderTextColor="#999"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                    <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                        {
                                            avatars.map((avatar, index) => (
                                                <TouchableOpacity key={index} style={{marginRight: 7.5}} onPress={() => setAvatar(avatar)}>
                                                    <Image source={avatar} style={{width: 56, height: 74}} />
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                                        <Text style={styles.saveBtnText}>Save</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>

                    <Text style={[styles.upperTitle, {alignSelf: 'flex-start'}]}>Settings</Text>

                    <TouchableOpacity style={styles.settingsBtn} onPress={handlePP}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{width: 24, height: 24, marginRight: 12}}>
                                <Icons type={'terms'} />
                            </View>
                            <Text style={styles.settingsBtnText}>Terms of use</Text>
                        </View>
                        <View style={{width: 24, height: 24}}>
                            <Icons type={'arrow'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsBtn, {borderTopWidth: 0}]} onPress={handleR}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <View style={{width: 24, height: 24, marginRight: 12}}>
                                <Icons type={'rate'} />
                            </View>
                            <Text style={styles.settingsBtnText}>Rate us</Text>
                        </View>
                        <View style={{width: 24, height: 24}}>
                            <Icons type={'arrow'} />
                        </View>
                    </TouchableOpacity>

                    <View style={{height: 50}} />
                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Reset data</Text>
                            <Text style={styles.modalText}>Are you sure you want to reset all application data?</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalBtn, {borderTopWidth: 0.5, borderBottomWidth: 0.5, borderTopColor: '#999', borderBottomColor: '#999'}]}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleReset} style={styles.modalBtn}>
                                <Text style={styles.confirmText}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        paddingTop: height * 0.07,
        paddingBottom: 100
    },

    upperTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 19.1,
        marginBottom: 22,
    },

    userContainer: {
        width: '100%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#261305',
        marginBottom: 24
    },

    username: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
        lineHeight: 23.9,
    },

    input: {
        width: '100%',
        padding: 14,
        borderRadius: 14,
        backgroundColor: '#120b05',
        color: '#fff',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 24,
        marginVertical: 16
    },

    saveBtn: {
        width: '100%',
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#fa8009',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16
    },

    saveBtnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 22
    },

    settingsBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 18,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },

    settingsBtnText: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 23
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },

    modalContent: {
        width: '80%',
        backgroundColor: '#261305',
        borderRadius: 14,
        paddingTop: 19,
        alignItems: 'center',
    },

    modalTitle: {
        fontSize: 17,
        color: '#fff',
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5
    },

    modalText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
        lineHeight: 19,
        marginBottom: 15,
        width: '85%',
        textAlign: 'center'
    },

    modalBtn: {
        width: '100%',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelText: {
        fontSize: 17,
        color: '#fa8009',
        fontWeight: '600',
        lineHeight: 22,
    },

    confirmText: {
        fontSize: 17,
        color: '#fa3909',
        fontWeight: '600',
        lineHeight: 22,
    }

});

export default Profile;