import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import Text from "@/components/custom_text";
import { router, Stack, useLocalSearchParams, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskService } from "@/services/task_service";
import { useCallback, useEffect, useState } from "react";
import { Task } from "@/entities/task";
import { BadgeComponent } from "@/components/badge";
import { Actions } from "@/utils/actions";
import ModalComponent from "@/components/modal";

export default function TaskDetails() {
  const { id } = useLocalSearchParams();
  const taskService = new TaskService();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getTask();
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      getTask();
    }, [])
  );

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
          headerShown: true,
          headerTitle: "",
          headerTintColor: "#FBFCFF",
          headerBackground: () => (
            <View style={{ backgroundColor: "#FBFCFF", flex: 1 }} />
          ),
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.navigate(`/tasks/edit/${id}`);
                }}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
            );
          },
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />

      <ScrollView
        style={{
          backgroundColor: "#FBFCFF",
          flex: 1,
          paddingHorizontal: 32,
          paddingVertical: 12,
        }}
      >
        {loading || !task ? (
          <Text>Carregando...</Text>
        ) : (
          <View style={{}}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {task?.title}
              </Text>
            </View>

            <View style={{ marginTop: 14 }}>
              <View style={{ marginTop: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  O status de tarefa agora é...
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <BadgeComponent
                  color={Actions.getStatusProps(task.status).color}
                  label={Actions.getStatusProps(task.status).label}
                  icon={Actions.getStatusProps(task.status).icon}
                />
              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                O que precisa ser feito?
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: "#838383" }}>
                {task?.description}
              </Text>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Quem deve fazer?
              </Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 14, color: "#838383" }}>
                {task?.responsible.name}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}
