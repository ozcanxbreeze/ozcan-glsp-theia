// This is the container for the client but for the backend-configurations, only binds the server contribution

import { ContainerModule } from "@theia/core/shared/inversify";
import { OzcanServerContribution } from "./ozcan-server-contribution";
import { GLSPServerContribution } from "@eclipse-glsp/theia-integration/lib/node";

export default new ContainerModule((bind) => {
  bind(OzcanServerContribution).toSelf().inSingletonScope();
  bind(GLSPServerContribution).toService(OzcanServerContribution);
});
