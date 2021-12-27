import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacityBase,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { ActivityIndicator, Surface } from "react-native-paper";
import database from "./database";
import { Manga } from "./models";

export default function Latest() {
  const [latest, setLatest] = React.useState<Manga[]>([]);
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    database.init();
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
    <FlatList
      data={latest}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigation.navigate("MangaInfo", { manga: item });
            }}
            style={{
              flex: 1,
            }}
          >
            <Surface
              style={{
                zIndex: 1,
                elevation: 2,
                borderRadius: 4,
                backgroundColor: "#ffffff",
                flexDirection: "row",
                padding: 10,
                margin: 10,
                marginBottom: 0,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: Dimensions.get("window").width / 4,
                  aspectRatio: 2 / 3,
                }}
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#000",
                    paddingBottom: 5,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                    paddingBottom: 5,
                  }}
                >
                  {item.author.name}
                </Text>

                {item.chapters &&
                  item.chapters.map((chapter) => {
                    return (
                      <Text
                        style={{
                          fontSize: 12,
                          paddingBottom: 5,
                        }}
                        key={chapter.id}
                      >
                        {chapter.chapter_name}
                      </Text>
                    );
                  })}
              </View>
            </Surface>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.id}
    />
  );
}

{
  /* sliceIntoChunks(latest, 3).map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                width: Dimensions.get("screen").width - 20,
                aspectRatio: 2 / 3,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={item.map((manga: Manga) => manga.id).join(",") + "key"}
            >
              {item.map((manga: Manga) => (
                <MangaComponent
                  item={manga}
                  navigation={navigation}
                  // key={manga.id}
                />
              ))}
            </View>
          );
        })} */
}

function MangaComponent({ item, navigation }: any) {
  return (
    <TouchableOpacity
      onPress={() => {
        //@ts-ignore
        navigation.navigate("MangaInfo", { manga: item });
      }}
      key={item.id + "manga"}
      style={{
        flexDirection: "column",
        flex: 1,
        padding: 5,
        borderColor: "#ddd",
        borderWidth: 1,
        margin: 5,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          flex: 1,
          aspectRatio: 2 / 3,
        }}
        key={item.id + "image"}
      />
      <Text
        style={{
          fontSize: 12,
          textAlign: "center",
          color: "#000",
          fontWeight: "bold",
          height: 50,
        }}
        key={item.id + "name"}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
