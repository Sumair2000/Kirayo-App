import React,{useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) {

  const [hidePass, setHidePass] = useState(true)
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={hidePass ? true : false}
          autoCapitalize={false}
          autoComplete={false}
          autoCorrect={false}
        />
      ) : (
        <TextInput
          placeholder={label}
          autoCapitalize={false}
          keyboardType={keyboardType}
          autoComplete={false}
          autoCorrect={false}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      { inputType == 'password'&&
      <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
        <Icon name={hidePass ? "eye-slash": 'eye'} size={17} style={{marginRight: 10}}  />
      </TouchableOpacity>}
    </View>
  );
}