export function initHistoryList(): string[] {
  const historyList =
    JSON.parse(localStorage.getItem("SEARCH_HISTORY") as string) || [];
  return historyList;
}

export function addHistory(val: string) {
  const historyList = initHistoryList();
  historyList.unshift(val);
  localStorage.setItem("SEARCH_HISTORY", JSON.stringify(historyList));
}

export function clearAll() {
  localStorage.removeItem("SEARCH_HISTORY");
}
