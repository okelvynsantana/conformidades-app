import { TextInput, TouchableOpacity, View, ScrollView, Pressable } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Text from "@/components/custom_text";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskService } from "@/services/task_service";
import React, { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/entities/task";
import RnPickerSelect from "react-native-picker-select";
import { UserInfo } from "@/app/home";
import { Actions } from "@/utils/actions";
import { ToastProvider } from "@/utils/toast";

export default function EdiTaskScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const taskService = new TaskService();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [userOptions, setUserOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    getTask();
    getUsers();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!task) {
        return;
      }
      await taskService.updateTask(task);
      ToastProvider.show({
        title: "Tudo certo!",
        message: "Tarefa atualizada com sucesso",
        type: "success",
      })
      setSaving(false);
      router.navigate(`/tasks/${task.id}`);
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  }

  const getUsers = async () => {
    try {
      const response = await taskService.getUsers();
      setUsers(response);
      const data = response.map((user: UserInfo) => {
        return {
          label: user.name,
          value: user.id,
        };
      });
      setUserOptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTask(id as string);
      console.log(response);
      setTask(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Stack.Screen
      options={{
        headerTitle: "Editar Tarefa",
        headerLeft: () => {
        return (
          <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        );
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerStyle: {
        backgroundColor: "#FBFCFF",
        },
      }}
      />
      <ScrollView
      style={{ backgroundColor: "#FBFCFF", flex: 1, width: "100%" }}
      >
      <View style={{ alignItems: "center", padding: 16, width: "100%" }}>
        <View style={{ width: "100%" }}>
        <View>
          <Text
          style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}
          >
          Nome da Tarefa
          </Text>
        </View>
        <TextInput
          keyboardType="default"
          autoCapitalize="none"
          value={task?.title || ""}
          onChangeText={(text) => {
          if (task) {
            setTask({ ...task, title: text });
          }
          }}
          autoCorrect={false}
          style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#babaca",
          fontFamily: "Poppins",
          }}
          placeholder="Qual o título da tarefa?"
        />
        </View>
        <View style={{ width: "100%", marginTop: 18 }}>
        <View>
          <Text
          style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}
          >
          Descrição da tarefa
          </Text>
        </View>
        <TextInput
          keyboardType="default"
          autoCapitalize="none"
          multiline
          value={task?.description || ""}
          onChangeText={(text) => {
          if (task) {
            setTask({ ...task, description: text });
          }
          }}
          autoCorrect={false}
          style={{
          width: "100%",
          height: 200,
          padding: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#babaca",
          fontFamily: "Poppins",
          }}
          placeholder="Qual a descrição da tarefa?"
        />
        </View>

        <View style={{ width: "100%", marginTop: 18 }}>
        <View>
          <Text
          style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}
          >
          Status da tarefa
          </Text>
        </View>
        <View
          style={{
          width: "100%",
          borderRadius: 8,
          }}
        >
          <RnPickerSelect
          onValueChange={(itemValue) => {
            if (task) {
            setTask({ ...task, status: itemValue as TaskStatus });
            }
          }}
          items={[
            { label: "Pendente", value: "pending" },
            { label: "Em progresso", value: "in_progress" },
            { label: "Completa", value: "completed" },
          ]}
          value={task?.status || "pending"}
          style={{
            inputIOS: {
            width: "100%",
            height: 50,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#babaca",
            backgroundColor: "#fff",
            fontFamily: "Poppins",
            fontSize: 16,
            },
            inputAndroid: {
            width: "100%",
            height: 50,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#babaca",
            backgroundColor: "#fff",
            fontFamily: "Poppins",
            fontSize: 16,
            },
          }}
          />
        </View>
        </View>

        <View style={{ width: "100%", marginTop: 18 }}>
        <View>
          <Text
          style={{ fontSize: 16, marginBottom: 8, fontWeight: "bold" }}
          >
          Quem deve fazer?
          </Text>
        </View>
        <View
          style={{
          width: "100%",
          borderRadius: 8,
          }}
        >
          <RnPickerSelect
          placeholder="Selecione um usuário"

          onValueChange={(itemValue) => {
            if (task) {
            const user = users.find((user) => user.id === itemValue);
            if (user) {
              setTask({ ...task, responsible: user });
            }
            }
          }}
          items={userOptions}
          value={task?.responsible.id}
          style={{
            inputIOS: {
            width: "100%",
            height: 50,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#babaca",
            backgroundColor: "#fff",
            fontFamily: "Poppins",
            fontSize: 16,
            },
            inputAndroid: {
            width: "100%",
            height: 50,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#babaca",
            backgroundColor: "#fff",
            fontFamily: "Poppins",
            fontSize: 16,
            },
          }}
          />
        </View>
        </View>


        <View style={{ width: "100%", marginTop: 18 }}>
        <TouchableOpacity
            onPress={handleSave}
            // disabled={loading}
            style={{
            alignItems: "center",
            backgroundColor: saving ? "#366D30" : "#40A535",
            justifyContent: "center",
            borderRadius: 8,
            width: "100%",
            height: 50,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
            {saving ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        
        </View>
      </View>
      </ScrollView>
    </>
  );
}
