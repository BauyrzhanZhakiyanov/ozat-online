import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import CustomButton from '@/components/ui/button/Button'
import Hint from '@/assets/icons/Hint'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

interface HintComponentProps {
  hint: string
  advancedHint?: string
}

const HintComponent = (props: HintComponentProps) => {
  const { hint, advancedHint } = props
  const [visible, setVisible] = useState(false)
  const [showingAdvancedHint, setShowingAdvancedHint] = useState(false)

  const showModal = () => {
    setVisible(true)
    setShowingAdvancedHint(false)
  }
  const hideModal = () => setVisible(false)

  const handleUnderstood = () => {
    hideModal()
    setShowingAdvancedHint(false)
  }

  const handleNotUnderstood = () => {
    setShowingAdvancedHint(true)
  }

  const handleClose = () => {
    hideModal()
    setShowingAdvancedHint(false)
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          {!showingAdvancedHint ? (
            <View style={styles.contentContainer}>
              <Text style={styles.text}>{hint}</Text>
              {advancedHint ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.understoodButton]}
                    onPress={handleUnderstood}
                  >
                    <Text style={styles.buttonText}>Түсіндім</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.notUnderstoodButton]}
                    onPress={handleNotUnderstood}
                  >
                    <Text style={styles.buttonText}>Әлі түсінбедім</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <CustomButton
                  style={styles.singleButton}
                  onPress={hideModal}
                  title="Жабу"
                ></CustomButton>
              )}
            </View>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.text}>{advancedHint}</Text>
              <CustomButton
                style={styles.singleButton}
                onPress={handleClose}
                title="Жабу"
              ></CustomButton>
            </View>
          )}
        </Modal>
      </Portal>
      <TouchableOpacity onPress={showModal}>
        <Hint />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    ...Fonts.Regular14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  understoodButton: {
    backgroundColor: '#4CAF50',
  },
  notUnderstoodButton: {
    backgroundColor: '#F44336',
  },
  singleButton: {
    backgroundColor: Colors.primary,
    width: 100,
    alignItems: 'center',
    paddingVertical: 4,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    ...Fonts.Regular14,
    textAlign: 'center',
  },
})

export default HintComponent
