import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public dueDate?: any,
        public completed?: boolean,
    ) {
        this.completed = false;
    }
}
