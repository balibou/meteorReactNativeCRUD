import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const Button = (props) => {
  const { text, onPress, color } = props;

  if (color === 'danger') {
    return (
      <TouchableOpacity style={styles.buttonDanger} onPress={onPress}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
  color: React.PropTypes.string,
};

Button.defaultProps = {
  text: 'Button Text',
  onPress: () => console.log('Button Pressed'),
};

export default Button;
