import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from "./transaction.entity"

@Entity("accounts")
class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column("decimal", { precision: 12, scale: 2, default: 100.00 })
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.id)
  transactions: Transaction[]
}

export { Account }
