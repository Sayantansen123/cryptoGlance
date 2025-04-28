
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ArrowUp, ArrowDown, Search } from "lucide-react";

// Mock data - would be fetched from API in real implementation
const mockTransactions = [
  { id: '1', type: 'buy', coin: 'Bitcoin', symbol: 'BTC', amount: 0.15, price: 38500.75, value: 5775.11, date: '2024-01-05', status: 'completed' },
  { id: '2', type: 'sell', coin: 'Ethereum', symbol: 'ETH', amount: 2.5, price: 1450.25, value: 3625.63, date: '2024-01-12', status: 'completed' },
  { id: '3', type: 'buy', coin: 'Cardano', symbol: 'ADA', amount: 500, price: 0.65, value: 325.00, date: '2024-01-18', status: 'completed' },
  { id: '4', type: 'buy', coin: 'Solana', symbol: 'SOL', amount: 10, price: 32.45, value: 324.50, date: '2024-01-23', status: 'completed' },
  { id: '5', type: 'buy', coin: 'Ethereum', symbol: 'ETH', amount: 1.2, price: 1333.50, value: 1600.20, date: '2024-01-30', status: 'completed' },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState('all');
  const [newTransaction, setNewTransaction] = useState({
    type: 'buy',
    coin: '',
    amount: '',
    price: ''
  });

  // Filter transactions based on search query and type
  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = 
      tx.coin.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tx.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = transactionType === 'all' || tx.type === transactionType;
    
    return matchesSearch && matchesType;
  });

  const handleAddTransaction = () => {
    console.log('Adding new transaction:', newTransaction);
    // In a real implementation, this would be connected to the backend
    setNewTransaction({ type: 'buy', coin: '', amount: '', price: '' });
    // Close dialog
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Transaction Type</Label>
                <Select 
                  onValueChange={(value) => setNewTransaction({...newTransaction, type: value})}
                  value={newTransaction.type}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coin">Cryptocurrency</Label>
                <Select 
                  onValueChange={(value) => setNewTransaction({...newTransaction, coin: value})}
                  value={newTransaction.coin}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                    <SelectItem value="SOL">Solana (SOL)</SelectItem>
                    <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number"
                  placeholder="0.00" 
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price per coin ($)</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="0.00" 
                  value={newTransaction.price}
                  onChange={(e) => setNewTransaction({...newTransaction, price: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddTransaction}>Add Transaction</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <Input 
                type="text"
                placeholder="Search transactions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            <Tabs 
              defaultValue="all" 
              value={transactionType} 
              onValueChange={setTransactionType}
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 px-4 font-medium">Asset</th>
                  <th className="pb-3 px-4 font-medium text-right">Amount</th>
                  <th className="pb-3 px-4 font-medium text-right">Price</th>
                  <th className="pb-3 px-4 font-medium text-right">Value</th>
                  <th className="pb-3 pl-4 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 pr-4">
                      <div className={`flex items-center justify-center h-7 w-7 rounded-full ${tx.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {tx.type === 'buy' 
                          ? <ArrowDown className="h-4 w-4 text-green-500" /> 
                          : <ArrowUp className="h-4 w-4 text-red-500" />
                        }
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-bold text-xs">{tx.symbol.substring(0, 1)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{tx.coin}</p>
                          <p className="text-xs text-muted-foreground">{tx.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p>{tx.amount} {tx.symbol}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium">${tx.price.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-medium">${tx.value.toLocaleString()}</p>
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <p className="text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No transactions found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
