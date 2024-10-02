import { Task, TaskStatus } from "@/entities/task";
import { Actions } from "@/utils/actions";
import { View } from "react-native";
import Text from "./custom_text";
import { BadgeComponent } from "./badge";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {


  return (
    <View
      key={task.id}
      style={{
        backgroundColor: "#FFF",
        padding: 24,
        borderRadius: 24,
        marginBottom: 8,
        borderColor: "#EFEFEF",
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: Actions.getStatusProps(task.status).color,
            borderRadius: 15,
          }}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "bold", fontSize: 16, marginLeft: 8 }}
        >
          {task.title}
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "normal",
          marginTop: 12,
          fontSize: 14,
          color: "#6C6C6C",
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {task.description}
      </Text>
      <Text
        style={{
          fontWeight: "normal",
          marginTop: 12,
          fontSize: 14,
          color: "#6C6C6C",
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {task.responsible.name}
      </Text>
      <View
        style={{
          alignItems: "flex-start",
          width: "100%",
          marginTop: 12,
          // borderColor: "red",
          // borderWidth: 1,
        }}
      >
        <BadgeComponent
          color={Actions.getStatusProps(task.status).color}
          label={Actions.getStatusProps(task.status).label}
          icon={Actions.getStatusProps(task.status).icon}
        />
      </View>
    </View>
  );
};

export default TaskCard;
