import { BaseEntity } from './../../shared';

export class Speaker implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public twitter?: string,
        public bio?: string,
        public sessions?: BaseEntity[],
    ) {
    }
}
