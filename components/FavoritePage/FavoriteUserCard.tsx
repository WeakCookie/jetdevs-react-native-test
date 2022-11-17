import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Avatar } from "react-native-paper"
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { THEME_COLOR } from "../../constants/theme/color"
import { getFullName } from "../../utils/user"
import { IUser } from "../../interfaces/user"

interface IUserItemProps {
    user: IUser
}

function FavoriteUserCard({ user }: IUserItemProps) {
    const { picture } = user
    const fullName: string = getFullName(user)

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Avatar.Image
                size={50}
                source={{
                    uri: picture?.thumbnail,
                }}
                />
                <Text style={styles.fullName}>{fullName}</Text>
            </View>
            <TouchableOpacity>
                <AntDesignIcons name={'star'} size={20} color={THEME_COLOR} />
            </TouchableOpacity>
        </View>
    )
}

export default FavoriteUserCard

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 14,
        flexDirection: "row",
        borderBottomWidth: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingHorizontal: 20,
        borderBottomColor: "#edeef2",
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    fullName: {
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    }
})