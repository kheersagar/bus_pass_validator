import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList
} from "react-native";
import React, { useEffect } from "react";
import OptionCard from "../components/OptionCard";
import { StatusBar as ExpoBar } from "expo-status-bar";

const Home = () => {

  const options = [
    {
      title: "Bus pass",
      imageSrc: require("../assets/Image/Icons/pass.png"),
      route:'pass-list'
    },
    {
      title: "Scan pass",
      imageSrc: require("../assets/Image/Icons/search.png"),
      route:'scan-pass'
    },
    {
      title: "Profile Setting",
      imageSrc: require("../assets/Image/Icons/setting.png"),
      route:'profile'
    },
  ];
  useEffect( ()=>{

  },[])
  return (
      <SafeAreaView className="flex-1"
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
        }}
      >
      <ExpoBar style="dark" translucent={true} hidden={false} />
      <View className="px-4 bg-[#FFB423] h-80 rounded-b-[40px] pt-2 relative">
        <Image source={require("../assets/icon.png")} className="w-16 h-16" />
        <View className="mt-16">
          <Text className="text-[40px] font-bold">Welcome</Text>
          <Text className="text-[20px] font-medium">to ShowBusPass First</Text>
        </View>
      </View>
      {/*  */}
      <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding:20,width:'100%'}}
            data={options}
           className="absolute top-64  w-full h-4/6"
            renderItem={({ item }) => {
              return <OptionCard {...item} />;
            }}
          />
      </SafeAreaView>
  );
};

export default Home;
