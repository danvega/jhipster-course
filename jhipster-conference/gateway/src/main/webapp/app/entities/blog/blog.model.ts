import { BaseEntity } from './../../shared';

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public author?: string,
        public post?: any,
    ) {
    }
}
