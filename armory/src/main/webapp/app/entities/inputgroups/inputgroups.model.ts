import { BaseEntity } from './../../shared';

export const enum Status {
    'ALPHA',
    ' BETA',
    ' SANDBOX',
    ' DEVELOPMENT',
    ' PRODUCTION'
}

export class Inputgroups implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public status?: Status,
        public description?: string,
        public pictureContentType?: string,
        public picture?: any,
    ) {
    }
}
