import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <View style={styles.container}>
      <FontAwesome name="search" size={20} color={Colors.gray} />
      <TextInput
        style={styles.input}
        placeholder="Іздеу"
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor={Colors.gray}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    marginLeft: 10,
  },
})

export default SearchBar
