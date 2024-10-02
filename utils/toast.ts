import Toast, { ToastType } from "react-native-toast-message";

export class ToastProvider {
  static show(data: {title: string; message: string, type: ToastType}) {
    Toast.show({
      type: data.type,
      text1: data.title,
      text2: data.message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    })
  }
}