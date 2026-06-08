export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en', { notation: value >= 10000 ? 'compact' : 'standard' }).format(value);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(date),
  );

export const categoryLabel = (slug: string) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getDomain = (url: string) => new URL(url).hostname.replace(/^www\./, '');
