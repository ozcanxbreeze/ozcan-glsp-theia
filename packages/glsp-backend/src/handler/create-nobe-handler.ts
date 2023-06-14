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
import { CreateNodeOperation, CreateNodeOperationHandler, DefaultTypes, GNode, Point } from '@eclipse-glsp/server-node';
import { inject, injectable } from 'inversify';
import * as uuid from 'uuid';
import { OzcanModelState } from '../model/ozcan-model-state';
import { Nobe } from '../model/ozcan-model';

@injectable()
export class CreateNobeHandler extends CreateNodeOperationHandler {
    readonly elementTypeIds = [DefaultTypes.NODE];

    @inject(OzcanModelState)
    protected override modelState: OzcanModelState;

    execute(operation: CreateNodeOperation): void {
        const relativeLocation = this.getRelativeLocation(operation) ?? Point.ORIGIN;
        const nobe = this.createTask(relativeLocation);
        const model = this.modelState.model;
        model.nobes.push(nobe);
    }

    protected createTask(position: Point): Nobe {
        const nodeCounter = this.modelState.index.getAllByClass(GNode).length;
        
        return {
            id: uuid.v4(),
            name: `NewNobe${nodeCounter}`,
            position,
            size: {width: 100, height:100}
        };
    }

    get label(): string {
        return 'Nobe';
    }
}
