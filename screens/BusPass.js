import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  StatusBar,
  SafeAreaView,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { usePreventScreenCapture } from "expo-screen-capture";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { getBusPass } from "../API/API";
import { CheckIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native-gesture-handler";
import FullScreenLoading from "../components/FullScreenLoading";
import { userActions } from "../Slices/userSlice";
import { StatusBar as ExpoBar } from "expo-status-bar";
function Detail({ value, title }) {
  return (
    <View className="flex-row mb-2 pr-2">
      <Text className="flex-none w-32 mr-2 text-lg font-extrabold">
        {title}
      </Text>
      <Text className="text-gray-800 text-lg font-extrabold bg-gray-400 rounded-md px-2">
        {value}{" "}
      </Text>
    </View>
  );
}

export default function App() {
  // usePreventScreenCapture();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const {
    busPassLoading,
    busPassDetails,
    busPassDetails: {
      qr_code,
      valid_till,
      bus_no,
      user_details: {
        username,
        profile_img,
        first_name,
        last_name,
        email,
        branch,
        semester,
        phone_no,
        address,
        status,
        pickup_point,
      } = {}, //if  obj is null or undefined
    } = {}, //if  obj is null or undefined
  } = useSelector((state) => state.user);
  function formatDate(d) {
    const date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (d = dd + "/" + mm + "/" + yyyy);
  }
  var data = [
    {
      id: 10,
      title: "Name",
      value: first_name + " " + last_name,
    },
    {
      id: 1,
      title: "Branch",
      value: branch,
    },
    {
      id: 2,
      title: "Semester",
      value: semester,
    },
    {
      id: 3,
      title: "Enrollment No.",
      value: username,
    },
    {
      id: 7,
      title: "Valid Date",
      value: formatDate(valid_till),
    },
    {
      id: 4,
      title: "Bus No.",
      value: bus_no,
    },
    {
      id: 5,
      title: "Pickup Point",
      value: pickup_point,
    },
    {
      id: 6,
      title: "Address",
      value: address,
    },
  ];

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    return () =>{
      dispatch(userActions.clearBusPassDetails())
    }
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    dispatch(getBusPass(data));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return busPassLoading ? (
    <FullScreenLoading isLoading={true} />
  ) : (
    <View className="flex-1 justify-center items-center">
    <ExpoBar style="dark" translucent={true} hidden={false} />
      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          className="justify-center items-center"
        >
          <View className="h-1/3 w-10/12 border-4 border-white rounded-lg" />
        </BarCodeScanner>
      ) : (
        <SafeAreaView
          className="flex-1"
          style={{
            marginTop:
              Platform.OS === "android" ? StatusBar.currentHeight : null,
          }}
        >
          {busPassDetails ? (
            <ScrollView  showsVerticalScrollIndicator={false} >
            <ImageBackground
              source={require("../assets/Image/bussPassBackground.png")}
              className="flex-1 w-full h-full"
            >
              <View className="items-center mt-16 pb-2 ">
                <Image
                  source={require("../assets/Image/opju_logo.png")}
                  className="object-cover"
                />
                <Image
                  source={{
                    uri: profile_img,
                  }}
                  className="w-40 h-40 mt-4 rounded-lg"
                />
              </View>
              <View className="mt-4 px-8">
                {data.map((item) => {
                  return <Detail {...item} key={item.id} />;
                })}
              </View>
              <View className="mt-2 mx-auto items-center justify-center flex-row w-52 h-12 space-x-2 bg-green-900 rounded-xl">
                <CheckIcon color="green" />
                <Text className="text-green-500 font-extrabold">Verified</Text>
              </View>
              <TouchableOpacity
                onPress={() => setScanned(false)}
                className="mt-4 mx-auto w-52 h-14 rounded-full justify-center items-center border border-blue-600"
              >
                <Text className="font-extrabold text-blue-900 text-lg">
                  Tap to Scan Again
                </Text>
              </TouchableOpacity>
            </ImageBackground>
            </ScrollView>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-black font-extrabold text-3xl">
                No Bus Pass Available !!!
              </Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
}
