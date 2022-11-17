import { StyleSheet, TouchableOpacity, Text } from "react-native"
import { useForm, FormProvider } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import FormInput from "./FormInput"
import { THEME_COLOR } from '../../constants/theme/color'
import { EScreenRoutes } from "../../constants/common/screens"
import { useSelector, useDispatch } from 'react-redux'
import { loggedInUser, login } from "../../reducers/auth.reducer"

function LoginForm(): JSX.Element {
  const currentUser = useSelector(loggedInUser)
  const navigation = useNavigation()

  if (currentUser?.email) {
    return navigation.navigate(EScreenRoutes.HOME as never)
  }

  const dispatch = useDispatch()

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  function onSubmit(formData) {
    dispatch(login(formData))

    // Alert.alert("Error", "Email or password invalid")
  }

  return (
    <FormProvider {...methods}>
      <FormInput
        name="email"
        placeholder="Email"
        required
        iconType="Fontisto"
        iconName={'email'}
      />
      <FormInput
        name="password"
        placeholder="Password"
        required
        iconType="Ion"
        iconName="md-lock-closed-outline"
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          styles.submitButton,
          isDirty ? styles.activeButton : styles.disabledSubmitButton,
        ]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitText}>login</Text>
      </TouchableOpacity>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    height: 36,
    borderRadius: 4,
    marginTop: 40,
  },
  activeButton: {
    backgroundColor: THEME_COLOR,
  },
  disabledSubmitButton: {
    backgroundColor: "#d7d9e0",
  },
  submitText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
})

export default LoginForm