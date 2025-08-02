/**
 * Enhanced password validation utilities
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: "weak" | "fair" | "good" | "strong";
}

export const validatePasswordStrength = (
  password: string
): PasswordValidationResult => {
  const errors: string[] = [];
  let score = 0;

  // Length check
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Complexity checks
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  } else {
    score += 1;
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  } else {
    score += 1;
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  } else {
    score += 1;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  } else {
    score += 1;
  }

  // Common password check
  const commonPasswords = ["password", "123456789", "qwerty", "abc123"];
  if (
    commonPasswords.some((common) => password.toLowerCase().includes(common))
  ) {
    errors.push("Password cannot contain common patterns");
    score = Math.max(0, score - 2);
  }

  // Determine strength
  let strength: "weak" | "fair" | "good" | "strong";
  if (score <= 2) strength = "weak";
  else if (score <= 4) strength = "fair";
  else if (score <= 5) strength = "good";
  else strength = "strong";

  return {
    isValid: errors.length === 0,
    errors,
    strength,
  };
};

export const passwordValidationRules = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters long",
  },
  validate: (value: string) => {
    const result = validatePasswordStrength(value);
    if (!result.isValid) {
      return result.errors[0]; // Return first error
    }
    if (result.strength === "weak") {
      return "Password is too weak. Please choose a stronger password.";
    }
    return true;
  },
};
