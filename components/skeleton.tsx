import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

const time = 1000;

const Skeleton = (props: any) => {
  const [visible, setVisible] = useState(true);
  const fadeAnimation = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: time,
      useNativeDriver: false,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    }).start();
  };

  const toggle = () => {
    if (!visible) {
      return;
    }
    fadeOut();
    setTimeout(() => {
      fadeIn();
      setTimeout(() => {
        toggle();
      }, time);
    }, time);
  };

  useEffect(() => {
    toggle();
    return () => {
      setVisible(false);
    };
  }, []);


  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnimation,
        },
      ]}
    >
      <View
        style={{
          width: props.width,
          height: props.height,
          marginVertical: props.marginVertical,
          backgroundColor: '#c4c4c4',
          borderRadius: props.borderRadius || 4,
        }}
      />
    </Animated.View>
  );
};

export default Skeleton;
