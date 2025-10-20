
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-effect p-4 rounded-lg border border-white/20">
        <p className="font-bold text-[var(--text-primary)] mb-2">{label}</p>
        <p className="text-[var(--accent-primary)]">{`${payload[0].name}: ${payload[0].value} min`}</p>
        <p className="text-[var(--accent-secondary)]">{`${payload[1].name}: ${payload[1].value} min`}</p>
      </div>
    );
  }
  return null;
};

const PerformanceChart: React.FC = () => {
    useScrollReveal('.performance-chart-reveal');
    const { theme } = useTheme();
    const { t } = useLanguage();

    const chartData = [
      {
        name: t('performanceChart.tasks.compliance'),
        [t('performanceChart.manualProcess')]: 480,
        [t('performanceChart.withFoundlab')]: 15,
      },
      {
        name: t('performanceChart.tasks.dueDiligence'),
        [t('performanceChart.manualProcess')]: 960,
        [t('performanceChart.withFoundlab')]: 60,
      },
      {
        name: t('performanceChart.tasks.regulatoryReport'),
        [t('performanceChart.manualProcess')]: 120,
        [t('performanceChart.withFoundlab')]: 5,
      },
    ];

    const axisColor = theme === 'dark' ? '#888888' : '#6B7280';
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
    const legendColor = theme === 'dark' ? '#EAEAEA' : '#1F2937';

  return (
    <section className="section-container py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16 scroll-reveal">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('performanceChart.supertitle')}</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('performanceChart.title')}</h3>
            <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">{t('performanceChart.subtitle')}</p>
        </div>
        <div className="glass-effect p-8 rounded-2xl performance-chart-reveal" style={{ transitionDelay: '0.2s' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{
                top: 20, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={axisColor} tick={{ fill: axisColor, fontSize: 12 }} />
              <YAxis stroke={axisColor} tick={{ fill: axisColor }} label={{ value: t('performanceChart.yAxisLabel'), angle: -90, position: 'insideLeft', fill: axisColor }} />
              <Tooltip
                cursor={{ fill: 'rgba(0, 255, 209, 0.05)' }}
                content={<CustomTooltip />}
              />
              <Legend wrapperStyle={{ color: legendColor, paddingTop: '20px' }} />
              <Bar dataKey={t('performanceChart.manualProcess')} fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
              <Bar dataKey={t('performanceChart.withFoundlab')} fill="var(--accent-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default PerformanceChart;
