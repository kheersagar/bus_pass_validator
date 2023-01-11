import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OptionCard = ({title,imageSrc,route}) => {
  const navigate = useNavigation()
  return (
    <TouchableOpacity className="bg-[#4274AF] h-28 w-full rounded-md justify-center items-center mt-2 " onPress={() => navigate.navigate(route)}>
        <Image source={imageSrc} className="w-12 h-12"/>
        <Text className="font-extrabold  text-white mt-4">{title}</Text>
    </TouchableOpacity>
  )
}

export default OptionCard