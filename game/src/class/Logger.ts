export default abstract class Logger {
  private static _enable = false;

  static log(message: any, type: LogType = "OTHER") {
    if (!Logger._enable) return;

    console.log(`[${type}]\t${message}`);
  }

  static enable() {
    Logger._enable = true;
  }

  static disable() {
    Logger._enable = false;
  }
}

export type LogType = "STAGE" | "ROOM" | "OTHER";