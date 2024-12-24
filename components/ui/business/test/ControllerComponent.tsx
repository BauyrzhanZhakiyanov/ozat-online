import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

interface ControllerProps {
  isPracticeTest: boolean
  onPrevious: () => void
  onNext: () => void
  onCheck?: () => void
  onSubmit?: () => void
}

const ControllerComponent = (props: ControllerProps) => {
  const { isPracticeTest, onPrevious, onNext, onCheck, onSubmit } = props
  return (
    <View style={styles.controllerContainer}>
      {isPracticeTest ? (
        <>
          <Button title="Previous" onPress={onPrevious} />
          {onSubmit && <Button title="Submit" onPress={onSubmit} />}
          <Button title="Next" onPress={onNext} />
        </>
      ) : (
        <Button title="Check" onPress={onCheck} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  controllerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    height: 50,
  },
})

export default ControllerComponent
