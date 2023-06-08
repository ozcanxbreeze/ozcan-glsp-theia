// Build the configuration for the GLSP-diagram

import { Container } from "@theia/core/shared/inversify";
import { GLSPDiagramConfiguration, GLSPTheiaDiagramServer, configureDiagramServer} from "@eclipse-glsp/theia-integration";
import { OzcanLanguage } from "../common/ozcan-language";
import createOzcanDiagramContainer from "./ozcan-diagram-module";

export class OzcanDiagramConfiguration extends GLSPDiagramConfiguration {
  diagramType: string = OzcanLanguage.diagramType;

  doCreateContainer(widgetId: string): Container {
    const container = createOzcanDiagramContainer(widgetId);
    configureDiagramServer(container, GLSPTheiaDiagramServer)
    return container
  }
}
