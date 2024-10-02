import { Stack, useRouter } from "expo-router";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import {Asset, useAssets} from "expo-asset";
import { LoginService } from "@/services/login_service";
import { useEffect, useState } from "react";
import { ToastProvider } from "@/utils/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/components/custom_text";

export default function InitialScreen() {
  const loginService = new LoginService()
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [assets, errorAssets] = useAssets([require('@/assets/images/logo.png')]);


  useEffect(() => {
    checkUserLogged()
  })

  const checkUserLogged = async () => {
    const user = await AsyncStorage.getItem('user_data')
    if(user) {
      // return
      const parsedUser = JSON.parse(user)
      setEmail(parsedUser.email)
      router.navigate('/home') // TODO: change to the correct route
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      if(!email) {
        ToastProvider.show({
          title: 'Ops...',
          message: 'Preencha o campo de email',
          type: 'error'
        })
        return
      }
      const response = await loginService.login(email)
      await AsyncStorage.setItem('user_data', JSON.stringify(response))
      ToastProvider.show({
        title: 'Tudo certo!',
        message: 'Login realizado com sucesso',
        type: 'success'
      })
      router.navigate('/home')

    } catch (error) {
      console.log(error)
      setLoading(false)
      ToastProvider.show({
        title: 'Ops...',
        message: 'Parece que você ainda não tem conta',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }

  }
  
  const handleSignUp = () => {
    router.navigate('/signUp')
  }

  
  return (
    <>
      <Stack.Screen options={{ headerShown: false, headerTitle: "Login", statusBarColor: "#EFEFEF" }} />
      <View
        style={{
          backgroundColor: "#EFEFEF",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SafeAreaView style={{ width: "100%", paddingHorizontal: 16 }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {assets ? <Image
              source={assets[0].uri}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            /> : null}
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontWeight: "bold", color: "#1D1D1B" }}>
                Central de Conformidades
              </Text>
            </View>
            <KeyboardAvoidingView
              style={{ width: "100%", alignItems: "center", marginTop: 32 }}
            >
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
                style={{
                  fontFamily: "Poppins",
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#babaca",
                }}
                placeholder="Digite seu email para fazer login"
              />
              <View style={{ marginTop: 8, width: "100%" }}>
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={{
                    alignItems: "center",
                    backgroundColor: loading ? "#366D30" : "#40A535",
                    justifyContent: "center",
                    borderRadius: 8,
                    width: "100%",
                    height: 50,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {loading ? "Carregando..." : "Entrar"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={{ marginTop: 16, color: "#1D1D1B" }}>
                Não possui uma conta?{" "}
                <Text style={{ fontWeight: 'bold', color: "#40A535" }}>Cadastre-se</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
