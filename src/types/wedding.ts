export interface CoupleInfo {
  groomName: string;
  brideName: string;
  groomFamilyName: string;
  brideFamilyName: string;
}

export interface WeddingInfoData {
  date: string;
  time: string;
  venue: string;
  address: string;
  couple: CoupleInfo;
}
