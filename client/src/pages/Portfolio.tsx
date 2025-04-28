
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plus, Wallet, ArrowUp, ArrowDown } from "lucide-react";

// Mock data - would be fetched from API in real implementation
const mockPortfolioData = {
  totalValue: 24685.40,
  change24h: 3.24,
  totalCoins: 8,
  assets: [
    { name: 'Bitcoin', symbol: 'BTC', amount: 0.45, value: 18200.50, change24h: 2.3, price: 40445.56, allocation: 73.7 },
    { name: 'Ethereum', symbol: 'ETH', amount: 4.2, value: 5600.70, change24h: -1.4, price: 1333.50, allocation: 22.7 },
    { name: 'Cardano', symbol: 'ADA', amount: 1200, value: 884.20, change24h: 5.8, price: 0.74, allocation: 3.6 },
  ]
};

const COLORS = ['#8B5CF6', '#0EA5E9', '#33C3F0', '#10B981', '#F59E0B', '#EF4444'];

const Portfolio = () => {
  const [newAsset, setNewAsset] = useState({
    coin: '',
    amount: '',
    price: ''
  });

  const handleAddAsset = () => {
    console.log('Adding new asset:', newAsset);
    // In a real implementation, this would be connected to the backend
    setNewAsset({ coin: '', amount: '', price: '' });
    // Close dialog
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="coin">Cryptocurrency</Label>
                <Select 
                  onValueChange={(value) => setNewAsset({...newAsset, coin: value})}
                  value={newAsset.coin}
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
                  value={newAsset.amount}
                  onChange={(e) => setNewAsset({...newAsset, amount: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Purchase Price ($)</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="0.00" 
                  value={newAsset.price}
                  onChange={(e) => setNewAsset({...newAsset, price: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddAsset}>Add to Portfolio</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">${mockPortfolioData.totalValue.toLocaleString()}</h3>
              <div className={`flex items-center ${mockPortfolioData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {mockPortfolioData.change24h >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span className="text-sm">{Math.abs(mockPortfolioData.change24h)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold">{mockPortfolioData.totalCoins} coins</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Best Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ArrowUp className="h-5 w-5 text-green-500" />
              <div>
                <h3 className="text-xl font-bold">ADA</h3>
                <p className="text-sm text-green-500">+5.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPortfolioData.assets}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mockPortfolioData.assets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {mockPortfolioData.assets.map((asset, index) => (
                <div key={asset.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <p className="text-sm font-medium">{asset.name} ({asset.symbol})</p>
                  </div>
                  <p className="text-sm">{asset.allocation.toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Your Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Asset</th>
                    <th className="pb-3 px-4 font-medium text-right">Price</th>
                    <th className="pb-3 px-4 font-medium text-right">Holdings</th>
                    <th className="pb-3 px-4 font-medium text-right">Value</th>
                    <th className="pb-3 pl-4 font-medium text-right">24h</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolioData.assets.map((asset) => (
                    <tr key={asset.symbol} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-bold text-xs">{asset.symbol.substring(0, 1)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-medium">${asset.price.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p>{asset.amount} {asset.symbol}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-medium">${asset.value.toLocaleString()}</p>
                      </td>
                      <td className="py-3 pl-4 text-right">
                        <span className={`${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
