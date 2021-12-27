import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import database, { History } from "./database";
import { Manga } from "./models";

export default function MangaInfo({ navigation, route }: any) {
  const manga = route.params.manga;

  const [mangaInfo, setMangaInfo] = React.useState<Manga>(manga);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [history, setHistory] = React.useState<History[]>([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: manga.Name,
    });

    // get manga details from https://manganato.herokuapp.com/manga/lt989228
    fetch(`https://manganato.herokuapp.com/manga/${manga.id}`)
      .then((response) => response.json())
      .then(async (data) => {
        try {
          const history = await database.getHistory(manga);
          setHistory(history);
        } catch (error) {
          console.log(error);
        }

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
      {mangaInfo.chapters && (
        <FlatList
          style={{}}
          data={mangaInfo.chapters}
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
              <Text
                style={{
                  color:
                    history.filter((h) => h.chapter_id === item.id).length > 0
                      ? "gray"
                      : "#000",
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                {item.chapter_name}
              </Text>
              <Text
                style={{
                  color:
                    history.filter((h) => h.chapter_id === item.id).length > 0
                      ? "gray"
                      : "#000",
                }}
              >
                {item.uploaded}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}
