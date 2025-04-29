import { useState } from "react";
import SelectMonth from "./period-selection/select-month";
import StatsContainer from "./stats-container";
import {
  constructPeriodDescription,
  getStartAndEndDates,
  initializeCurrentPeriod,
  periodTemplate,
} from "./utils";

export default function TopReports() {
  const [periodDate, setPeriodDate] = useState<{ start: Date; end: Date }>(
    initializeCurrentPeriod
  );
  const [periodDesc, setPeriodDesc] = useState<string>(() =>
    constructPeriodDescription(periodDate.start, periodTemplate)
  );

  const handleUpdatePeriod = (value: string) => {
    try {
      const periodDate = getStartAndEndDates(value);
      setPeriodDate(periodDate);
      const periodDesc = constructPeriodDescription(
        periodDate.start,
        periodTemplate
      );
      setPeriodDesc(periodDesc);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <SelectMonth
        onSelect={handleUpdatePeriod}
        defaultValue={String(periodDate.start.getMonth())}
      />
      <StatsContainer
        period={periodDesc}
        statList={[
          { name: "Alex_Gaming", score: 12500, games: 5 },
          { name: "ProGamer123", score: 10800, games: 3 },
          { name: "NinjaWarrior", score: 9200, games: 4 },
          { name: "GameMaster", score: 8700, games: 6 },
          { name: "LegendPlayer", score: 7900, games: 2 },
        ]}
      />
    </div>
  );
}
