import { Link, useRouter } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'

export default function Memories() {
  const router = useRouter()
  const { top, bottom } = useSafeAreaInsets()

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }


  return (
    <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-9 w-9 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-9 w-9 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>

        </View>
      </View>

    </ScrollView >
  )
}