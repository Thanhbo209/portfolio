type CertificateItem = {
  title: string;
  issuer: string;
  year: string;
  logo?: string;
};
export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Toeics",
    issuer: "Aim: 850+ / Recent Mock Test: 775",
    year: "2026 - Present",
    logo: "/certificates/toeic.png",
  },
  {
    title: "LeetCodes",
    issuer: "Self Learning",
    year: "2025 - Present",
    logo: "/certificates/LeetCode.png",
  },
];
