import { Exclude } from "class-transformer"
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { Account } from "./account.entity"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude()
  password: string

  @OneToOne(() => Account, { cascade: true })
  @JoinColumn()
  accountID: Account
}

export { User }
