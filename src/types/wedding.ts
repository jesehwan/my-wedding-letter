export interface Parent {
  role: string;
  name: string;
  phone: string;
}

export interface CoupleInfo {
  groomName: string;
  brideName: string;
  groomFamilyName: string;
  brideFamilyName: string;
  groomParents: Parent[];
  brideParents: Parent[];
}

export interface WeddingInfoData {
  date: string;
  time: string;
  venue: string;
  address: string;
  couple: CoupleInfo;
}
