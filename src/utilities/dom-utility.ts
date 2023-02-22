export function findSiblings(
  start: HTMLElement,
  end: HTMLElement
): HTMLElement[] {
  function getSiblings(
    start: HTMLElement,
    end: HTMLElement,
    results: HTMLElement[] = []
  ): HTMLElement[] {
    if (start !== end) {
      const sibling = start.nextElementSibling as HTMLElement;
      if (sibling && sibling !== end) {
        if (sibling.textContent?.trim() !== start.textContent?.trim()) {
          results.push(sibling);
        }
        getSiblings(sibling, end, results);
      }
    }
    return results;
  }
  return getSiblings(start, end, []);
}
