import { Animated, Easing } from 'react-native';

const transitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const { initWidth: width } = layout;
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    });

    return { transform: [{ translateX }] };
  },
});

export const acceptanceTransitionConfig = () => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { position, scene, scenes } = sceneProps;
    const thisSceneIndex = scene.index;
    const { routeName } = scene.route;
    const nextScene = scenes[thisSceneIndex + 1];
    let rotateY = position.interpolate({
      inputRange: [thisSceneIndex, thisSceneIndex + 1],
      outputRange: ['0deg', '-180deg'],
    });
    if (routeName === 'CompactProfile' && nextScene && nextScene.route.routeName === 'AcceptanceScreen') {
      rotateY = position.interpolate({
        inputRange: [thisSceneIndex, thisSceneIndex + 1],
        outputRange: ['-180deg', '0deg'],
      });
    }
    return { transform: [{ rotateY }] };
  },
});

export default transitionConfig;
