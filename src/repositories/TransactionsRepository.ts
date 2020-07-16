import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(t => (t.type === 'income' ? t.value : 0))
      .reduce((valor, soma) => valor + soma);

    const outcome = this.transactions
      .map(t => (t.type === 'outcome' ? t.value : 0))
      .reduce((valor, soma) => valor + soma);

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
