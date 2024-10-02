import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
};
export default function ModalComponent({ isVisible, children, onClose }: ModalProps) {
  return (
    <Modal presentationStyle='fullScreen' animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
                  <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        {children}
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContent: {
    height: '80%',
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    padding:16
  },
  // titleContainer: {
  //   height: '16%',
  //   backgroundColor: '#464C55',
  //   borderTopRightRadius: 10,
  //   borderTopLeftRadius: 10,
  //   paddingHorizontal: 20,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
