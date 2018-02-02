import { BaseEntity } from './../../shared';

export class Forms implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public description?: string,
        public pictureContentType?: string,
        public picture?: any,
    ) {
    }
}
