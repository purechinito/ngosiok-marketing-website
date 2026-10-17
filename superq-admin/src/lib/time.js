export function hoursSince(iso) {
  return (Date.now() - new Date(iso).getTime()) / 3_600_000;
}

export function ageLabel(iso) {
  if (!iso) return '';
  const hours = hoursSince(iso);
  if (hours < 1) return 'just now';
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'yesterday' : `${days}d ago`;
}
