import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
type BadgeProps = {
  color: string;
  label: string;
  icon?: string;
};
export const BadgeComponent = (props: BadgeProps) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        padding: 6,
        borderRadius: 24,
        maxWidth: 120,
        // minWidth: 100,
        alignItems: "center",
        // justifyContent: "space-between",
        flexDirection: "row",

      }}
    >
      {props.icon && (<MaterialIcons name={props.icon as any} size={16} color="#FFF" />)}
      <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 12, marginLeft: props.icon ? 4 : 0 }}>
        {props.label}
      </Text>
    </View>
  );
};
