// This is the module for the glsp-client. We can bind glsp-client modules here.

import { ContainerModule } from "@theia/core/shared/inversify";
import { TYPES, ConsoleLogger, LogLevel } from "@eclipse-glsp/client";

const ozcanDiagramModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    const context = { bind, unbind, isBound, rebind };

    
  }
);
