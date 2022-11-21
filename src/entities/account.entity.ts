import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from "./transaction.entity"

@Entity("accounts")
class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column()
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
  debitedTransactions: Transaction[]

  @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
  creditedTransactions: Transaction[]
}

export { Account }
