import { BaseEntity } from './../../shared';

export const enum Stage {
    'ALPHA',
    ' BETA',
    ' SANDBOX',
    ' DEVELOPMENT',
    ' PRODUCTION'
}

export class Basictypography implements BaseEntity {
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
