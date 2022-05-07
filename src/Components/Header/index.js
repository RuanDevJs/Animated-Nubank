import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('screen');
import { Ionicons } from '@expo/vector-icons'; 

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>Desenvolvido por Ruan</Text>
            <Ionicons name="arrow-down-outline" size={16} color="#f2f2f2" />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
       flex: 1,
       height: height * 0.2,
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom: 50
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
        color: '#f2f2f2',
        marginBottom: 12
    }
})