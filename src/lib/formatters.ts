// src/lib/formatters.ts

/**
 * Format a price number to USD currency string.
 */
export function formatCurrency(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
}

/**
 * Format an ISO date string to a readable date.
 */
export function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

/**
 * Format a rating number to one decimal place.
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Format a discount percentage to a string.
 */
export function formatDiscount(discount: number): string {
  return `${discount.toFixed(0)}% OFF`;
}

/**
 * Capitalize the first letter of each word.
 */
export function capitalize(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
