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
    title: "HackerRank",
    issuer: "Problem Solving (Basic)",
    year: "Apr 2026",
    logo: "/certificates/HackerRank.png",
    link: "https://www.hackerrank.com/certificates/iframe/7fcde5d0fe87",
  },
  {
    id: 2,
    title: "HackerRank",
    issuer: "Python (Basic)",
    year: "May 2026",
    logo: "/certificates/HackerRank.png",
    link: "https://www.hackerrank.com/certificates/iframe/6cb481a4a4ba",
  },
  {
    id: 3,
    title: "TOEIC",
    issuer: "Preparing: 850+ / Recent Mock Test: 855",
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
