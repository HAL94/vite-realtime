type Home = "/";
type Stat = "/scores";
type SubmitStat = "/add-score";
type MyScore = "/my-score";
type Reports = "/reports"

type SocketEndpoints = Home | Stat | SubmitStat | MyScore | Reports;
export default SocketEndpoints;
