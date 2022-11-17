import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LoginScreen from './screens/Login'
import FavoriteScreen from './screens/Favorite'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import HomeScreen from './screens/Home'
import { EScreenRoutes } from './constants/common/screens'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { THEME_COLOR } from './constants/theme/color'
import { Alert } from "react-native"
import { useSelector } from 'react-redux'
import { loggedInUser, loginError } from './reducers/auth.reducer'

const Stack = createNativeStackNavigator()
const BottomTabNavigator = createBottomTabNavigator()

function NavBarBottom() {
    return (
        <BottomTabNavigator.Navigator
            screenOptions={({ route }) => {
                return {
                    headerTitle: () => {
                        return (
                            <Ionicons name="triangle" color={THEME_COLOR} size={40} />
                        )
                    },
                    tabBarIcon: ({ size, focused, color }) => {
                        if (route.name === EScreenRoutes.HOME) {
                            return <Ionicons name={`home${!focused ? "-outline" : ""}`} color={color} size={size} />
                        }

                        if (route.name === EScreenRoutes.FAVORITE) {
                            return <AntDesignIcons size={size} name={focused ? 'star' : 'staro'} color={color} />
                        }
                    },
                    tabBarActiveTintColor: THEME_COLOR,
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: "600"
                    },
                }
            }}
        >
            <BottomTabNavigator.Screen name={EScreenRoutes.HOME} component={HomeScreen} />
            <BottomTabNavigator.Screen name={EScreenRoutes.FAVORITE} component={FavoriteScreen} />
        </BottomTabNavigator.Navigator>
    )
}

const Navigation = () => {
    const currentUser = useSelector(loggedInUser)
    const errorMessage = useSelector(loginError)

    if (errorMessage) {
        Alert.alert("Error", "Email or password invalid")
    }

    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName={EScreenRoutes.LOGIN}
                screenOptions={{
                    headerShown: false,
                }}
            >
                {currentUser?.email ? (
                    <Stack.Screen name={EScreenRoutes.HOME} component={NavBarBottom} />
                ):(
                    <Stack.Screen name={EScreenRoutes.HOME} component={NavBarBottom} />
                    // <Stack.Screen name={EScreenRoutes.LOGIN} component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation