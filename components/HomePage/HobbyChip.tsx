import * as React from "react"
import { View, Text, StyleSheet } from "react-native"

function HobbyChip() {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Music</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        backgroundColor: '#FEE9E4',
        height: 20,
        marginTop: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        color: '#E39888',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: "600"
    }
})

export default HobbyChip