import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../API/API";
import { Formik } from 'formik'
import * as yup from 'yup'
import * as Progress from 'react-native-progress';
import { StatusBar as ExpoBar } from "expo-status-bar";

const Login = () => {
  const {isLoading} = useSelector(state => state.login)
  const navigate = useNavigation()
  const dispatch = useDispatch()
  const loginValidationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is Required'),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })
  return (
    <View className="relative flex-1 justify-center items-center bg-[#FFFFFF]">
     <ExpoBar style="dark" translucent={true} hidden={false} />
      <Image source={require("../assets/Image/loginBackground-1.png")} className="absolute top-0 h-64 w-full" />
      <Image source={require("../assets/Image/loginBackground-2.png")} className="absolute bottom-0 h-52 w-full" />

      <View >
        <Image source={require("../assets/icon.png")} className="w-36 h-36" />
      </View>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginValidationSchema}
        onSubmit={values => {
          dispatch(LoginUser(values,navigate))
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid,touched }) => (
          <View className="w-full px-6 mt-2">
            <TextInput name="username"
            keyboardType="email-address"
              onChangeText={handleChange('username')}
              value={values.username}
              placeholder="Username" className=" h-16 w-full border-2 rounded-xl pl-4 mt-4 placeholder:font-bold placeholder:text-xl" />
              {touched.username && errors.username && <Text className="text-red-600 font-medium text-lg mt-2">{errors.username}</Text> }
            <TextInput name="password"
              onChangeText={ handleChange('password')}
              value={values.password}
              secureTextEntry placeholder="Password" className=" h-16 w-full border-2 rounded-xl pl-4 mt-4 placeholder:font-bold placeholder:text-xl" />
            {touched.password && errors.password && <Text className="text-red-600 font-medium text-lg mt-2">{errors.password}</Text> }
            <TouchableOpacity onPress={() => navigate.navigate("forgot-password")} className="mt-2">
              <Text className="font-extrabold text-[#060F2F] text-right pr-4 underline text-lg">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} className="bg-[#060F2F] mt-10 h-16 rounded-full justify-center items-center">
              { !isLoading ?
                <Text className="text-white text-xl">Login</Text>
                :
                <Progress.Circle size={30} indeterminate={true} />
              }
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default Login