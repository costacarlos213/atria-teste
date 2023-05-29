import { v4 } from 'uuid';

class BaseEntity {
  id: string;

  created_at: Date;

  updated_at: Date;

  constructor(id?: string, created_at?: Date, updated_at?: Date) {
    Object.assign(this, {
      id: id || v4(),
      created_at: created_at || new Date().toISOString(),
      updated_at: updated_at || new Date().toISOString(),
    });
  }
}

export { BaseEntity };
