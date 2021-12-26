import React, { useEffect } from "react";
import { View, Text, ImageProps, Image, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function ScalableImage(props: ImageProps) {
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
    loding: boolean;
  }>({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    loding: true,
  });

  // @ts-ignore
  const uri = props.source.uri;
  // const uri =
  //   "https://s8.mkklcdnv6temp.com/mangakakalot/m1/mj926759/chapter_34/1.jpg";
  const headers = {
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
  };

  useEffect(() => {
    Image.getSizeWithHeaders(uri, headers, (width, height) => {
      setSize({
        width,
        height,
        loding: false,
      });
    });

    return () => {
      setSize({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        loding: true,
      });
    };
  }, []);

  if (size.loding) {
    return (
      <View
        style={{
          width: size.width,
          height: size.height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Image
      source={{
        uri,
        headers,
      }}
      onError={(e) => {
        console.log(e);
      }}
      style={{
        height: (size.height * Dimensions.get("window").width) / size.width,
        width: Dimensions.get("window").width,
      }}
      resizeMode="contain"
    ></Image>
  );
}
