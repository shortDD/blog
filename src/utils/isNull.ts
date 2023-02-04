export function isNull(value: any): boolean {
  if (Array.isArray(value) || getType(value) === "[object Array]") {
    return value.length > 0 ? true : false;
  }
  if (getType(value) === "[object Object]" && Object.keys(value).length === 0) {
    return false;
  }
  if (getType(value) === "[object String]") {
    value = value.trim();
  }
  return Boolean(value);
}
function getType(arg: any): string {
  return Object.prototype.toString.call(arg);
}
