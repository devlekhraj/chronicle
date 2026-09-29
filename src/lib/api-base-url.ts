export function resolveEcApiBaseUrl(): string {
  const configuredBaseUrl = process.env.EC_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  return process.env.NODE_ENV === "production"
    ? "https://admin.everestchronicle.com"
    : "https://admin-chronicle.test";
}

