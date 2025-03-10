import { useState } from 'react';

type IncomeCalculation = {
  clientsPerWeek: number;
  pricePerClient: number;
  weeklyIncome: number;
  monthlyIncome: number;
  yearlyIncome: number;
  totalClients: number;
};

export const IncomeCalculator = ({ language }: { language: 'en' | 'es' }) => {
  const [clientsPerWeek, setClientsPerWeek] = useState(4);
  const [pricePerClient, setPricePerClient] = useState(250);
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);

  const calculation: IncomeCalculation = {
    clientsPerWeek,
    pricePerClient,
    weeklyIncome: clientsPerWeek * pricePerClient,
    monthlyIncome: clientsPerWeek * pricePerClient * 4,
    yearlyIncome: clientsPerWeek * pricePerClient * 52,
    totalClients: clientsPerWeek * 52
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-24 bg-white/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 heading-primary">
            {language === 'es' ? 'Calculadora de Ingresos PMU' : 'PMU Income Calculator'}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            {language === 'es' 
              ? 'Calcula tu potencial de ingresos como artista PMU'
              : 'Calculate your potential income as a PMU artist'
            }
          </p>

          <div className="card-base p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-100 dark:border-purple-900/50">
            {/* Sliders Section */}
            <div className="space-y-8 mb-8">
              {/* Clients per Week Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {language === 'es' ? 'Clientes por Semana' : 'Clients per Week'}
                  </label>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {clientsPerWeek}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={clientsPerWeek}
                  onChange={(e) => setClientsPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">1</span>
                  <span className="text-xs text-gray-500">10</span>
                </div>
              </div>

              {/* Price per Client Slider */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {language === 'es' ? 'Precio por Cliente' : 'Price per Client'}
                  </label>
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    {formatCurrency(pricePerClient)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="50"
                  value={pricePerClient}
                  onChange={(e) => setPricePerClient(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">$100</span>
                  <span className="text-xs text-gray-500">$500</span>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'es' ? 'Por Semana' : 'Weekly'}
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(calculation.weeklyIncome)}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'es' ? 'Por Mes' : 'Monthly'}
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(calculation.monthlyIncome)}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {language === 'es' ? 'Por Año' : 'Yearly'}
                </p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(calculation.yearlyIncome)}
                </p>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'es' ? 'Clientes Totales por Año' : 'Total Clients per Year'}
                  </p>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    {calculation.totalClients}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {language === 'es' ? 'Promedio por Cliente' : 'Average per Client'}
                  </p>
                  <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                    {formatCurrency(pricePerClient)}
                  </p>
                </div>
              </div>
            </div>

            {/* Yearly Breakdown Toggle */}
            <button
              onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
              className="w-full text-left px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
            >
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {language === 'es' ? 'Ver Desglose Anual' : 'View Yearly Breakdown'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  showYearlyBreakdown ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Yearly Breakdown */}
            {showYearlyBreakdown && (
              <div className="mt-4 space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p className="mb-2 font-medium">
                    {language === 'es' ? 'Desglose de Ingresos:' : 'Income Breakdown:'}
                  </p>
                  <ul className="space-y-1 pl-4">
                    <li>
                      {language === 'es' 
                        ? `• ${clientsPerWeek} clientes × ${formatCurrency(pricePerClient)} = ${formatCurrency(calculation.weeklyIncome)} por semana`
                        : `• ${clientsPerWeek} clients × ${formatCurrency(pricePerClient)} = ${formatCurrency(calculation.weeklyIncome)} per week`
                      }
                    </li>
                    <li>
                      {language === 'es'
                        ? `• ${formatCurrency(calculation.weeklyIncome)} × 4 semanas = ${formatCurrency(calculation.monthlyIncome)} por mes`
                        : `• ${formatCurrency(calculation.weeklyIncome)} × 4 weeks = ${formatCurrency(calculation.monthlyIncome)} per month`
                      }
                    </li>
                    <li>
                      {language === 'es'
                        ? `• ${formatCurrency(calculation.weeklyIncome)} × 52 semanas = ${formatCurrency(calculation.yearlyIncome)} por año`
                        : `• ${formatCurrency(calculation.weeklyIncome)} × 52 weeks = ${formatCurrency(calculation.yearlyIncome)} per year`
                      }
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
              {language === 'es'
                ? '* Los ingresos pueden variar según la ubicación, la experiencia y otros factores. Esta es solo una estimación.'
                : '* Income may vary based on location, experience, and other factors. This is only an estimate.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 