
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Wallet, PieChart, TrendingUp, TrendingDown } from "lucide-react";

// Mock data - would be fetched from API in real implementation
const mockPortfolioData = {
  totalValue: 24685.40,
  change24h: 3.24,
  totalCoins: 8,
  topCoins: [
    { name: 'Bitcoin', symbol: 'BTC', amount: 0.45, value: 18200.50, change24h: 2.3, price: 40445.56 },
    { name: 'Ethereum', symbol: 'ETH', amount: 4.2, value: 5600.70, change24h: -1.4, price: 1333.50 },
    { name: 'Cardano', symbol: 'ADA', amount: 1200, value: 884.20, change24h: 5.8, price: 0.74 },
  ]
};

const mockChartData = [
  { name: '00:00', value: 22400 },
  { name: '04:00', value: 22800 },
  { name: '08:00', value: 23200 },
  { name: '12:00', value: 23500 },
  { name: '16:00', value: 24100 },
  { name: '20:00', value: 24400 },
  { name: '24:00', value: 24685.40 },
];

const mockMarketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 40445.56, change24h: 2.3, marketCap: '790B', volume: '28.4B' },
  { name: 'Ethereum', symbol: 'ETH', price: 1333.50, change24h: -1.4, marketCap: '162B', volume: '14.2B' },
  { name: 'BNB', symbol: 'BNB', price: 234.12, change24h: 0.8, marketCap: '37.2B', volume: '1.2B' },
  { name: 'Solana', symbol: 'SOL', price: 34.78, change24h: 6.5, marketCap: '12.3B', volume: '2.5B' },
  { name: 'Cardano', symbol: 'ADA', price: 0.74, change24h: 5.8, marketCap: '25.4B', volume: '1.1B' },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted rounded animate-pulse-slow"></div>
            ) : (
              <div className="flex items-end gap-2">
                <h3 className="text-2xl font-bold">${mockPortfolioData.totalValue.toLocaleString()}</h3>
                <div className={`flex items-center ${mockPortfolioData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {mockPortfolioData.change24h >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  <span className="text-sm">{Math.abs(mockPortfolioData.change24h)}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Assets</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted rounded animate-pulse-slow"></div>
            ) : (
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <h3 className="text-2xl font-bold">{mockPortfolioData.totalCoins} coins</h3>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Market Trend</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 bg-muted rounded animate-pulse-slow"></div>
            ) : (
              <div className="flex items-center gap-2">
                {mockPortfolioData.change24h >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <h3 className="text-2xl font-bold">Bullish</h3>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader>
            <CardTitle>Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] bg-muted rounded animate-pulse-slow"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Top Assets</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <>
                <div className="h-12 bg-muted rounded mb-3 animate-pulse-slow"></div>
                <div className="h-12 bg-muted rounded mb-3 animate-pulse-slow"></div>
                <div className="h-12 bg-muted rounded animate-pulse-slow"></div>
              </>
            ) : (
              <div className="space-y-4">
                {mockPortfolioData.topCoins.map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="font-bold text-xs">{coin.symbol.substring(0, 1)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{coin.name}</p>
                        <p className="text-xs text-muted-foreground">{coin.amount} {coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${coin.value.toLocaleString()}</p>
                      <p className={`text-xs ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[300px] bg-muted rounded animate-pulse-slow"></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 px-4 font-medium text-right">Price</th>
                    <th className="pb-3 px-4 font-medium text-right">24h Change</th>
                    <th className="pb-3 px-4 font-medium text-right">Market Cap</th>
                    <th className="pb-3 pl-4 font-medium text-right">Volume (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockMarketData.map((coin) => (
                    <tr key={coin.symbol} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="font-bold text-xs">{coin.symbol.substring(0, 1)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{coin.name}</p>
                            <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-medium">${coin.price.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center ${coin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {coin.change24h >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                          {Math.abs(coin.change24h)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">${coin.marketCap}</td>
                      <td className="py-3 pl-4 text-right">${coin.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
