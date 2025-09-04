// components/AdvancedTradingChart.tsx
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  CandlestickData as LWCandlestickData,
  HistogramData,
  Time,
} from "lightweight-charts";
import {
  ChartData,
  ChartOptions,
  WebSocketMessage,
} from "@/types/trading-chart.types";

interface AdvancedTradingChartProps extends ChartOptions {
  symbol: string;
  onPriceUpdate?: (price: number) => void;
  onError?: (error: Error) => void;
}

const AdvancedTradingChart: React.FC<AdvancedTradingChartProps> = ({
  symbol,
  width,
  height = 500,
  theme = "dark",
  interval = "1m",
  onPriceUpdate,
  onError,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);

  const initializeChart = useCallback(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      layout: {
        background: {
          type: ColorType.Solid,
          color: theme === "dark" ? "#1a1a1a" : "#ffffff",
        },
        textColor: theme === "dark" ? "#d1d4dc" : "#191919",
      },
      grid: {
        vertLines: {
          color: theme === "dark" ? "#2B2B43" : "#e1e3e6",
          style: 1,
        },
        horzLines: {
          color: theme === "dark" ? "#2B2B43" : "#e1e3e6",
          style: 1,
        },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: theme === "dark" ? "#2B2B43" : "#cccccc",
        textColor: theme === "dark" ? "#d1d4dc" : "#191919",
      },
      timeScale: {
        borderColor: theme === "dark" ? "#2B2B43" : "#cccccc",
        textColor: theme === "dark" ? "#d1d4dc" : "#191919",
        timeVisible: true,
        secondsVisible: false,
      },
      width: width || chartContainerRef.current.clientWidth,
      height: height,
    };

    chartRef.current = createChart(chartContainerRef.current, chartOptions);

    // Main candlestick series
    // Add candlestick series
    if (chartRef.current) {
      try {
        candlestickSeriesRef.current = (
          chartRef.current as any
        ).addCandlestickSeries({
          upColor: "#00C851",
          downColor: "#ff4444",
          borderVisible: false,
          wickUpColor: "#00C851",
          wickDownColor: "#ff4444",
          priceFormat: {
            type: "price",
            precision: 2,
            minMove: 0.01,
          },
        });
      } catch (error) {
        console.error("Error adding candlestick series:", error);
        console.log("Chart instance:", chartRef.current);
        console.log(
          "Available methods:",
          Object.getOwnPropertyNames(chartRef.current)
        );
      }
    }
    // Volume series
    volumeSeriesRef.current = (chartRef.current as any).addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
  }, [theme, width, height]);

  const fetchChartData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/chart-data/${symbol}?interval=${interval}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChartData[] = await response.json();

      if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

      const candlestickData: LWCandlestickData[] = data.map((item) => ({
        time: item.time as Time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      const volumeData: HistogramData[] = data.map((item) => ({
        time: item.time as Time,
        value: item.volume,
        color: item.close >= item.open ? "#00C851" : "#ff4444",
      }));

      candlestickSeriesRef.current.setData(candlestickData);
      volumeSeriesRef.current.setData(volumeData);

      // Set initial price data
      if (data.length > 0) {
        const latestData = data[data.length - 1];
        const previousData = data[data.length - 2];

        setCurrentPrice(latestData.close);

        if (previousData) {
          const change = latestData.close - previousData.close;
          const changePercent = (change / previousData.close) * 100;
          setPriceChange(change);
          setPriceChangePercent(changePercent);
        }
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setIsLoading(false);
      if (onError) {
        onError(error as Error);
      }
    }
  }, [symbol, interval, onError]);

  const connectWebSocket = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/${symbol}`;
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      try {
        const newData: WebSocketMessage = JSON.parse(event.data);

        if (!candlestickSeriesRef.current || !volumeSeriesRef.current) return;

        // Update candlestick data
        candlestickSeriesRef.current.update({
          time: newData.time as Time,
          open: newData.open,
          high: newData.high,
          low: newData.low,
          close: newData.close,
        });

        // Update volume data
        volumeSeriesRef.current.update({
          time: newData.time as Time,
          value: newData.volume,
          color: newData.close >= newData.open ? "#00C851" : "#ff4444",
        });

        // Update price information
        setCurrentPrice(newData.close);
        if (onPriceUpdate) {
          onPriceUpdate(newData.close);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (onError) {
        onError(new Error("WebSocket connection error"));
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) {
          connectWebSocket();
        }
      }, 5000);
    };
  }, [symbol, onPriceUpdate, onError]);

  useEffect(() => {
    initializeChart();
    fetchChartData();

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [initializeChart, fetchChartData]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  return (
    <div className="advanced-trading-chart">
      {/* Price Header */}
      <div
        className="price-header"
        style={{
          padding: "12px 16px",
          backgroundColor: theme === "dark" ? "#2a2a2a" : "#f5f5f5",
          borderBottom: `1px solid ${theme === "dark" ? "#3a3a3a" : "#e0e0e0"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <h3
            style={{
              margin: 0,
              color: theme === "dark" ? "#ffffff" : "#000000",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {symbol}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: theme === "dark" ? "#ffffff" : "#000000",
              }}
            >
              ${currentPrice.toFixed(2)}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: priceChange >= 0 ? "#00C851" : "#ff4444",
              }}
            >
              {priceChange >= 0 ? "+" : ""}
              {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {isLoading && (
          <div
            style={{
              color: theme === "dark" ? "#888888" : "#666666",
              fontSize: "14px",
            }}
          >
            Loading...
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          height: `${height}px`,
          position: "relative",
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        }}
      />
    </div>
  );
};

export default AdvancedTradingChart;
