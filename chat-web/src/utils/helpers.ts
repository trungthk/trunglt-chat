export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const truncateText = (text: string, length = 50): string => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const randomId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};
