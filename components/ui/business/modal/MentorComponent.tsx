import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import CustomButton from '../../button/Button'
import Mentor from '../../../../assets/icons/Mentor'
import { Fonts } from '@/constants'
import { Colors } from '@/constants/colors'

interface MentorComponentProps {
  inProgresstest?: boolean
}

const MentorComponent = (props: MentorComponentProps) => {
  const { inProgresstest } = props
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }
  const hideModal = () => setVisible(false)

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.contentContainer}>
            <CustomButton
              style={styles.singleButton}
              onPress={hideModal}
              title="Менторға хабарласу"
            ></CustomButton>
          </View>
        </Modal>
      </Portal>
      <TouchableOpacity onPress={showModal}>
        {inProgresstest && <Mentor />}
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
    width: 200,
    alignItems: 'center',
    paddingVertical: 10,
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

export default MentorComponent
