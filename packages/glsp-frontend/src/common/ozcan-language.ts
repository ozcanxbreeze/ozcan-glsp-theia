// These are the configurations for the language, so theia can recognize when to use glsp.

import { GLSPDiagramLanguage } from '@eclipse-glsp/theia-integration';

export const OzcanLanguage: GLSPDiagramLanguage = {
    contributionId: 'ozcan',
    label: 'Ozcan Diagram',
    diagramType: 'ozcan-diagram',
    fileExtensions: ['.ozcan']
};
