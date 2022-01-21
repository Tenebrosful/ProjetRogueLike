import { LogType } from "../enum/logType";

export abstract class Logger {
  private static _enable = false;

  static log(message: any, type: LogType = LogType.OTHER) {
    if (!Logger._enable && !process.env.dev) return;

    console.log(`[${type}]\t${message}`);
  }

  static enable() {
    Logger._enable = true;
  }

  static disable() {
    Logger._enable = false;
  }
}