import React, { useEffect } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ScalableImage from "./ScalableImage";

export default function Reader({ navigation, route }: any) {
  const manga = route.params.manga;
  const chapter = route.params.chapter;

  const [images, setImages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: manga.Name,
    });

    fetch(
      `https://manganato.herokuapp.com/manga/${manga.ID}/chapter/${chapter.ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
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
      }}
    >
      {images.length > 0 && (
        <FlatList
          style={{
            flex: 1,
          }}
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
        />
      )}
    </View>
  );
}

function img() {
  return (
    <Image
      source={{
        uri: "https://s8.mkklcdnv6temp.com/mangakakalot/m1/mj926759/chapter_34/1.jpg",
        headers: {
          authority: "s8.mkklcdnv6temp.com",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-fetch-site": "cross-site",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-dest": "document",
          referer: "https://readmanganato.com/",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        },
      }}
      onError={(e) => {
        console.log(e);
      }}
      onProgress={(e) => {
        console.log(e);
      }}
      style={{
        flex: 1,
      }}
      // width={Dimensions.get("window").width}
      // height={Dimensions.get("window").height}
    ></Image>
  );
}
