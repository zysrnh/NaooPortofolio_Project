import { useEffect, useState } from "react";

interface ContributionData {
  date: string;
  count: number;
}

interface GitHubContributionsProps {
  username?: string;
  year?: number;
}

function getContributionColor(count: number): string {
  if (count === 0) return "#1a1a2e";
  if (count < 5) return "#0f3460";
  if (count < 10) return "#533483";
  if (count < 15) return "#9ECCFA";
  return "#16a34a";
}

function generateMockContributions(): ContributionData[] {
  const contributions: ContributionData[] = [];
  const today = new Date();
  const yearAgo = new Date(today);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  for (let d = new Date(yearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    // Lebih banyak kontribusi di bulan terakhir
    const monthsAgo = (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24 * 30);
    const baseChance = monthsAgo < 3 ? 0.7 : 0.4;
    const count = Math.random() < baseChance ? Math.floor(Math.random() * 20) : 0;

    contributions.push({
      date: new Date(d).toISOString().split("T")[0],
      count,
    });
  }

  return contributions;
}


  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    // Simulasi fetch dari GitHub API atau gunakan mock data
    const data = generateMockContributions();
    setContributions(data);

    // Hitung total
    const total = data.reduce((sum, day) => sum + day.count, 0);
    setTotalContributions(total);

    setLoading(false);
  }, []);

  const getWeeks = () => {
    const weeks: ContributionData[][] = [];
    let currentWeek: ContributionData[] = [];

    contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = getWeeks();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthLabels: Record<number, string> = {};

  contributions.forEach((day) => {
    const date = new Date(day.date);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const weekIndex = Math.floor(contributions.indexOf(day) / 7);
    if (weekIndex % 4 === 0) {
      monthLabels[weekIndex] = month;
    }
  });

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left">
        <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">
          Contributions
        </h2>
        <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] p-6 sm:p-10">
          <div className="skeleton-shimmer h-48" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 reveal from-left">
      <h2 className="text-2xl font-black uppercase mb-6 text-[#0B1957]">
        Contributions
      </h2>

      <div className="bg-[#F8F3EA] border-4 border-[#0B1957] shadow-[10px_10px_0_#0B1957] overflow-hidden">
        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="font-bold uppercase text-xs sm:text-sm text-[#0B1957] tracking-widest mb-1">
                {totalContributions} contributions
              </p>
              <p className="font-black uppercase text-xl sm:text-2xl text-[#0B1957]">
                Last Year Activity
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#0B1957]">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 border border-[#0B1957]"
                    style={{
                      background: getContributionColor(
                        (i / 4) * 15 + (i > 0 ? 1 : 0)
                      ),
                    }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Contribution Grid */}
          <div className="overflow-x-auto pb-4">
            <div className="inline-block min-w-full">
              {/* Day labels */}
              <div className="flex gap-1 mb-2">
                <div className="w-12" />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="text-xs font-bold text-[#0B1957] h-4" />
                  <div className="flex gap-1">
                    {weeks.map((week, wIdx) => {
                      const month = new Date(
                        week[0].date
                      ).toLocaleDateString("en-US", { month: "short" });
                      return wIdx % 4 === 0 ? (
                        <div
                          key={wIdx}
                          className="text-xs font-bold text-[#0B1957] w-[28px] text-center"
                        >
                          {month}
                        </div>
                      ) : (
                        <div key={wIdx} className="w-[28px]" />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="flex gap-1">
                {/* Day of week labels */}
                <div className="flex flex-col gap-1">
                  {["Mon", "Wed", "Fri"].map((day) => (
                    <div
                      key={day}
                      className="text-xs font-bold text-[#0B1957] text-center h-[28px] flex items-center justify-center"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Contribution squares */}
                <div className="flex gap-1">
                  {weeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1">
                      {week.map((day, dayIdx) => (
                        <div
                          key={day.date}
                          className="w-[28px] h-[28px] border-2 border-[#0B1957] cursor-pointer transition-all duration-150 hover:scale-110 hover:shadow-md relative group"
                          style={{
                            backgroundColor: getContributionColor(day.count),
                          }}
                          title={`${day.count} contributions on ${day.date}`}
                        >
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#0B1957] text-[#9ECCFA] text-xs font-bold rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {day.count} contribution{day.count !== 1 ? "s" : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer stats */}
        <div className="bg-[#0B1957] border-t-4 border-[#0B1957] px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#9ECCFA]" />
            <span className="font-black uppercase text-xs tracking-[0.2em] text-[#9ECCFA]">
              GitHub Contribution Streak
            </span>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#9ECCFA] uppercase text-xs border-2 border-[#9ECCFA] px-4 py-2 hover:bg-[#9ECCFA] hover:text-[#0B1957] transition-all duration-150"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}