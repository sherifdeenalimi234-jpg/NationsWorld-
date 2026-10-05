import React, { useState } from 'react';
import type { ProjectToolkitData, DataLabRow } from '../../../../types/toolkit';
import { BarChart3, Upload, Plus, Trash2, Info } from 'lucide-react';

interface DataLabToolProps {
  toolkitData: ProjectToolkitData;
  onUpdateToolkitData: (updated: ProjectToolkitData) => void;
}

export const DataLabTool: React.FC<DataLabToolProps> = ({
  toolkitData,
  onUpdateToolkitData,
}) => {
  const dataLabState = toolkitData.dataLab || {
    datasetName: 'Sample Metrics Dataset',
    headers: ['Category', 'Value', 'Growth (%)'],
    rows: [
      { Category: 'District A', Value: 120, 'Growth (%)': 12.5 },
      { Category: 'District B', Value: 240, 'Growth (%)': 18.2 },
      { Category: 'District C', Value: 180, 'Growth (%)': 8.7 },
      { Category: 'District D', Value: 310, 'Growth (%)': 22.4 },
    ],
    selectedValueColumn: 'Value',
    selectedCategoryColumn: 'Category',
    chartType: 'bar',
  };

  const { headers, rows, selectedValueColumn, selectedCategoryColumn, chartType, datasetName } = dataLabState;

  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newRowData, setNewRowData] = useState<Record<string, string>>({});

  // Helper calculation functions for numbers
  const numericValues = rows
    .map((r) => Number(r[selectedValueColumn]))
    .filter((v) => !isNaN(v) && v !== null && v !== undefined);

  const count = numericValues.length;
  const sum = numericValues.reduce((acc, v) => acc + v, 0);
  const mean = count > 0 ? sum / count : 0;

  const sortedValues = [...numericValues].sort((a, b) => a - b);
  const min = sortedValues.length > 0 ? sortedValues[0] : 0;
  const max = sortedValues.length > 0 ? sortedValues[sortedValues.length - 1] : 0;
  const range = max - min;

  const median =
    count === 0
      ? 0
      : count % 2 === 1
      ? sortedValues[Math.floor(count / 2)]
      : (sortedValues[count / 2 - 1] + sortedValues[count / 2]) / 2;

  // Mode
  const frequencyMap: Record<number, number> = {};
  numericValues.forEach((v) => {
    frequencyMap[v] = (frequencyMap[v] || 0) + 1;
  });

  let modeVal = 'N/A';
  let maxFreq = 0;
  Object.entries(frequencyMap).forEach(([k, freq]) => {
    if (freq > maxFreq && freq > 1) {
      maxFreq = freq;
      modeVal = k;
    }
  });

  // Standard Deviation
  const variance = count > 0 ? numericValues.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count : 0;
  const stdDev = Math.sqrt(variance);

  // CSV Import Parser
  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) return;

      const csvHeaders = lines[0].split(',').map((h) => h.trim().replace(/^["']|["']$/g, ''));
      const parsedRows: DataLabRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.trim().replace(/^["']|["']$/g, ''));
        const rowObj: DataLabRow = {};
        csvHeaders.forEach((h, idx) => {
          const val = cols[idx];
          const numVal = Number(val);
          rowObj[h] = !isNaN(numVal) && val !== '' ? numVal : val || '';
        });
        parsedRows.push(rowObj);
      }

      // Find first numeric column for value selection
      const firstNumHeader =
        csvHeaders.find((h) => parsedRows.some((r) => typeof r[h] === 'number')) || csvHeaders[1] || csvHeaders[0];

      onUpdateToolkitData({
        ...toolkitData,
        dataLab: {
          datasetName: file.name.replace(/\.[^/.]+$/, ''),
          headers: csvHeaders,
          rows: parsedRows,
          selectedValueColumn: firstNumHeader,
          selectedCategoryColumn: csvHeaders[0],
          chartType: 'bar',
        },
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddRow = () => {
    const rowObj: DataLabRow = {};
    headers.forEach((h) => {
      const raw = newRowData[h] || '';
      const numVal = Number(raw);
      rowObj[h] = !isNaN(numVal) && raw !== '' ? numVal : raw;
    });

    onUpdateToolkitData({
      ...toolkitData,
      dataLab: {
        ...dataLabState,
        rows: [...rows, rowObj],
      },
    });

    setNewRowData({});
    setIsAddingRow(false);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, idx) => idx !== index);
    onUpdateToolkitData({
      ...toolkitData,
      dataLab: {
        ...dataLabState,
        rows: newRows,
      },
    });
  };

  const handleSelectValueCol = (col: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      dataLab: {
        ...dataLabState,
        selectedValueColumn: col,
      },
    });
  };

  const handleSelectCatCol = (col: string) => {
    onUpdateToolkitData({
      ...toolkitData,
      dataLab: {
        ...dataLabState,
        selectedCategoryColumn: col,
      },
    });
  };

  const handleSelectChartType = (type: 'bar' | 'line' | 'pie') => {
    onUpdateToolkitData({
      ...toolkitData,
      dataLab: {
        ...dataLabState,
        chartType: type,
      },
    });
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in">
      {/* Header */}
      <div className="border-b border-[#0b8f6a]/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif text-[#f7faf8]">Data Lab</h2>
          <p className="text-xs text-[#64748b] mt-1">
            Perform client-side quantitative analysis, statistical summary calculations, and interactive data visualizations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <label className="px-4 py-2 rounded-xl bg-[#063b2e] hover:bg-[#084234] text-[#f7faf8] hover:text-[#d6b45a] border border-[#0b8f6a]/40 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md">
            <Upload className="w-3.5 h-3.5 text-[#d6b45a]" />
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* Transparent Calculation Notice */}
      <div className="p-4 rounded-2xl bg-[#04271e] border border-[#0b8f6a]/30 text-xs text-[#64748b] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#d6b45a] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#f7faf8] block mb-0.5">Statistical Analysis Standard</span>
          Calculations are displayed transparently for research support and do not constitute formal statistical consulting. Inspect your data and verify formulas for paper submission.
        </div>
      </div>

      {/* Dataset Summary & Column Selectors */}
      <div className="bg-[#063b2e]/60 border border-[#0b8f6a]/30 rounded-2xl p-5 space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#0b8f6a]/20 pb-3">
          <div>
            <span className="text-[10px] font-mono text-[#d6b45a] uppercase font-bold">Active Dataset</span>
            <h3 className="text-base font-serif font-bold text-[#f7faf8]">{datasetName}</h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-mono text-[#64748b]">Category Column:</span>
            <select
              value={selectedCategoryColumn}
              onChange={(e) => handleSelectCatCol(e.target.value)}
              className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl px-2.5 py-1 text-xs text-[#f7faf8]"
            >
              {headers.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <span className="font-mono text-[#64748b] ml-2">Value Column:</span>
            <select
              value={selectedValueColumn}
              onChange={(e) => handleSelectValueCol(e.target.value)}
              className="bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl px-2.5 py-1 text-xs text-[#f7faf8]"
            >
              {headers.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Statistical Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-center">
            <span className="text-[10px] font-mono text-[#64748b] uppercase block">Count (N)</span>
            <span className="text-sm font-bold text-[#f7faf8] mt-0.5 block">{count}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-center">
            <span className="text-[10px] font-mono text-[#64748b] uppercase block">Sum</span>
            <span className="text-sm font-bold text-[#f7faf8] mt-0.5 block">{sum.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-center">
            <span className="text-[10px] font-mono text-[#64748b] uppercase block">Mean (Avg)</span>
            <span className="text-sm font-bold text-[#d6b45a] mt-0.5 block">{mean.toFixed(2)}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-center">
            <span className="text-[10px] font-mono text-[#64748b] uppercase block">Median</span>
            <span className="text-sm font-bold text-[#f7faf8] mt-0.5 block">{median.toFixed(2)}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#021f18] border border-[#0b8f6a]/20 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-[#64748b] uppercase block">Std Dev (σ)</span>
            <span className="text-sm font-bold text-[#0b8f6a] mt-0.5 block">{stdDev.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#64748b] font-mono pt-1">
          <div>Min: <span className="text-[#f7faf8]">{min}</span></div>
          <div>Max: <span className="text-[#f7faf8]">{max}</span></div>
          <div>Range: <span className="text-[#f7faf8]">{range}</span></div>
          <div>Mode: <span className="text-[#f7faf8]">{modeVal}</span></div>
        </div>
      </div>

      {/* Dynamic SVG Visualization */}
      <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#0b8f6a]/20 pb-3">
          <h3 className="text-base font-serif font-bold text-[#f7faf8] flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#d6b45a]" />
            Data Visualization ({selectedValueColumn})
          </h3>

          <div className="flex items-center gap-2 bg-[#021f18] p-1 rounded-xl border border-[#0b8f6a]/30">
            <button
              type="button"
              onClick={() => handleSelectChartType('bar')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                chartType === 'bar' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              Bar
            </button>
            <button
              type="button"
              onClick={() => handleSelectChartType('line')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                chartType === 'line' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              type="button"
              onClick={() => handleSelectChartType('pie')}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                chartType === 'pie' ? 'bg-[#0b8f6a] text-white' : 'text-[#64748b] hover:text-white'
              }`}
            >
              Pie
            </button>
          </div>
        </div>

        {/* SVG Chart Render */}
        <div className="w-full h-64 bg-[#021f18]/80 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
          {rows.length === 0 ? (
            <span className="text-xs text-[#64748b]">No data rows available to render chart.</span>
          ) : chartType === 'bar' ? (
            <svg className="w-full h-full" viewBox="0 0 500 200">
              {rows.map((r, idx) => {
                const catVal = String(r[selectedCategoryColumn] || `Row ${idx + 1}`);
                const numVal = Number(r[selectedValueColumn]) || 0;
                const heightPct = max > 0 ? (numVal / max) * 140 : 0;
                const barWidth = Math.min(60, 400 / rows.length - 10);
                const x = 50 + idx * (400 / rows.length) + 10;
                const y = 160 - heightPct;

                return (
                  <g key={idx}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={heightPct}
                      fill="url(#barGradient)"
                      rx="4"
                      className="transition-all hover:opacity-80"
                    />
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      fill="#d6b45a"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {numVal}
                    </text>
                    <text
                      x={x + barWidth / 2}
                      y={180}
                      fill="#64748b"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {catVal.slice(0, 10)}
                    </text>
                  </g>
                );
              })}
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0b8f6a" />
                  <stop offset="100%" stopColor="#063b2e" />
                </linearGradient>
              </defs>
            </svg>
          ) : chartType === 'line' ? (
            <svg className="w-full h-full" viewBox="0 0 500 200">
              {(() => {
                const points = rows
                  .map((r, idx) => {
                    const numVal = Number(r[selectedValueColumn]) || 0;
                    const heightPct = max > 0 ? (numVal / max) * 140 : 0;
                    const x = 50 + idx * (400 / (rows.length - 1 || 1));
                    const y = 160 - heightPct;
                    return `${x},${y}`;
                  })
                  .join(' ');

                return (
                  <>
                    <polyline fill="none" stroke="#0b8f6a" strokeWidth="3" points={points} />
                    {rows.map((r, idx) => {
                      const catVal = String(r[selectedCategoryColumn] || `Row ${idx + 1}`);
                      const numVal = Number(r[selectedValueColumn]) || 0;
                      const heightPct = max > 0 ? (numVal / max) * 140 : 0;
                      const x = 50 + idx * (400 / (rows.length - 1 || 1));
                      const y = 160 - heightPct;
                      return (
                        <g key={idx}>
                          <circle cx={x} cy={y} r="5" fill="#d6b45a" />
                          <text x={x} y={y - 8} fill="#d6b45a" fontSize="10" textAnchor="middle">
                            {numVal}
                          </text>
                          <text x={x} y={180} fill="#64748b" fontSize="9" textAnchor="middle">
                            {catVal.slice(0, 10)}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          ) : (
            /* Pie Chart SVG */
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {(() => {
                const colors = ['#0b8f6a', '#d6b45a', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981'];
                let cumulativeAngle = 0;

                return rows.map((r, idx) => {
                  const numVal = Number(r[selectedValueColumn]) || 0;
                  const sliceAngle = sum > 0 ? (numVal / sum) * 360 : 0;
                  const startAngle = cumulativeAngle;
                  cumulativeAngle += sliceAngle;
                  const endAngle = cumulativeAngle;

                  const x1 = 100 + 70 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 100 + 70 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 100 + 70 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 100 + 70 * Math.sin((Math.PI * endAngle) / 180);
                  const largeArcFlag = sliceAngle > 180 ? 1 : 0;

                  const pathData = `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

                  return (
                    <path
                      key={idx}
                      d={pathData}
                      fill={colors[idx % colors.length]}
                      className="hover:opacity-80 transition"
                    />
                  );
                });
              })()}
            </svg>
          )}
        </div>
      </div>

      {/* Interactive Data Table */}
      <div className="bg-[#063b2e]/80 border border-[#0b8f6a]/30 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-[#021f18] border-b border-[#0b8f6a]/30 flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[#f7faf8]">Data Table ({rows.length} Records)</span>
          <button
            type="button"
            onClick={() => setIsAddingRow(true)}
            className="px-3 py-1.5 rounded-xl bg-[#0b8f6a] hover:bg-[#0d9d75] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        {isAddingRow && (
          <div className="p-4 bg-[#04271e] border-b border-[#0b8f6a]/30 space-y-3">
            <span className="text-[10px] font-mono text-[#d6b45a] uppercase font-bold">New Data Row</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {headers.map((h) => (
                <div key={h} className="space-y-1">
                  <label className="text-[10px] font-mono text-[#64748b]">{h}</label>
                  <input
                    type="text"
                    value={newRowData[h] || ''}
                    onChange={(e) => setNewRowData({ ...newRowData, [h]: e.target.value })}
                    className="w-full bg-[#021f18] border border-[#0b8f6a]/30 rounded-xl p-2 text-xs text-[#f7faf8]"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingRow(false)}
                className="px-3 py-1 text-xs text-[#64748b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddRow}
                className="px-3 py-1 bg-[#0b8f6a] text-white text-xs rounded-xl font-bold"
              >
                Save Row
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto max-w-full">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#021f18] border-b border-[#0b8f6a]/30 text-[#d6b45a] font-mono text-[11px] uppercase">
                {headers.map((h) => (
                  <th key={h} className="p-3.5 font-bold">
                    {h}
                  </th>
                ))}
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0b8f6a]/15 text-[#f7faf8]">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#04271e]/80 transition">
                  {headers.map((h) => (
                    <td key={h} className="p-3.5 font-mono">
                      {row[h] !== undefined ? String(row[h]) : '-'}
                    </td>
                  ))}
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(idx)}
                      className="p-1 text-[#64748b] hover:text-red-400 transition"
                      title="Delete Row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
