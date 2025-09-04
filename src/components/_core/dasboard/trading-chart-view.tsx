// components/TradingViewChart.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  CandlestickData as LWCandlestickData,
  Time,
  CrosshairMode,
  LineStyle,
  LineWidth,
} from 'lightweight-charts';
import { TradingViewChartProps } from '@/types/trading-chart.types';
// import { CandlestickData, TradingViewChartProps } from '@/types/trading';

const TradingViewChart: React.FC<TradingViewChartProps> = ({ 
  data = [], 
  width = 800, 
  height = 400,
  theme = 'dark',
  onCrosshairMove,
  onVisibleTimeRangeChange
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current || typeof window === 'undefined') return;

    const chartOptions = {
      layout: {
        background: { 
          type: ColorType.Solid, 
          color: theme === 'dark' ? '#1a1a1a' : '#ffffff' 
        },
        textColor: theme === 'dark' ? '#d1d4dc' : '#191919',
      },
      grid: {
        vertLines: { 
          color: theme === 'dark' ? '#2B2B43' : '#e1e3e6',
          style: 1,
          visible: true,
        },
        horzLines: { 
          color: theme === 'dark' ? '#2B2B43' : '#e1e3e6',
          style: 1,
          visible: true,
        },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
          width: 1 as LineWidth,
          color: theme === 'dark' ? '#758696' : '#9598A1',
          style: LineStyle.LargeDashed,
        },
        horzLine: {
          width: 1 as LineWidth,
          color: theme === 'dark' ? '#758696' : '#9598A1',
          style: LineStyle.LargeDashed,
        },
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? '#2B2B43' : '#cccccc',
        textColor: theme === 'dark' ? '#d1d4dc' : '#191919',
      },
      timeScale: {
        borderColor: theme === 'dark' ? '#2B2B43' : '#cccccc',
        textColor: theme === 'dark' ? '#d1d4dc' : '#191919',
        timeVisible: true,
        secondsVisible: false,
      },
      width: width,
      height: height,
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);

    // Add candlestick series
    if (chartRef.current) {
      try {
        candlestickSeriesRef.current = (chartRef.current as any).addCandlestickSeries({
          upColor: '#00C851',
          downColor: '#ff4444',
          borderVisible: false,
          wickUpColor: '#00C851',
          wickDownColor: '#ff4444',
          priceFormat: {
            type: 'price',
            precision: 2,
            minMove: 0.01,
          },
        });
      } catch (error) {
        console.error('Error adding candlestick series:', error);
        console.log('Chart instance:', chartRef.current);
        console.log('Available methods:', Object.getOwnPropertyNames(chartRef.current));
      }
    }

    // Event listeners
    if (onCrosshairMove && chartRef.current) {
      chartRef.current.subscribeCrosshairMove(onCrosshairMove);
    }

    if (onVisibleTimeRangeChange && chartRef.current) {
      chartRef.current.timeScale().subscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
    }

  }, [theme, height, onCrosshairMove, onVisibleTimeRangeChange]);

  const updateChartData = useCallback(() => {
    if (!candlestickSeriesRef.current || data.length === 0) return;

    const formattedData: LWCandlestickData[] = data.map(item => ({
      time: item.time as Time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    candlestickSeriesRef.current.setData(formattedData);
  }, [data]);

  useEffect(() => {
    initializeChart();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current && typeof window !== 'undefined') {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [initializeChart]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: '100%',
        height: `${height}px`,
        position: 'relative',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff'
      }}
      suppressHydrationWarning
    />
  );
};

export default TradingViewChart;
