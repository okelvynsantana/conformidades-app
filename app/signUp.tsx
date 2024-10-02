import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TextInput} from "react-native";
import {Asset, useAssets} from "expo-asset";
import { ToastProvider } from "@/utils/toast";
import { LoginService } from "@/services/login_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/components/custom_text";


export default function SignUp() {
  const router = useRouter();
  const loginService = new LoginService();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [assets, errorAssets] = useAssets([require('@/assets/images/logo.png')]);

  const handleLogin = () => {
    router.navigate("/");
  }
  const handleSignUp = async () => {
    try {
      console.log("entrou")
      setLoading(true);
      if (!email || !name) {
        ToastProvider.show({
          title: "Ops...",
          message: "Preencha todos os campos",
          type: "error",
        })
        return;
      }

      const response = await loginService.createUser(email, name);
      await AsyncStorage.setItem("user_data", JSON.stringify(response));
      ToastProvider.show({
        title: "Tudo certo!",
        message: "Cadastro realizado com sucesso",
        type: "success"
      })
      console.log(response)
      setLoading(false);
      router.navigate("/home");
    }catch (error) {
      setLoading(false);
      ToastProvider.show({
        title: "Ops...",
        message: "Ocorreu um erro ao realizar o cadastro",
        type: "error"
      })
    }finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false, headerTitle: "Cadastro", statusBarColor: "#EFEFEF" }} />
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
                Cadastre-se
              </Text>
            </View>
            <KeyboardAvoidingView
              style={{ width: "100%", alignItems: "center", marginTop: 32 }}
            >
              <View style={{ width: "100%" }}>
              <TextInput
                keyboardType="default"
                autoCapitalize="none"
                value={name}
                onChangeText={(text) => setName(text)}
                autoCorrect={false}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#babaca",
                  fontFamily: "Poppins",
                }}
                placeholder="Qual o seu nome?"
              />
              </View>
              <View style={{ width: "100%", marginTop: 12 }}>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCorrect={false}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#babaca",
                  fontFamily: "Poppins",
                }}
                placeholder="Digite seu melhor e-mail"
              />
              </View>
              <View style={{ marginTop: 8, width: "100%" }}>
                <TouchableOpacity
                  onPress={handleSignUp}
                  // disabled={loading}
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
                    {loading ? "Carregando..." : "Criar conta"}
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={{ color: "#40A535", fontWeight: 'bold', marginTop: 16, }}>
                Já tenho cadastro
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </>
  );

}