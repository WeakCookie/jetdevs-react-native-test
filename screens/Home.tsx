import * as React from "react"
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native"
import UserCard from "../components/HomePage/UserCard"
import { IUser } from "../interfaces/user"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, users } from '../reducers/user.reducer'

function HomeScreen() {
    const dispatch = useDispatch()
    const fetchedUsers = useSelector(users)

    React.useEffect(() => {
        dispatch(fetchUsers(10))
    }, [])

    const renderUserItem = ({ item }: { item: IUser }) => {
        return <UserCard user={item} />
    }

    return (
        <SafeAreaView>
        <View style={styles.container}>
            <FlatList
            data={fetchedUsers}
            renderItem={renderUserItem}
            keyExtractor={(user) => user?.login?.uuid}
            />
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0
    },
})

export default HomeScreen
