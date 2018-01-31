import { BaseEntity } from '../../../shared/index';

export const enum Status {
    'ALPHA',
    ' BETA',
    ' SANDBOX',
    ' DEVELOPMENT',
    ' PRODUCTION'
}

export class Sizing implements BaseEntity {
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
