import * as React from "react";
import { View, SafeAreaView, FlatList, Text, StyleSheet } from "react-native"
import FavoriteUserCard from "../components/FavoritePage/FavoriteUserCard"
import { IUser } from "../interfaces/user"
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavoriteUsers, favoriteUsers } from '../reducers/user.reducer'
import { THEME_COLOR } from "../constants/theme/color";


function FavoriteScreen() {
    const dispatch = useDispatch()
    const fetchedFavoriteUsers = useSelector(favoriteUsers)

    React.useEffect(() => {
        dispatch(fetchFavoriteUsers())
    }, [])

    const renderUserItem = ({ item }: { item: IUser }) => {
        return <FavoriteUserCard user={item} />;
    }

    return (
        <SafeAreaView>
        <View>
            <FlatList
                data={fetchedFavoriteUsers}
                renderItem={renderUserItem}
                keyExtractor={(user) => user?.login?.uuid}
            />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    emptyText: {
        textAlign: 'center',
        color: THEME_COLOR
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

export default FavoriteScreen