/**
 * Runtime validation utilities for shared types
 */

import { PaginationQuery, SortDirection } from "./PaginationTypes";

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
}

export const DEFAULT_PAGINATION_LIMITS = {
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_LIMIT: 10,
  MIN_PAGE: 1,
  MAX_PAGE: 10000,
  DEFAULT_PAGE: 1,
  MAX_KEYWORD_LENGTH: 100,
  MAX_SORT_FIELD_LENGTH: 50,
} as const;

/**
 * Validates and sanitizes pagination query parameters
 */
export const validatePaginationQuery = (
  query: Partial<PaginationQuery>
): ValidationResult<PaginationQuery> => {
  const errors: string[] = [];
  const result: PaginationQuery = {};

  // Validate limit
  if (query.limit !== undefined) {
    const limit = Number(query.limit);
    if (isNaN(limit) || limit < DEFAULT_PAGINATION_LIMITS.MIN_LIMIT) {
      errors.push(
        `Limit must be a number >= ${DEFAULT_PAGINATION_LIMITS.MIN_LIMIT}`
      );
    } else if (limit > DEFAULT_PAGINATION_LIMITS.MAX_LIMIT) {
      errors.push(`Limit cannot exceed ${DEFAULT_PAGINATION_LIMITS.MAX_LIMIT}`);
    } else {
      result.limit = limit;
    }
  } else {
    result.limit = DEFAULT_PAGINATION_LIMITS.DEFAULT_LIMIT;
  }

  // Validate page
  if (query.page !== undefined) {
    const page = Number(query.page);
    if (isNaN(page) || page < DEFAULT_PAGINATION_LIMITS.MIN_PAGE) {
      errors.push(
        `Page must be a number >= ${DEFAULT_PAGINATION_LIMITS.MIN_PAGE}`
      );
    } else if (page > DEFAULT_PAGINATION_LIMITS.MAX_PAGE) {
      errors.push(`Page cannot exceed ${DEFAULT_PAGINATION_LIMITS.MAX_PAGE}`);
    } else {
      result.page = page;
    }
  } else {
    result.page = DEFAULT_PAGINATION_LIMITS.DEFAULT_PAGE;
  }

  // Validate sort direction
  if (query["sort-direction"] !== undefined) {
    const sortDirection = query["sort-direction"];
    if (!Object.values(SortDirection).includes(sortDirection)) {
      errors.push(
        `Sort direction must be one of: ${Object.values(SortDirection).join(", ")}`
      );
    } else {
      result["sort-direction"] = sortDirection;
    }
  }

  // Validate sort field
  if (query["sort-field"] !== undefined) {
    const sortField = String(query["sort-field"]);
    if (sortField.length === 0) {
      errors.push("Sort field cannot be empty");
    } else if (
      sortField.length > DEFAULT_PAGINATION_LIMITS.MAX_SORT_FIELD_LENGTH
    ) {
      errors.push(
        `Sort field cannot exceed ${DEFAULT_PAGINATION_LIMITS.MAX_SORT_FIELD_LENGTH} characters`
      );
    } else if (!/^[a-zA-Z][a-zA-Z0-9._-]*$/.test(sortField)) {
      errors.push("Sort field contains invalid characters");
    } else {
      result["sort-field"] = sanitizeString(sortField);
    }
  }

  // Validate keyword
  if (query.keyword !== undefined) {
    const keyword = String(query.keyword);
    if (keyword.length > DEFAULT_PAGINATION_LIMITS.MAX_KEYWORD_LENGTH) {
      errors.push(
        `Keyword cannot exceed ${DEFAULT_PAGINATION_LIMITS.MAX_KEYWORD_LENGTH} characters`
      );
    } else {
      result.keyword = sanitizeString(keyword);
    }
  }

  return {
    isValid: errors.length === 0,
    data: errors.length === 0 ? result : undefined,
    errors,
  };
};

/**
 * Sanitizes string input to prevent injection attacks
 */
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"'&]/g, "") // Remove potentially dangerous characters
    .replace(/\s+/g, " "); // Normalize whitespace
};

/**
 * Type guard for checking if an object is a valid PaginationQuery
 */
export const isPaginationQuery = (obj: any): obj is PaginationQuery => {
  if (!obj || typeof obj !== "object") return false;

  const validation = validatePaginationQuery(obj);
  return validation.isValid;
};
