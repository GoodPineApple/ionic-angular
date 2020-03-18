export interface Profile {
  id: string;
  email: string;
  photoUrl?: string;
  name?: string;
  createUid: number;
  updateUid: number;
  createDate: Object;
  updateDate: Object;
}