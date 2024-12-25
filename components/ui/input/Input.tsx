import React, { forwardRef, Ref, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { TextInputMask } from 'react-native-masked-text'
import { Fonts, Spacing } from '@/constants'
import { Colors } from '@/constants/colors'

interface CustomInputProps extends TextInputProps {
  label: string
  mask?: string
  error?: string
  containerStyle?: ViewStyle
  inputWrapperStyle?: ViewStyle
  labelStyle?: TextStyle
}

const CustomInput = forwardRef<TextInput | TextInputMask, CustomInputProps>(
  (
    {
      label,
      mask,
      secureTextEntry,
      error,
      containerStyle,
      inputWrapperStyle,
      labelStyle,
      style,
      ...props
    },
    ref,
  ) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry)

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, { ...Fonts.Regular18 }, labelStyle]}>
          {label}
        </Text>
        <View
          style={[
            styles.inputContainer,
            inputWrapperStyle,
            error ? styles.inputContainerError : null,
          ]}
        >
          {mask ? (
            <TextInputMask
              {...props}
              ref={ref as Ref<TextInputMask>}
              type={'custom'}
              options={{
                mask: mask,
              }}
              style={[
                { ...Fonts.Regular18 },
                styles.input,
                style,
                error ? styles.inputError : null,
              ]}
              secureTextEntry={isSecure}
            />
          ) : (
            <TextInput
              ref={ref as Ref<TextInput>}
              style={[
                { ...Fonts.Regular18 },
                styles.input,
                error ? styles.inputError : null,
              ]}
              secureTextEntry={isSecure}
              {...props}
            />
          )}
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setIsSecure(!isSecure)}
            >
              <Icon
                name={isSecure ? 'eye-off' : 'eye'}
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={16} color="red" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    )
  },
)

CustomInput.displayName = 'CustomInput'

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: Spacing.mr6,
    color: Colors.black,
    ...Fonts.Regular18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 10,
  },
  inputContainerError: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    marginLeft: 4,
    fontSize: 12,
  },
})

export default CustomInput
