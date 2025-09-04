// types/trading.ts
export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface VolumeData {
  time: string;
  value: number;
  color?: string;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartOptions {
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  symbol?: string;
  interval?: string;
}

export interface WebSocketMessage {
  symbol: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  price: number;
}

export interface TradingViewChartProps {
  data?: CandlestickData[];
  width?: number;
  height?: number;
  theme?: 'light' | 'dark';
  onCrosshairMove?: (param: any) => void;
  onVisibleTimeRangeChange?: (timeRange: any) => void;
}
