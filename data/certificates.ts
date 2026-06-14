type CertificateItem = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  logo?: string;
  link?: string;
};
export const CERTIFICATES: CertificateItem[] = [
  {
    id: 1,
    title: "TOEIC",
    issuer: "Listening & Reading: 870",
    year: "May 2026",
    logo: "/certificates/toeic.png",
    link: "https://www.ets.org/toeic",
  },
  // {
  //   title: "LeetCodes",
  //   issuer: "Self Learning",
  //   year: "2025 - Present",
  //   logo: "/certificates/LeetCode.png",
  //   link: "https://leetcode.com/Thanhbo209/",
  // },
];
