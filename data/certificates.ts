type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
  logo?: string;
};
export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Toeics",
    issuer: "Band 850+ / Upcoming",
    year: "2026",
    logo: "/certificates/toeic.png",
  },
  {
    title: "LeetCodes",
    issuer: "Self Learning",
    year: "2025 - Present",
    logo: "/certificates/LeetCode.png",
  },
];
