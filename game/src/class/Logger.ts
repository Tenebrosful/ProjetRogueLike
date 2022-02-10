export default abstract class Logger {
  private static _enable = false;

  private static _enableAll = false;
  private static _enabledLogs: LogType[] = [];

  static log(message: any, type: LogType = "OTHER") {
    if (!Logger._enable) return;
    if (!this._enableAll && !this._enabledLogs.includes(type)) return;

      console.log(`[${type}]\t${message}`);
  }

  static enable(logsToEnable?: LogType[] | "ALL") {
    Logger._enable = true;

    if (logsToEnable === "ALL") { this._enableAll = true; return; }
    if (logsToEnable) this._enabledLogs = logsToEnable;
  }

  static disable() {
    Logger._enable = false;
  }
}

export type LogType = "GAME" | "ENTITY" | "STAGE" | "ROOM" | "RENDER" | "OTHER";