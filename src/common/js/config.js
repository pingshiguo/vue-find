const ROUTER_MAP = new Map([
  ['image', 1],
  ['video', 4],
  ['book', 10]
]);

export function getRouterId (key) {
  return ROUTER_MAP.get(key);
}

export function getRouterName (value) {
  for (let key of ROUTER_MAP.keys()) {
    if (ROUTER_MAP.get(key) === value) {
      return `/${key}`;
    }
  }
}
