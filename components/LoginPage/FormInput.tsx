import { useFormContext, Controller } from "react-hook-form"
import { TextInput, View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { useState } from 'react'
import { THEME_COLOR } from "../../constants/theme/color"
import FontistoIcon from "react-native-vector-icons/Fontisto"
import Ionicons from "react-native-vector-icons/Ionicons"

interface IFormInputProps {
  name: string
  placeholder: string
  iconType?: 'Ion' | 'Fontisto'
  iconName?: string
  secureTextEntry?: boolean
  required?: boolean
}

function FormInput({
  name,
  iconName,
  iconType,
  placeholder,
  secureTextEntry,
  required,
}: IFormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `${name} is required` : false,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          <View style={isFocused ? [styles.inputContainer, styles.inputContainerFocus] : styles.inputContainer}>
            {iconType === 'Fontisto' && (
              <FontistoIcon name={iconName} size={20} color={isFocused ? THEME_COLOR : "#a1a1a1"} />
            )}
            {
              iconType === 'Ion' && (
                <Ionicons name={iconName} size={20} color={isFocused ? THEME_COLOR : "#a1a1a1"} />
              )
            }
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              selectionColor={THEME_COLOR}
              onBlur={() => {
                onBlur()
                setIsFocused(false)
              }}
              onFocus={() => setIsFocused(true)}
              value={value}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
            />
          </View>
          {errors[name] && (
            <Text style={styles.errorText}>{`${errors[name]?.message}`}</Text>
          )}
        </View>
      )}
    />
  );
}

export default FormInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    alignItems: "center",
    borderBottomColor: "#edeef2",
  },
  inputContainerFocus: {
    borderBottomColor: THEME_COLOR,
  },
  input: {
    fontSize: 14,
    color: "#a1a1a1",
    fontWeight: "500",
    height: 30,
    width: "90%",
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    position: "absolute",
    bottom: -18,
  },
})