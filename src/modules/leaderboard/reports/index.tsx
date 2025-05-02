import { useState } from "react";
import SelectMonth from "./period-selection/select-month";
import StatsContainer from "./stats-container";
import {
  constructPeriodDescription,
  getStartAndEndDates,
  initializeCurrentPeriod,
  periodTemplate,
} from "./utils";
import useWsFetch from "@/socket-client/use-ws-fetch";
import { StatItem } from "../types";

type ReportRequest = { start: Date; end: Date, limit?: number };
type ReportResponse = { result: StatItem[] }

export default function TopReports() {
  const [periodDate, setPeriodDate] = useState<ReportRequest>(
    initializeCurrentPeriod
  );
  const [periodDesc, setPeriodDesc] = useState<string>(() =>
    constructPeriodDescription(periodDate.start, periodTemplate)
  );

  const { data } = useWsFetch<ReportRequest, ReportResponse>({
    url: "/reports",
    enabled: !!periodDate,
    payload: periodDate,
    deps: [periodDate.start, periodDate.end]
  })

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
      {data && <StatsContainer
        period={periodDesc}
        statList={data.result}
      />}
    </div>
  );
}
