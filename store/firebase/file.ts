import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/store/firebase/index'

export const getCourseImageUrl = async (imagePath: string): Promise<string> => {
  try {
    const imageRef = ref(storage, imagePath)
    return await getDownloadURL(imageRef)
  } catch (error) {
    console.error('Error getting image URL from Firebase:', error)
    throw error
  }
}

export const getFileDownloadUrl = async (
  lessonId: string,
  path: string,
): Promise<string> => {
  try {
    const fileRef = ref(storage, `/uploads/files/${lessonId}/${path}`)
    return await getDownloadURL(fileRef)
  } catch (error) {
    console.error('Error getting file URL from Firebase:', error)
    throw error
  }
}
