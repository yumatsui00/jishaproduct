export interface VendorDownloadFormValues {
  companyName: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  referralSource: string;
  details: string;
}

export interface VendorDownloadFormErrors {
  companyName?: string;
  contactName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  referralSource?: string;
  details?: string;
}

export interface VendorFaqItem {
  question: string;
  answer: string;
}
