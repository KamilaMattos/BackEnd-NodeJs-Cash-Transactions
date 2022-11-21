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

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Account, (account) => account.debitedTransactions, {
    eager: true,
  })
  debitedAccount: Account

  @ManyToOne(() => Account, (account) => account.creditedTransactions, {
    eager: true,
  })
  creditedAccount: Account
}

export { Transaction }
