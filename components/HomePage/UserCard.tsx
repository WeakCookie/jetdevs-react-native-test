import * as React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import EntypoIcon from "react-native-vector-icons/Entypo"
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { Avatar } from "react-native-paper"
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorite, favoriteUsers, removeFavorite } from '../../reducers/user.reducer'

import { THEME_COLOR } from "../../constants/theme/color"
import { IUser } from "../../interfaces/user"
import { getFullName } from "../../utils/user"
import HobbyChip from "./HobbyChip"

interface IUserItemProps {
    user: IUser
}

function UserCard({ user }: IUserItemProps) {
    const { location: { city, state }, picture } = user
    const currentFavoriteUsers = useSelector(favoriteUsers)
    const dispatch = useDispatch()
    const fullName = getFullName(user)
    const isFavorite = !!currentFavoriteUsers.find(favoriteUser => favoriteUser?.login?.uuid === user?.login?.uuid)

    return (
        <View style={styles.container}>
            <Avatar.Image
                style={styles.avatar}
                size={50}
                source={{
                    uri: picture?.thumbnail,
                }}
            />
            <View style={styles.contentContainer}>
                <View>
                    <Text style={styles.fullName}>{fullName}</Text>
                    <View style={styles.addressContainer}>
                        <EntypoIcon name="location-pin" color={"gray"} size={14} />
                        <Text style={styles.address}>{`${city ?? ""}, ${state ?? ""}`}</Text>
                    </View>
                    <HobbyChip />
                </View>
                <TouchableOpacity onPress={() => {
                    if (isFavorite) {
                        dispatch(removeFavorite(user))
                    } else {
                        dispatch(addToFavorite(user))
                        // dispatch(saveFavoriteUsers())
                    }

                }}>
                    <AntDesignIcons name={isFavorite ? 'star' : "staro"} size={20} color={THEME_COLOR} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chip: {
        width: 65,
        height: 20,
        marginTop: 10,
        borderRadius: 5,
    },
    container: {
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 50,
        marginLeft: 10,
        padding: 20,
        position: "relative",
        marginVertical: 10,
        borderRadius: 10,
        flex: 1,
        backgroundColor: "white",
    },
    fullName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    address: {
        color: "gray",
        marginLeft: 4,
    },
    avatar: {
        position: "absolute",
        zIndex: 100,
    },
})

export default UserCard