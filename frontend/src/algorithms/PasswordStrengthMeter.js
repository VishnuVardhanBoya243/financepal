export const getPasswordStrength = (password = "") => {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let strength = {
    label: "Weak",
    value: 25,
    color: "red.400",
  };

  if (score === 2) {
    strength = { label: "Medium", value: 50, color: "yellow.400" };
  } else if (score === 3) {
    strength = { label: "Strong", value: 75, color: "green.400" };
  } else if (score === 4) {
    strength = { label: "Very Strong", value: 100, color: "teal.400" };
  }

  return strength;
};

