import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  
} from "react-native";
import React, { useEffect, useState } from "react";

import CustomModal from "../components/Modal";
import ImageZoom from "react-native-image-pan-zoom";
import {  useRoute } from "@react-navigation/native";
import { StatusBar as ExpoBar } from "expo-status-bar";
const { width, height } = Dimensions.get("window");

const UserInfo = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: {
      user_details,
      status,
      _id: bus_pass_id,
      user_id,
      user_details: {
        receipt_img,
        profile_img,
        first_name,
        last_name,
        email,
        branch,
        semester,
        phone_no,
        address,
      } = {},
    } = {},
  } = useRoute().params;


  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
    <ExpoBar style="dark" translucent={true} hidden={false} />
      {/* receipt image modal */}
      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          top={height / 1.5}
          handleClose={() => {
            console.log("modal closed");
            setModalVisible(false);
          }}
        >
          <View
            className="flex-1 relative w-full h-80 rounded-xl "
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          >
            <View className="w-full items-center justify-center">
              <View className="w-14 h-2 bg-white rounded-full items-center justify-center mt-2"></View>
            </View>
            <View className="w-full items-end z-10">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-white"
              >
                <Text className="text-black text-xl font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center">
              <ImageZoom
                cropWidth={Dimensions.get("window").width}
                cropHeight={Dimensions.get("window").height}
                imageWidth={Dimensions.get("window").width}
                imageHeight={200}
                panToMove={true}
                pinchToZoom={true}
              >
                {receipt_img && (
                  <Image
                    source={{ uri: receipt_img }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ImageZoom>
            </View>
          </View>
        </CustomModal>
      )}


      <View className="flex-1 bg-[#FFD652]">
        <ScrollView>
          <Image
            resizeMode="contain"
            source={{
              uri: profile_img,
            }}
            className="w-full h-52 object-cover rounded-lg"
          />
          <View className="  min-h-full p-4 px-6">
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {first_name + " " + last_name}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {branch}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {semester} semester
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {phone_no}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {address}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {email}
            </Text>
            {/* receipt */}
            {receipt_img && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  source={{
                    uri: receipt_img,
                  }}
                  className="w-full h-40 mt-2 rounded-md object-contain"
                />
              </TouchableOpacity>
            )}
            <Text className={`mt-2 rounded-lg py-2 text-sm  text-center font-bold ${status === 2 ? 'bg-[#0b1f06] text-[#49f726]' : status === 3 ? 'bg-red-900 text-red-500' : 'text-[#928e8e] bg-black'}`}>{status === 1 ? 'Applied' : status === 2 ? 'Approved' : 'Declined'}</Text>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserInfo;
