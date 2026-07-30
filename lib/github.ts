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

export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionCalendar {
  totalLastYear: number;
  days: ContributionDay[];
}

// Real per-day contribution data isn't available from GitHub's own REST API
// without GraphQL + an auth token. This unauthenticated proxy scrapes the
// same public data shown on the profile page's contribution graph.
//
// The API's own response also includes a `level` per day, deliberately
// dropped here (not just left untyped): it's computed with GitHub's
// internal quantile scheme (relative to this user's own distribution), not
// the fixed absolute thresholds this site's UI uses - keeping it around
// would invite some future call site to read the wrong one. Levels are
// computed fresh from `count` via lib/contribution-level.ts instead.
export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const contributions: { date: string; count: number }[] =
      data.contributions ?? [];
    return {
      totalLastYear: data.total?.lastYear ?? 0,
      days: contributions.map(({ date, count }) => ({ date, count })),
    };
  } catch (err) {
    console.error("Failed to fetch GitHub contribution calendar", err);
    return null;
  }
}

export interface ContributionBreakdown {
  commits: number;
  pullRequests: number;
  reviews: number;
  issues: number;
}

// The commits/PRs/reviews/issues split shown in the profile page's
// contribution graph tooltip isn't exposed by the REST API at all - it only
// exists in GraphQL's contributionsCollection, which requires an
// authenticated request even to read a user's own public data. Server-only
// (GITHUB_TOKEN has no NEXT_PUBLIC_ prefix, so it's never bundled to the
// client); returns null on any failure, including a missing token, so the
// UI can omit the stats row rather than break.
export async function getContributionBreakdown(): Promise<ContributionBreakdown | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - 365);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalIssueContributions
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const { data, errors } = await res.json();
    if (errors || !data?.user?.contributionsCollection) return null;

    const collection = data.user.contributionsCollection;
    return {
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      reviews: collection.totalPullRequestReviewContributions,
      issues: collection.totalIssueContributions,
    };
  } catch (err) {
    console.error("Failed to fetch GitHub contribution breakdown", err);
    return null;
  }
}
