import React, { Component } from 'react';
import { View, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CallButton extends Component {
  static defaultProps = {
    backgroundColor: 'red',
    iconColor: '#fff',
    iconSize: 32,
    iconName: 'call',
    textColor: '#fff',
    text: ''
  };

  render() {
    const {
      backgroundColor,
      iconColor,
      iconSize,
      iconName,
      textColor,
      text,
      ...restProps
    } = this.props;

    const buttonStyle = {
      width: 72,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 200,
      backgroundColor
    };

    const textStyle = {
      marginTop: 10,
      fontSize: 16,
      color: textColor,
      textAlign: 'center'
    };

    return (
      <View>
        <Button style={buttonStyle} {...restProps}>
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </Button>

        {text ? <Text style={textStyle}>{text}</Text> : null}
      </View>
    );
  }
}

export default CallButton;
