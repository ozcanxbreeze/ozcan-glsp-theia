// Make sure the glsp-client gets connected to the backend server

import {
  GLSPSocketServerContribution,
  GLSPSocketServerContributionOptions,
} from "@eclipse-glsp/theia-integration/lib/node";
import { OzcanLanguage } from "../common/ozcan-language";
import * as path from 'path';

export const DEFAULT_PORT = '5007';
const MODULE_PATH = path.join(__dirname, '..', '..', '..', 'glsp-backend', 'bundle', 'ozcan-glsp-server-packed.js');

export class OzcanServerContribution extends GLSPSocketServerContribution {
  readonly id = OzcanLanguage.contributionId;

  createContributionOptions(): Partial<GLSPSocketServerContributionOptions> {
    process.env.TASK
    return {
        executable: MODULE_PATH,
        socketConnectionOptions: { port: JSON.parse(process.env.TASKLIST_SERVER_PORT || DEFAULT_PORT) },
    };
  }
}
