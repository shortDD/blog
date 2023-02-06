export function initHistoryList(): string[] {
  const historyList =
    JSON.parse(localStorage.getItem("SEARCH_HISTORY") as string) || [];
  console.log(historyList);
  return historyList;
}

export function addHistory(val: string) {
  const historyList = localStorage.getItem("SEARCH_HISTORY");
  console.log(historyList);
}
