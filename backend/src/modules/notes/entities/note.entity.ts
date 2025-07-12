import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../../users/entities/user.entity";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @ManyToOne(() => User, (user: User) => user.notes, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
