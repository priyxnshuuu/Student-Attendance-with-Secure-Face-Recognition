import mongoose from "mongoose";
import { Env } from "../env/Env";

export class Config {
  env: Env;
  environmentVariable: EnvironmentVariable;

  constructor() {
    const environment: Environment = process.env.ENV;
    this.env = new Env(environment);
    this.environmentVariable = this.env.loadEnvironment();

    console.log("Env ", process.env.ENV);
  }

  async start() {
    try {
      // Connect to mondoDb
      await this.dbConnect(this.env.loadEnvironment().mondoDbUrl);
    } catch (error: any) {
      console.error("OOPS! ", error);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Connected to DB");
    } catch (error: any) {
      console.error("DB Connection Error ", error);
    }
  }

  getBaseUrl(): string {
    return this.env.loadEnvironment().baseUrl;
  }
}
