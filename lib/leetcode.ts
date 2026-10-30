export const LEETCODE_USERNAME = "oiK3QxlKNt";
export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
export const LEETCODE_TRACKER_URL = `https://dsa-tracking-six.vercel.app/u/thanhcow`;

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
  "1787011200": 10,
  "1787097600": 1,
  "1787270400": 12,
  "1787356800": 2,
  "1787616000": 1,
  "1787702400": 8,
  "1787788800": 11,
  "1787875200": 9,
  "1787961600": 1,
  "1788048000": 4,
  "1788134400": 1,
  "1788307200": 2,
  "1788480000": 5,
  "1788566400": 3,
  "1788652800": 21,
  "1788739200": 17,
  "1788825600": 4,
  "1788912000": 24,
  "1788998400": 14,
  "1789084800": 52,
  "1789171200": 7,
  "1789257600": 1,
  "1789344000": 14,
  "1789430400": 26,
  "1789516800": 7,
  "1789603200": 11,
  "1789689600": 26,
  "1789862400": 9,
  "1789948800": 4,
  "1790035200": 1,
  "1790121600": 10,
  "1790208000": 22,
  "1790294400": 10,
  "1790380800": 3,
  "1790467200": 33,
  "1790553600": 4,
  "1790640000": 18,
  "1790726400": 4,
  "1790812800": 1,
  "1790899200": 4,
  "1790985600": 1,
  "1791072000": 5,
  "1791158400": 10,
  "1791244800": 11,
  "1791331200": 2,
  "1791417600": 2,
  "1791504000": 2,
  "1791590400": 2,
  "1791763200": 2,
  "1791849600": 6,
  "1791936000": 3,
  "1792022400": 13,
  "1792108800": 4,
  "1792195200": 4,
  "1792281600": 13,
  "1792368000": 8,
  "1792454400": 1,
  "1792540800": 10,
  "1792713600": 4,
  "1792800000": 5,
  "1792886400": 9,
  "1792972800": 4,
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
    totalSolved: 98,
    totalQuestions: 4096,
    easySolved: 96,
    easyTotal: 974,
    mediumSolved: 2,
    mediumTotal: 2136,
    hardSolved: 0,
    hardTotal: 986,
    streak: 21,
    totalActiveDays: 62,
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

    const getCount = (
      arr: { difficulty: string; count: number }[],
      diff: string,
    ) =>
      arr.find((x) => x.difficulty.toLowerCase() === diff.toLowerCase())
        ?.count ?? 0;

    const easySolved = getCount(submissions, "Easy");
    const mediumSolved = getCount(submissions, "Medium");
    const hardSolved = getCount(submissions, "Hard");
    const totalSolved =
      getCount(submissions, "All") || easySolved + mediumSolved + hardSolved;

    const easyTotal = getCount(questions, "Easy") || 974;
    const mediumTotal = getCount(questions, "Medium") || 2136;
    const hardTotal = getCount(questions, "Hard") || 986;
    const totalQuestions =
      getCount(questions, "All") || easyTotal + mediumTotal + hardTotal;

    let parsedCalendar: Record<string, number> = FALLBACK_CALENDAR;
    try {
      if (matchedUser.userCalendar?.submissionCalendar) {
        parsedCalendar = JSON.parse(
          matchedUser.userCalendar.submissionCalendar,
        );
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
      streak: matchedUser.userCalendar?.streak ?? 21,
      totalActiveDays: matchedUser.userCalendar?.totalActiveDays ?? 62,
      totalSubmissionsPastYear: totalSubmissions,
      days,
    };
  } catch (err) {
    console.error("Failed to fetch LeetCode stats, using fallback:", err);
    return fallbackData;
  }
}
