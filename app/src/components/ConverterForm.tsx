import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  feetToMeters,
  metersToFeet,
} from "../utils/conversions";

export default function ConverterForm() {
  const [value, setValue] = useState("");
  const [type, setType] = useState("metersToFeet");

  const numericValue = parseFloat(value);
  const isValid = !isNaN(numericValue) && value !== "";

  let result: string = "";
  let iconName: keyof typeof MaterialCommunityIcons.glyphMap = "ruler";

  if (isValid) {
    switch (type) {
      case "metersToFeet":
        result = metersToFeet(numericValue);
        iconName = "ruler";
        break;
      case "feetToMeters":
        result = feetToMeters(numericValue);
        iconName = "ruler";
        break;
      case "celsiusToFahrenheit":
        result = celsiusToFahrenheit(numericValue);
        iconName = "thermometer";
        break;
      case "fahrenheitToCelsius":
        result = fahrenheitToCelsius(numericValue);
        iconName = "thermometer";
        break;
    }
  }

  const resultScale = useSharedValue(1);
  const resultOpacity = useSharedValue(0);

  useEffect(() => {
    if (isValid) {
      resultScale.value = withSpring(1.1, {}, () => {
        resultScale.value = withSpring(1);
      });
      resultOpacity.value = withTiming(1);
    } else {
      resultOpacity.value = withTiming(0.5);
    }
  }, [result, isValid]);

  const animatedResultStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: resultScale.value }],
      opacity: resultOpacity.value,
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify()}
      className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100"
    >
      <View className="mb-6">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
          Input Value
        </Text>
        <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:border-indigo-500">
          <MaterialCommunityIcons
            name="numeric"
            size={24}
            color="#64748b"
            style={{ marginRight: 8 }}
          />
          <TextInput
            value={value}
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9.]/g, "");

              const parts = cleaned.split(".");
              if (parts.length > 2) return;

              setValue(cleaned);
            }}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor="#94a3b8"
            className="flex-1 text-xl font-bold text-slate-800"
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
          Conversion Type
        </Text>
        <View className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-row items-center">
          <View className="pl-4">
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={24}
              color="#64748b"
            />
          </View>
          <Picker
            selectedValue={type}
            onValueChange={setType}
            style={{ height: 55, width: "100%", marginLeft: -10 }}
          >
            <Picker.Item label="Meters → Feet" value="metersToFeet" />
            <Picker.Item label="Feet → Meters" value="feetToMeters" />
            <Picker.Item
              label="Celsius → Fahrenheit"
              value="celsiusToFahrenheit"
            />
            <Picker.Item
              label="Fahrenheit → Celsius"
              value="fahrenheitToCelsius"
            />
          </Picker>
        </View>
      </View>

      <View className="bg-indigo-600 rounded-2xl p-6 items-center justify-center shadow-lg shadow-indigo-200">
        <Text className="text-indigo-200 font-medium text-xs uppercase tracking-widest mb-2">
          Result
        </Text>
        <Animated.View
          style={animatedResultStyle}
          className="flex-row items-center"
        >
          <MaterialCommunityIcons
            name={iconName}
            size={32}
            color="white"
            style={{ marginRight: 12, opacity: 0.8 }}
          />
          <Text className="text-5xl font-black text-white">
            {isValid ? result : "—"}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
