import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Manga } from "./models";

export default function MangaInfo({ navigation, route }: any) {
  const manga = route.params.manga;

  const [mangaInfo, setMangaInfo] = React.useState<Manga>(manga);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: manga.Name,
    });

    // get manga details from https://manganato.herokuapp.com/manga/lt989228
    fetch(`https://manganato.herokuapp.com/manga/${manga.ID}`)
      .then((response) => response.json())
      .then((data) => {
        setMangaInfo(data);
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
    <View>
      {mangaInfo.Chapters && (
        <FlatList
          style={{}}
          data={mangaInfo.Chapters}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Reader", {
                  manga: mangaInfo,
                  chapter: item,
                });
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
              <Text>{item.ChapterName}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.ID}
        />
      )}
    </View>
  );
}
