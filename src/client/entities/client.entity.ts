import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Client {
    @ObjectIdColumn()
    id: ObjectId;
  
    @Column()
    nombre: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    numeroTelefonico: string;
  
    @Column()
    password: string;
}
