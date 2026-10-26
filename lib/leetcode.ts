export const LEETCODE_USERNAME = "Thanhbo209";
export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;

export interface LeetCodeDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface LeetCodeDifficultyStats {
  difficulty: "Easy" | "Medium" | "Hard";
  solved: number;
  total: number;
  color: string;
}

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  streak: number;
  totalActiveDays: number;
  totalSubmissionsPastYear: number;
  days: LeetCodeDay[];
}

// Fallback snapshot data from LeetCode GraphQL in case network/API is unavailable
const FALLBACK_CALENDAR: Record<string, number> = {
  "1772928000": 1, // 2026-03-08
  "1773014400": 1,
  "1773273600": 2,
  "1773360000": 5,
  "1773446400": 5,
  "1773532800": 1,
  "1773619200": 19,
  "1773705600": 7,
  "1773792000": 3,
  "1773878400": 8,
  "1774051200": 2,
  "1774137600": 2,
  "1774224000": 7,
  "1774483200": 4,
  "1774915200": 6,
  "1775001600": 4,
  "1775088000": 28,
  "1775174400": 1,
  "1775260800": 3,
  "1775347200": 5,
  "1775606400": 2,
  "1778976000": 4,
  "1779062400": 12,
  "1779235200": 4,
  "1780099200": 5,
  "1780185600": 33,
  "1780272000": 3,
  "1780444800": 3,
  "1780617600": 2,
  "1786752000": 5,
};

function buildCalendarDays(calendarMap: Record<string, number>): {
  days: LeetCodeDay[];
  totalSubmissions: number;
} {
  // Convert timestamp map into date map "YYYY-MM-DD" -> count
  const dateCounts: Record<string, number> = {};
  for (const [timestampStr, count] of Object.entries(calendarMap)) {
    const ts = Number(timestampStr);
    if (!isNaN(ts)) {
      const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + count;
    }
  }

  // Build 52 weeks (364 days) aligned to end at the coming Saturday
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 6 is Saturday
  const daysToSaturday = 6 - currentDay;
  const end = new Date(today);
  end.setDate(today.getDate() + daysToSaturday);

  const days: LeetCodeDay[] = [];
  let totalSubmissions = 0;

  for (let i = 52 * 7 - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const count = dateCounts[dateStr] || 0;
    days.push({ date: dateStr, count });
    totalSubmissions += count;
  }

  return { days, totalSubmissions };
}

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  const fallbackBuilt = buildCalendarDays(FALLBACK_CALENDAR);
  const fallbackData: LeetCodeStats = {
    username: LEETCODE_USERNAME,
    totalSolved: 45,
    totalQuestions: 4095,
    easySolved: 45,
    easyTotal: 974,
    mediumSolved: 0,
    mediumTotal: 2135,
    hardSolved: 0,
    hardTotal: 986,
    streak: 8,
    totalActiveDays: 30,
    totalSubmissionsPastYear: fallbackBuilt.totalSubmissions,
    days: fallbackBuilt.days,
  };

  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          userCalendar {
            submissionCalendar
            streak
            totalActiveDays
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return fallbackData;
    }

    const data = await res.json();
    const matchedUser = data?.data?.matchedUser;
    const allQuestions = data?.data?.allQuestionsCount;

    if (!matchedUser) {
      return fallbackData;
    }

    const submissions: { difficulty: string; count: number }[] =
      matchedUser.submitStatsGlobal?.acSubmissionNum ?? [];
    const questions: { difficulty: string; count: number }[] =
      allQuestions ?? [];

    const getCount = (arr: { difficulty: string; count: number }[], diff: string) =>
      arr.find((x) => x.difficulty.toLowerCase() === diff.toLowerCase())?.count ?? 0;

    const easySolved = getCount(submissions, "Easy");
    const mediumSolved = getCount(submissions, "Medium");
    const hardSolved = getCount(submissions, "Hard");
    const totalSolved =
      getCount(submissions, "All") || (easySolved + mediumSolved + hardSolved);

    const easyTotal = getCount(questions, "Easy") || 974;
    const mediumTotal = getCount(questions, "Medium") || 2135;
    const hardTotal = getCount(questions, "Hard") || 986;
    const totalQuestions =
      getCount(questions, "All") || (easyTotal + mediumTotal + hardTotal);

    let parsedCalendar: Record<string, number> = FALLBACK_CALENDAR;
    try {
      if (matchedUser.userCalendar?.submissionCalendar) {
        parsedCalendar = JSON.parse(matchedUser.userCalendar.submissionCalendar);
      }
    } catch {
      // Use fallback
    }

    const { days, totalSubmissions } = buildCalendarDays(parsedCalendar);

    return {
      username: matchedUser.username || LEETCODE_USERNAME,
      totalSolved,
      totalQuestions,
      easySolved,
      easyTotal,
      mediumSolved,
      mediumTotal,
      hardSolved,
      hardTotal,
      streak: matchedUser.userCalendar?.streak ?? 8,
      totalActiveDays: matchedUser.userCalendar?.totalActiveDays ?? 30,
      totalSubmissionsPastYear: totalSubmissions,
      days,
    };
  } catch (err) {
    console.error("Failed to fetch LeetCode stats, using fallback:", err);
    return fallbackData;
  }
}
