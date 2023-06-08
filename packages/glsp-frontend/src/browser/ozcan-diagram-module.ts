// This is the module for the glsp-client. We can customize the glsp-client and its diagram from here. 

import { Container, ContainerModule } from "@theia/core/shared/inversify";
import {
  TYPES,
  ConsoleLogger,
  LogLevel,
  configureDefaultModelElements,
  createDiagramContainer,
  overrideViewerOptions
} from "@eclipse-glsp/client";

const ozcanDiagramModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    const context = { bind, unbind, isBound, rebind };

    configureDefaultModelElements(context);
});

export default function createOzcanDiagramContainer(widgetId: string): Container {
    const container  = createDiagramContainer(ozcanDiagramModule);

    overrideViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden',
        needsClientLayout: true
    });

    return container;

};
