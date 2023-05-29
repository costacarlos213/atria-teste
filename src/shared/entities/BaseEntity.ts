import { v4 } from 'uuid';

class BaseEntity {
  id: string;

  created_at: Date;

  updated_at: Date;

  constructor(id?: string) {
    Object.assign(this, {
      id: id || v4(),
    });
  }
}

export { BaseEntity };
