export interface Participant {
  id: string
  status: 'INPROGRESS' | 'COMPLETED'
  testId: string
}
