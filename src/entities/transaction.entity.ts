import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm"
import { Account } from "./account.entity"

@Entity("transactions")
class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column("decimal", { precision: 12, scale: 2 })
  value: number

  @CreateDateColumn({ type: "date" })
  createdAt: Date

  @ManyToOne(() => Account, (account) => account.id)
  debitedAccountID: Account

  @ManyToOne(() => Account, (account) => account.id)
  creditedAccountID: Account
}

export { Transaction }