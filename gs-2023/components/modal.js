import { StyleSheet, Text, View } from "react-native";
import RNModal from "react-native-modal";

export function Modal({ isVisible = false, children, ...props }) {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}
    >
      {children}
    </RNModal>
  );
}

const ModalContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({ children }) => <View style={styles.body}>{children}</View>;

const ModalFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4959ff",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: "4vh",
    color: "#ffd435",
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 5,
    flexDirection: "row",
    fontSize: "3vh",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
