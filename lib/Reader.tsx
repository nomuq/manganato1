import React, { useEffect } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { ActivityIndicator, Button, IconButton } from "react-native-paper";
import ScalableImage from "./ScalableImage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Chapter, Manga } from "./models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import database from "./database";

export default function Reader({ navigation, route }: any) {
  const manga: Manga = route.params.manga;
  const chapter: Chapter = route.params.chapter;

  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const [refresh, setRefresh] = React.useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: manga.name,
    });

    fetch(
      `https://manganato.herokuapp.com/manga/${manga.id}/chapter/${chapter.id}`
    )
      .then((response) => response.json())
      .then(async (data) => {
        await database.insertHistory({
          manga_id: manga.id,
          chapter_id: chapter.id,
          read_at: new Date().toISOString(),
        });
        setImages(data);
        setLoading(false);
      });
  }, [refresh]);

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
      }}
    >
      {images.length > 0 && (
        <FlatList
          style={{
            flex: 1,
          }}
          // maxToRenderPerBatch={1}
          bounces={false}
          data={images}
          renderItem={({ item }) => {
            return (
              <ScalableImage
                source={{
                  uri: item,
                }}
              />
            );
          }}
          keyExtractor={(item) => item}
          // initialNumToRender={2}
          // maxToRenderPerBatch={5}
          ListHeaderComponent={() => (
            <RederNavigationComponent
              navigation={navigation}
              chapter={chapter}
              onForward={() => {
                // get previous chapter
                const index = manga.chapters.findIndex(
                  (c) => c.id === chapter.id
                );
                if (index > 0) {
                  const prevChapter = manga.chapters[index - 1];

                  navigation.navigate("Reader", {
                    manga: manga,
                    chapter: prevChapter,
                  });

                  setLoading(true);
                  setRefresh(true);
                }
              }}
            />
          )}
          ListFooterComponent={() => (
            <RederNavigationComponent
              navigation={navigation}
              chapter={chapter}
            />
          )}
        />
      )}
    </View>
  );
}

function RederNavigationComponent({ navigation, chapter, onForward }: any) {
  return (
    <View
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          icon={() => (
            <MaterialIcons name="arrow-back" size={24} color="black" />
          )}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Text
          style={{
            flex: 1,
            // textAlign: "center",
          }}
        >
          {chapter.chapter_name}
        </Text>
        {/* <IconButton
          icon={() => (
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          )}
          onPress={() => {
            onForward();
          }}
        /> */}
      </View>
    </View>
  );
}
