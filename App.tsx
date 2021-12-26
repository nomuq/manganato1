import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Latest from "./lib/Latest";
import MangaInfo from "./lib/MangaInfo";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reader from "./lib/Reader";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View
        style={{
          flex: 1,
        }}
      >
        <PaperProvider
          theme={{
            ...DefaultTheme,
            roundness: 2,
            colors: {
              ...DefaultTheme.colors,
              primary: "#000",
              accent: "#000",
              background: "#fff",
              surface: "#fff",
              text: "#000",
              disabled: "#000",
              placeholder: "#000",
              backdrop: "#000",
              error: "#000",
              onSurface: "#000",
            },
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <Stack.Navigator>
              <Stack.Screen name="Latest" component={Latest} />
              <Stack.Screen name="MangaInfo" component={MangaInfo} />
              <Stack.Screen
                name="Reader"
                component={Reader}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </PaperProvider>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}
