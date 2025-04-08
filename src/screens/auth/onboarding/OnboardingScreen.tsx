import { useRef, useState } from "react";
import { ViewabilityConfigCallbackPairs } from "react-native";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { SCENES } from "./scenes.data";
import { Scene } from "./types";
import { SceneRenderer, ScrollIndicator } from "./components";
import { ImageBackground } from "expo-image";
import { ScreenFC } from "@/navigation/types";
import { Images } from "@/constants";
import { Button } from "@/components";
import { LinearGradient } from "expo-linear-gradient";

export const OnboardingScreen: ScreenFC<"OnboardingScreen"> = ({
  navigation,
}) => {
  const listRef = useRef<FlatList<Scene>>(null);
  const scrollXOffset = useSharedValue(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const isLastScene = activeSceneIndex == SCENES.length - 1;

  const handleGotoNextScene = () => {
    if (isLastScene) return navigation.navigate("SignInScreen");
    const index = Math.min(...[SCENES.length - 1, activeSceneIndex + 1]);
    setActiveSceneIndex(index);
    listRef.current?.scrollToIndex({ index, animated: true });
  };

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollXOffset.value = event.contentOffset.x;
  });

  const renderScene: ListRenderItem<Scene> = ({ item: scene, index }) => {
    return (
      <SceneRenderer
        sceneWidth={SCREEN_WIDTH}
        itemIdx={index}
        activeSceneIndex={activeSceneIndex}
        item={scene}
        scrollX={scrollXOffset}
        key={scene.id}
      />
    );
  };

  const viewabilityConfig = useRef<
    | ViewabilityConfigCallbackPairs
    | Animated.SharedValue<ViewabilityConfigCallbackPairs | undefined>
  >([
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 100,
        minimumViewTime: 0,
      },
      onViewableItemsChanged: (info) => {
        const nextItemIdx = info.viewableItems[0]?.index;
        if (nextItemIdx != undefined) setActiveSceneIndex(nextItemIdx);
      },
    },
  ]).current;

  return (
    <ImageBackground source={Images.graphPaper} style={styles.container}>
      <LinearGradient
        style={styles.containerInner}
        colors={["#ffffff00", "#fff0", "#fff", "#fff"]}
      >
        <View style={[styles.containerInner, { backgroundColor: "#fffc" }]}>
          <Animated.FlatList
            onScroll={onScroll}
            ref={listRef}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            scrollEventThrottle={16}
            viewabilityConfigCallbackPairs={viewabilityConfig}
            horizontal
            data={SCENES}
            keyExtractor={(item) => `${item.id}`}
            style={styles.horizontalList}
            renderItem={renderScene}
          />

          <ScrollIndicator
            sceneWidth={SCREEN_WIDTH}
            scenesLength={SCENES.length}
            scrollX={scrollXOffset}
          />

          <View style={styles.nextBtnWrapper}>
            <Button
              label={isLastScene ? "Get Started" : "Next"}
              onPress={handleGotoNextScene}
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  containerInner: {
    flex: 1,
  },
  horizontalList: {
    flex: 1,
  },

  nextBtnWrapper: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
});
