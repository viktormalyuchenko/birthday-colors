export function paginationItems(current: number, total: number): (number | string)[] {
  if (total < 1) return [];
  const page = Math.min(Math.max(1, current), total);
  const pages = [...new Set([1, total, page - 1, page, page + 1])]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const items: (number | string)[] = [];
  pages.forEach((n, index) => {
    if (index && n - pages[index - 1] > 1) items.push(`gap-${n}`);
    items.push(n);
  });
  return items;
}
