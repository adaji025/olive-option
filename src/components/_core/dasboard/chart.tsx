"use client";
import { Button } from "@/components/ui/button";
import { POPULAR_STOCKS } from "@/lib/constant";
import { 
  Maximize2, 
  Minimize2, 
  Search, 
  Settings, 
  Download, 
  BarChart3,
  TrendingUp,
  Clock,
  Palette,
  PenTool,
  Ruler,
  Circle,
  Square,
  ArrowRight,
  Minus,
  Plus as PlusIcon,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Layers,
  Target,
  Zap
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface ChartSettings {
  interval: string;
  theme: 'light' | 'dark';
  showVolume: boolean;
  showRSI: boolean;
  showMACD: boolean;
  showBollinger: boolean;
  showSMA: boolean;
  showEMA: boolean;
  showStochastic: boolean;
}

interface DrawingTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'trend' | 'geometric' | 'fibonacci' | 'text';
}

const StockChart = () => {
  const [currentSymbol, setCurrentSymbol] = useState("AAPL");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [activeDrawingTool, setActiveDrawingTool] = useState<string | null>(null);
  const [chartSettings, setChartSettings] = useState<ChartSettings>({
    interval: "1D",
    theme: "dark",
    showVolume: true,
    showRSI: true,
    showMACD: true,
    showBollinger: false,
    showSMA: false,
    showEMA: false,
    showStochastic: false,
  });

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  // Available time intervals
  const timeIntervals = [
    { label: "1m", value: "1" },
    { label: "5m", value: "5" },
    { label: "15m", value: "15" },
    { label: "1h", value: "60" },
    { label: "4h", value: "240" },
    { label: "1D", value: "1D" },
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
  ];

  // Drawing tools
  const drawingTools: DrawingTool[] = [
    // Trend Tools
    { id: "trendline", name: "Trend Line", icon: <PenTool className="w-4 h-4" />, category: "trend" },
    { id: "horizontal", name: "Horizontal Line", icon: <Minus className="w-4 h-4" />, category: "trend" },
    { id: "vertical", name: "Vertical Line", icon: <Minus className="w-4 h-4 rotate-90" />, category: "trend" },
    { id: "ray", name: "Ray", icon: <ArrowRight className="w-4 h-4" />, category: "trend" },
    { id: "channel", name: "Channel", icon: <Square className="w-4 h-4" />, category: "trend" },
    
    // Geometric Tools
    { id: "rectangle", name: "Rectangle", icon: <Square className="w-4 h-4" />, category: "geometric" },
    { id: "circle", name: "Circle", icon: <Circle className="w-4 h-4" />, category: "geometric" },
    { id: "ellipse", name: "Ellipse", icon: <Circle className="w-4 h-4" />, category: "geometric" },
    
    // Fibonacci Tools
    { id: "fib_retracement", name: "Fib Retracement", icon: <Target className="w-4 h-4" />, category: "fibonacci" },
    { id: "fib_extension", name: "Fib Extension", icon: <Target className="w-4 h-4" />, category: "fibonacci" },
    { id: "fib_fan", name: "Fib Fan", icon: <Target className="w-4 h-4" />, category: "fibonacci" },
    
    // Text Tools
    { id: "text", name: "Text", icon: <PenTool className="w-4 h-4" />, category: "text" },
    { id: "note", name: "Note", icon: <Square className="w-4 h-4" />, category: "text" },
  ];

  // Technical indicators
  const technicalIndicators = [
    { id: "volume", name: "Volume", enabled: chartSettings.showVolume },
    { id: "rsi", name: "RSI", enabled: chartSettings.showRSI },
    { id: "macd", name: "MACD", enabled: chartSettings.showMACD },
    { id: "bollinger", name: "Bollinger Bands", enabled: chartSettings.showBollinger },
    { id: "sma", name: "SMA", enabled: chartSettings.showSMA },
    { id: "ema", name: "EMA", enabled: chartSettings.showEMA },
    { id: "stochastic", name: "Stochastic", enabled: chartSettings.showStochastic },
  ];

  // Load TradingView script only once
  useEffect(() => {
    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Initialize or update the TradingView widget
  useEffect(() => {
    if (!isScriptLoaded || !chartContainerRef.current) return;

    if (widgetRef.current) {
      widgetRef.current.remove();
    }
    chartContainerRef.current.innerHTML = "";

    // Build studies array based on settings
    const studies = [];
    if (chartSettings.showVolume) studies.push("Volume@tv-basicstudies");
    if (chartSettings.showRSI) studies.push("RSI@tv-basicstudies");
    if (chartSettings.showMACD) studies.push("MACD@tv-basicstudies");
    if (chartSettings.showBollinger) studies.push("Bollinger Bands@tv-basicstudies");
    if (chartSettings.showSMA) studies.push("Moving Average@tv-basicstudies");
    if (chartSettings.showEMA) studies.push("EMA@tv-basicstudies");
    if (chartSettings.showStochastic) studies.push("Stochastic@tv-basicstudies");

    widgetRef.current = new window.TradingView.widget({
      autosize: true,
      symbol: `NASDAQ:${currentSymbol}`,
      container_id: chartContainerRef.current.id,
      interval: chartSettings.interval,
      timezone: "America/New_York",
      theme: chartSettings.theme,
      style: "1",
      locale: "en",
      toolbar_bg: chartSettings.theme === "dark" ? "#1e1e1e" : "#ffffff",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      studies: studies,
      // Enable drawing tools
      drawing_toolbar: true,
      // Enable more interactive features
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      calendar: true,
      // Enable chart types
      chart_types: ["Candles", "Bars", "Line", "Area", "Hollow Candles"],
    });

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [isScriptLoaded, currentSymbol, chartSettings]);

  // Handle custom search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const symbol = searchTerm.toUpperCase().trim();
      handleSymbolChange(symbol);
    }
  };

  // Handle symbol change
  const handleSymbolChange = (symbol: string) => {
    setCurrentSymbol(symbol.toUpperCase());
    setSearchTerm("");
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const updateChartSettings = (newSettings: Partial<ChartSettings>) => {
    setChartSettings(prev => ({ ...prev, ...newSettings }));
  };

  const downloadChart = () => {
    if (widgetRef.current) {
      widgetRef.current.takeScreenshot();
    }
  };

  const toggleIndicator = (indicatorId: string) => {
    const indicatorMap: Record<string, keyof ChartSettings> = {
      volume: 'showVolume',
      rsi: 'showRSI',
      macd: 'showMACD',
      bollinger: 'showBollinger',
      sma: 'showSMA',
      ema: 'showEMA',
      stochastic: 'showStochastic',
    };
    
    const settingKey = indicatorMap[indicatorId];
    if (settingKey) {
      updateChartSettings({ [settingKey]: !chartSettings[settingKey] });
    }
  };

  const selectDrawingTool = (toolId: string) => {
    setActiveDrawingTool(activeDrawingTool === toolId ? null : toolId);
    // Here you would typically activate the drawing tool in TradingView
    // This would require TradingView's drawing API integration
  };

  return (
    <div className="flex bg-black w-full rounded-lg shadow-lg">
      {/* Left Sidebar Panel */}
      {showLeftPanel && (
        <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Chart Tools
              </h3>
              <button
                onClick={() => setShowLeftPanel(false)}
                className="text-gray-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawing Tools Section */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Drawing Tools
            </h4>
            
            {/* Trend Tools */}
            <div className="mb-4">
              <h5 className="text-sm text-gray-400 mb-2">Trend Lines</h5>
              <div className="grid grid-cols-2 gap-2">
                {drawingTools.filter(tool => tool.category === 'trend').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectDrawingTool(tool.id)}
                    className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
                      activeDrawingTool === tool.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Geometric Tools */}
            <div className="mb-4">
              <h5 className="text-sm text-gray-400 mb-2">Geometric</h5>
              <div className="grid grid-cols-2 gap-2">
                {drawingTools.filter(tool => tool.category === 'geometric').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectDrawingTool(tool.id)}
                    className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
                      activeDrawingTool === tool.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fibonacci Tools */}
            <div className="mb-4">
              <h5 className="text-sm text-gray-400 mb-2">Fibonacci</h5>
              <div className="grid grid-cols-1 gap-2">
                {drawingTools.filter(tool => tool.category === 'fibonacci').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectDrawingTool(tool.id)}
                    className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
                      activeDrawingTool === tool.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Tools */}
            <div>
              <h5 className="text-sm text-gray-400 mb-2">Text & Notes</h5>
              <div className="grid grid-cols-2 gap-2">
                {drawingTools.filter(tool => tool.category === 'text').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => selectDrawingTool(tool.id)}
                    className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
                      activeDrawingTool === tool.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {tool.icon}
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Indicators Section */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Technical Indicators
            </h4>
            <div className="space-y-2">
              {technicalIndicators.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => toggleIndicator(indicator.id)}
                  className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors ${
                    indicator.enabled
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span>{indicator.name}</span>
                  {indicator.enabled ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Settings Section */}
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Chart Settings
            </h4>
            
            {/* Theme Selection */}
            <div className="mb-3">
              <label className="text-sm text-gray-300 mb-1 block">Theme</label>
              <select
                value={chartSettings.theme}
                onChange={(e) => updateChartSettings({ theme: e.target.value as 'light' | 'dark' })}
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none text-sm"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            {/* Time Interval */}
            <div className="mb-3">
              <label className="text-sm text-gray-300 mb-1 block">Time Interval</label>
              <select
                value={chartSettings.interval}
                onChange={(e) => updateChartSettings({ interval: e.target.value })}
                className="w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none text-sm"
              >
                {timeIntervals.map((interval) => (
                  <option key={interval.value} value={interval.value}>
                    {interval.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button
                onClick={() => updateChartSettings({ 
                  showVolume: true, 
                  showRSI: true, 
                  showMACD: true,
                  showBollinger: true,
                  showSMA: true,
                  showEMA: true,
                  showStochastic: true
                })}
                className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Show All Indicators
              </button>
              <button
                onClick={() => updateChartSettings({ 
                  showVolume: false, 
                  showRSI: false, 
                  showMACD: false,
                  showBollinger: false,
                  showSMA: false,
                  showEMA: false,
                  showStochastic: false
                })}
                className="w-full px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Hide All Indicators
              </button>
            </div>
          </div>

          {/* Chart Info Section */}
          <div className="p-4 flex-1">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Chart Info
            </h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex justify-between">
                <span>Symbol:</span>
                <span className="text-white">{currentSymbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Interval:</span>
                <span className="text-white">{chartSettings.interval}</span>
              </div>
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="text-white capitalize">{chartSettings.theme}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Tool:</span>
                <span className="text-white">
                  {activeDrawingTool || "None"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Indicators:</span>
                <span className="text-white">
                  {technicalIndicators.filter(i => i.enabled).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chart Area */}
      <div className={`flex-1 ${isFullScreen ? "fixed inset-0 z-50 rounded-none" : "relative"}`}>
        {/* Chart Header */}
        <div className="w-full bg-black p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLeftPanel(!showLeftPanel)}
                className="text-gray-400 hover:text-white mr-2"
              >
                {showLeftPanel ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              <h2 className="text-lg font-semibold text-white">
                {currentSymbol}
              </h2>
              <span className="text-sm text-gray-300">
                {POPULAR_STOCKS.find((stock) => stock.symbol === currentSymbol)
                  ?.name || "Stock"}
              </span>
            </div>
            
            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
              {/* Search form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter stock symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none text-sm w-full sm:w-48"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>

              {/* Download button */}
              <button
                onClick={downloadChart}
                className="flex items-center gap-2 px-3 text-gray-200 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Save
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={toggleFullScreen}
                className="flex items-center gap-2 px-3 text-gray-200 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-sm"
              >
                {isFullScreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" /> Exit Fullscreen
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    Fullscreen
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Popular stock buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {POPULAR_STOCKS.map((stock) => (
              <button
                onClick={() => handleSymbolChange(stock.symbol)}
                key={stock.symbol}
                className={`px-3 py-1 text-sm transition-colors rounded-md ${
                  currentSymbol === stock.symbol
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                {stock.name}
              </button>
            ))}
          </div>

          {/* Chart container */}
          <div
            className={`bg-black mt-4 ${
              isFullScreen ? "h-[calc(100vh-140px)]" : "h-[500px]"
            }`}
          >
            <div
              ref={chartContainerRef}
              id="tradingView-chart"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
