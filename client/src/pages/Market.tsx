
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Search, ArrowUp, ArrowDown } from "lucide-react";

// Mock data - would be fetched from CoinGecko API in real implementation
const mockMarketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 40445.56, change24h: 2.3, marketCap: '790B', volume: '28.4B', rank: 1 },
  { name: 'Ethereum', symbol: 'ETH', price: 1333.50, change24h: -1.4, marketCap: '162B', volume: '14.2B', rank: 2 },
  { name: 'BNB', symbol: 'BNB', price: 234.12, change24h: 0.8, marketCap: '37.2B', volume: '1.2B', rank: 3 },
  { name: 'Solana', symbol: 'SOL', price: 34.78, change24h: 6.5, marketCap: '12.3B', volume: '2.5B', rank: 4 },
  { name: 'Cardano', symbol: 'ADA', price: 0.74, change24h: 5.8, marketCap: '25.4B', volume: '1.1B', rank: 5 },
  { name: 'XRP', symbol: 'XRP', price: 0.48, change24h: -0.3, marketCap: '24.5B', volume: '1.8B', rank: 6 },
  { name: 'Polkadot', symbol: 'DOT', price: 6.12, change24h: 3.1, marketCap: '7.8B', volume: '0.32B', rank: 7 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.078, change24h: -1.9, marketCap: '10.4B', volume: '0.45B', rank: 8 },
  { name: 'Avalanche', symbol: 'AVAX', price: 14.56, change24h: 4.7, marketCap: '4.6B', volume: '0.28B', rank: 9 },
  { name: 'Polygon', symbol: 'MATIC', price: 0.63, change24h: 2.1, marketCap: '5.8B', volume: '0.34B', rank: 10 },
];

const mockCoinHistoryData = [
  { date: '2023-01', price: 23100 },
  { date: '2023-02', price: 24800 },
  { date: '2023-03', price: 28400 },
  { date: '2023-04', price: 29800 },
  { date: '2023-05', price: 27100 },
  { date: '2023-06', price: 30400 },
  { date: '2023-07', price: 29500 },
  { date: '2023-08', price: 28000 },
  { date: '2023-09', price: 26700 },
  { date: '2023-10', price: 34250 },
  { date: '2023-11', price: 37800 },
  { date: '2023-12', price: 42100 },
  { date: '2024-01', price: 40445.56 },
];

const Market = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('1d');
  const location = useLocation();

  // Filter coins based on search query
  const filteredCoins = mockMarketData.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Parse URL search params if they exist
    const searchParams = new URLSearchParams(location.search);
    const searchFromURL = searchParams.get('search');
    if (searchFromURL) {
      setSearchQuery(searchFromURL);
    }

    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set default selected coin (Bitcoin in this mock)
      setSelectedCoin(mockMarketData[0]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  const handleCoinSelect = (coin: any) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Market</h2>
      </div>

      {selectedCoin && (
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-bold">{selectedCoin.symbol.substring(0, 1)}</span>
                </div>
                <div>
                  <CardTitle>{selectedCoin.name} ({selectedCoin.symbol})</CardTitle>
                  <p className="text-sm text-muted-foreground">Rank #{selectedCoin.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${selectedCoin.price.toLocaleString()}</div>
                <div className={`flex items-center justify-end ${selectedCoin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {selectedCoin.change24h >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  <span>{Math.abs(selectedCoin.change24h)}%</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Tabs defaultValue="1d" onValueChange={setTimeframe}>
                <TabsList>
                  <TabsTrigger value="1d">1D</TabsTrigger>
                  <TabsTrigger value="7d">7D</TabsTrigger>
                  <TabsTrigger value="30d">30D</TabsTrigger>
                  <TabsTrigger value="1y">1Y</TabsTrigger>
                </TabsList>
              </Tabs>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockCoinHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    domain={['dataMin - 5000', 'dataMax + 5000']}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={selectedCoin.change24h >= 0 ? "#10B981" : "#EF4444"} 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-lg font-medium">${selectedCoin.marketCap}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Volume (24h)</p>
                  <p className="text-lg font-medium">${selectedCoin.volume}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Change</p>
                  <p className={`text-lg font-medium ${selectedCoin.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {selectedCoin.change24h >= 0 ? '+' : ''}{selectedCoin.change24h}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rank</p>
                  <p className="text-lg font-medium">#{selectedCoin.rank}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 relative">
            <Input 
              type="text"
              placeholder="Search coins..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse-slow"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">#</th>
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 px-4 font-medium text-right">Price</th>
                    <th className="pb-3 px-4 font-medium text-right">24h %</th>
                    <th className="pb-3 px-4 font-medium text-right">Market Cap</th>
                    <th className="pb-3 pl-4 font-medium text-right">Volume (24h)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin) => (
                    <tr 
                      key={coin.symbol} 
                      className={`border-b hover:bg-muted/50 transition-colors cursor-pointer ${selectedCoin?.symbol === coin.symbol ? 'bg-muted/50' : ''}`}
                      onClick={() => handleCoinSelect(coin)}
                    >
                      <td className="py-3 pr-4 text-muted-foreground">{coin.rank}</td>
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
                  {filteredCoins.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        No cryptocurrencies found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Market;
