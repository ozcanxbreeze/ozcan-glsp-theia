// This is where the GLSP front-end client gets bound to the theia front-end
// In the package.json this module is references as a front-end extension under theia-extensions.

import { ContainerContext, DiagramConfiguration, GLSPTheiaFrontendModule } from "@eclipse-glsp/theia-integration";
import { OzcanLanguage } from "../common/ozcan-language";
import { OzcanDiagramConfiguration } from "./ozcan-diagram-configuration";

export class OzcanTheiaFrontendModule extends GLSPTheiaFrontendModule{
    readonly diagramLanguage = OzcanLanguage;

    bindDiagramConfiguration(context: ContainerContext): void {
        context.bind(DiagramConfiguration).to(OzcanDiagramConfiguration);
    }
}

export default new OzcanTheiaFrontendModule();


