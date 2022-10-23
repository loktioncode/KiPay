import * as React from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { FieldError } from 'react-hook-form';
interface Props extends TextInputProps {
  name: string;
  label?: string;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
}

export default React.forwardRef<any, Props>(
  (props, ref): React.ReactElement => {
    const { label, labelStyle, error, ...inputProps } = props;

    return (
      <>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          ref={ref}
          style={[styles.input, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
          {...inputProps}
        />
        <Text style={styles.textError}>{error && error.message}</Text>
      </>
    );
  }
);

const styles = StyleSheet.create({

  input: {
    borderColor: "black",
    width: "90%",
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    padding: 25,
    color: 'black',

  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});