import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar, Text, View } from "react-native";
import ConverterForm from "../components/ConverterForm";

export default function Home() {
  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar barStyle="dark-content" backgroundColor="#f1f5f9" />

      <View className="pt-16 pb-8 px-6 bg-white rounded-b-[40px] shadow-sm z-10">
        <View className="flex-row items-center justify-center mb-2">
          <MaterialCommunityIcons
            name="calculator-variant"
            size={32}
            color="#4f46e5"
            style={{ marginRight: 10 }}
          />
          <Text className="text-3xl font-black text-slate-900 tracking-tight">
            Unit Converter
          </Text>
        </View>
        <Text className="text-slate-500 text-center font-medium tracking-wide text-sm">
          Seamlessly convert between units
        </Text>
      </View>

      <View className="flex-1 px-6 justify-start mt-10">
        <ConverterForm />
      </View>

      <View className="pb-8 items-center">
        <Text className="text-slate-400 text-xs font-semibold">
          Made by Souvik
        </Text>
      </View>
    </View>
  );
}
