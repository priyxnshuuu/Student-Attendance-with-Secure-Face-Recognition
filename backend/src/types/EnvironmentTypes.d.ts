type Environment = "dev" | "prod" | "local" | undefined | String;

type EnvironmentVariable = {
  mondoDbUrl: string;
  baseUrl: string;
  resetLinkBaseUrl: string;
  jwtSecret: string;
  headerKey: string;
  uploadApiKey?: string;
  msBucketName?: string;

  senderEmail: string;
  senderPassword: string;
};
