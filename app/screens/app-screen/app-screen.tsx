import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
 import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen, DetailsScreen } from ".."


const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const AppScreen = observer(function AppScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const Tab = createMaterialTopTabNavigator();
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
    </Tab.Navigator>
    </Screen>
  )
})
