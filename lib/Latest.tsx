import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Manga } from "./models";

export default function Latest() {
  const [latest, setLatest] = React.useState<Manga[]>([]);
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    fetch("https://manganato.herokuapp.com")
      .then((response) => response.json())
      .then((data) => {
        setLatest(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={latest}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate("MangaInfo", { manga: item });
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text>{item.Name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.ID}
      />
    </View>
  );
}
