import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import AchievementCard from './AchievementCard'

const coinImg = require('@/assets/images/business/etc/coin.png')

const data = [
  { text: '795 БОНУС', image: coinImg },
  { text: '89% түсу ықтималдығы' },
  { text: '3 деңгей тест орындалды' },
]

const { width: screenWidth } = Dimensions.get('window')

const ITEM_WIDTH = screenWidth * 0.4
const SPACING = 5

const AchievementCarousel = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
      >
        {data.map(
          (item, index) =>
            (item.image && (
              <View key={index} style={{ marginRight: SPACING }}>
                <AchievementCard text={item.text} image={item.image} />
              </View>
            )) || (
              <View key={index} style={{ marginRight: SPACING }}>
                <AchievementCard text={item.text} />
              </View>
            ),
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingLeft: SPACING,
  },
})

export default AchievementCarousel
