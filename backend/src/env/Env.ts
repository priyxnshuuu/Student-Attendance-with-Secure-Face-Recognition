import envDev from "./env.dev";

export class Env {
  env: Environment;
  constructor(env: Environment) {
    this.env = env;
    this.loadEnvironment();
  }

  loadEnvironment(): EnvironmentVariable {
    switch (this.env) {
      case "dev":
        return envDev;
      case "local":
        return envDev;
      default:
        return envDev;
    }
  }
}
