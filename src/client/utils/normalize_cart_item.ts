const MAX_LENGTH = 999;

export const normalizeCartItemCount = (item: number) => Math.min(MAX_LENGTH, Math.max(1, item));
