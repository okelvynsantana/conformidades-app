import TaskCard from "@/components/task_card";
import { Task } from "@/entities/task";
import { TaskService } from "@/services/task_service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import CustomText from "@/components/custom_text";
import Skeleton from "@/components/skeleton";
import { AxiosError } from "axios";

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export default function HomeScreen() {
  const taskService = new TaskService();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [errorTasks, setErrorTasks] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getUserTasks();
  }, [userInfo]);

  useFocusEffect(
    useCallback(() => {
      getUserTasks();
    }, [])
  );

  const getUserTasks = async () => {
    if (!userInfo) {
      return;
    }

    try {
      setErrorTasks(false);
      setLoadingTasks(true);
      const tasks = await taskService.getUserTasks(userInfo.id);
      setTasks(tasks);
      console.log({ tasks });
      setLoadingTasks(false);
    } catch (error: AxiosError | Error | any) {
      setLoadingTasks(false);
      setErrorTasks(true);
      console.log(error.response.data);
    }
  };

  const getUserInfo = async () => {
    const user = await AsyncStorage.getItem("user_data");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserInfo(parsedUser);
      return;
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getUserTasks();
    setRefreshing(false);
  };

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          {userInfo ? (
            <CustomText style={{ fontWeight: "bold", fontSize: 24 }}>{`Olá, ${
              userInfo?.name.split(" ")[0]
            }!`}</CustomText>
          ) : (
            <View style={{ marginTop: 4 }}>
                <Skeleton shape="rectangle" height={20} width={100} />
              </View>
          )}
          {loadingTasks ? (
            <View>
              <View style={{ marginTop: 4 }}>
                <Skeleton shape="rectangle" height={20} width={100} />
              </View>
              <View style={{ marginTop: 4 }}>
                <Skeleton shape="rectangle" height={20} width={100} />
              </View>
              <View style={{ marginTop: 4 }}>
                <Skeleton shape="rectangle" height={20} width={100} />
              </View>
            </View>
          ) : (
            <View>
              <View style={{ marginTop: 4 }}>
                <CustomText style={{ fontSize: 12 }}>
                  {`Tarefas pendentes: ${
                    tasks.filter((task) => task.status === "pending").length
                  }`}
                </CustomText>
              </View>
              <View style={{ marginTop: 4 }}>
                <CustomText style={{ fontSize: 12 }}>
                  {`Tarefas concluídas: ${
                    tasks.filter((task) => task.status === "completed").length
                  }`}
                </CustomText>
              </View>
              <View style={{ marginTop: 4 }}>
                <CustomText style={{ fontSize: 12 }}>
                  {`Tarefas pendentes: ${
                    tasks.filter((task) => task.status === "in_progress").length
                  }`}
                </CustomText>
              </View>
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 12,
              height: 40,
              borderRadius: 20,
              backgroundColor: "green",
            }}
            onPress={() => {router.push("/tasks/create_task")}}
          >
            <CustomText
              style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
            >
              Criar tarefa
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "Home",
        }}
      />
      <View style={{ backgroundColor: "#FBFCFF", flex: 1 }}>
        <SafeAreaView style={{ padding: 16, flex: 1 }}>
          <View style={{ padding: 24, width: "100%", flex: 1 }}>
            {renderHeader()}
            <View
              style={{
                marginTop: 16,
                flex: 1,
              }}
            >
              {loadingTasks ? (
                <FlatList
                  data={[1, 2, 3, 4, 5]}
                  renderItem={() => (
                    <View style={{ padding: 4 }}>
                      <Skeleton borderRadius={24} height={200} width="100%" />
                    </View>
                  )}
                />
              ) : (
                <FlatList
                  style={{}}
                  data={tasks}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/tasks/${item.id}`);
                      }}
                    >
                      <TaskCard task={item} />
                    </TouchableOpacity>
                  )}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
