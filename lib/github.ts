const GITHUB_USERNAME = "Thanhbo209";

export interface GithubStats {
  publicRepos: number;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 }, // repo count doesn't change minute-to-minute
    });
    if (!res.ok) return null;
    const data = await res.json();
    return { publicRepos: data.public_repos };
  } catch (err) {
    console.error("Failed to fetch GitHub stats", err);
    return null;
  }
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionCalendar {
  totalLastYear: number;
  days: ContributionDay[];
}

// Real per-day contribution data isn't available from GitHub's own REST API
// without GraphQL + an auth token. This unauthenticated proxy scrapes the
// same public data shown on the profile page's contribution graph.
export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      totalLastYear: data.total?.lastYear ?? 0,
      days: data.contributions ?? [],
    };
  } catch (err) {
    console.error("Failed to fetch GitHub contribution calendar", err);
    return null;
  }
}
