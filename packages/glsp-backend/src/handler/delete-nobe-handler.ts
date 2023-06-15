/********************************************************************************
 * Copyright (c) 2022 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { DeleteElementOperation, GNode, MaybePromise, OperationHandler, remove, toTypeGuard } from '@eclipse-glsp/server-node';
import { inject, injectable } from 'inversify';
import { OzcanModelState } from '../model/ozcan-model-state';

@injectable()
export class DeleteNobeHandler implements OperationHandler {
    readonly operationType = DeleteElementOperation.KIND;

    @inject(OzcanModelState)
    protected modelState: OzcanModelState;

    execute(operation: DeleteElementOperation): MaybePromise<void> {
        operation.elementIds.forEach(elementId => this.deleteNobe(elementId));
    }

    protected deleteNobe(elementId: string): void {
        const index = this.modelState.index;
        let nobe = index.findNobe(elementId);
        if (!nobe) {
            const taskNode = index.findParentElement(elementId, toTypeGuard(GNode));
            if (taskNode) {
                nobe = index.findNobe(taskNode.id);
            }
        }
        
        if (nobe) {
            remove(this.modelState.model.nobes, nobe);
        }
    }
}
