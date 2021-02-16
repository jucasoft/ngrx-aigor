export function evalData<T>(fn: () => T, def: any = null): T {
  try {
    return fn();
  } catch (e) {
    return def;
  }
}
