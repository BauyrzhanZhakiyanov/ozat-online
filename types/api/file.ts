export interface FileModel {
  id: string
  fileName: string
  fileSize: number
  fileType: 'IMAGE' | 'PDF' | 'DOC' | 'PPT' | 'XLS' | 'ZIP' | 'OTHER'
  url: string
  lessonId: string
  path: string
  title: string
}
