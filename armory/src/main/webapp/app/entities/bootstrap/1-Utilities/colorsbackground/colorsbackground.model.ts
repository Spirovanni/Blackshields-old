import { BaseEntity } from '../../../shared/index';

export const enum Stage {
    'ALPHA',
    ' BETA',
    ' SANDBOX',
    ' DEVELOPMENT',
    ' PRODUCTION'
}

export class Colorsbackground implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public stage?: Stage,
        public description?: string,
        public pictureContentType?: string,
        public picture?: any,
    ) {
    }
}
