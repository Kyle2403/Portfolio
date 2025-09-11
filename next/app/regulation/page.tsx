"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3, TrendingDown, MapPin, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
const ParklandRegulationPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const penaltyData = [
    { year: '2012', cases: 2537, regulation: '2009' },
    { year: '2013', cases: 2468, regulation: '2009' },
    { year: '2015', cases: 2486, regulation: '2014' },
    { year: '2016', cases: 1799, regulation: '2014' },
    { year: '2017', cases: 1950, regulation: '2014' }
  ];

  return (
    <div className='min-h-screen flex flex-col'>
        <NavigationBar></NavigationBar>
        <div className="flex-grow bg-gradient-to-br from-green-50 to-blue-50 p-6 pt-20">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-8 h-8 text-green-600" />
                    <h1 className="text-3xl font-bold text-slate-800">Parkland Regulation Effectiveness Analysis</h1>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Statistical evaluation comparing the effectiveness of 2014 vs 2009 Centennial Park regulations in reducing violation cases.
                </p>
                <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Statistical Testing</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Policy Analysis</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">R Programming</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Hypothesis Testing</span>
                </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                    Analysis Overview
                </h2>
                <div className="flex gap-6 justify-between">
                    <div className="text-center flex-1">
                    <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">284K+</div>
                    <div className="text-sm text-slate-600">Total Records</div>
                    </div>
                    <div className="text-center flex-1">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">5 Years</div>
                    <div className="text-sm text-slate-600">Data Range</div>
                    </div>
                    <div className="text-center flex-1">
                    <TrendingDown className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">2 Regulations</div>
                    <div className="text-sm text-slate-600">Compared</div>
                    </div>
                    <div className="text-center flex-1">
                    <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">11K+</div>
                    <div className="text-sm text-slate-600">Penalty Cases</div>
                    </div>
                </div>
                </div>

                {/* Key Finding */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    Key Finding
                </h2>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-red-800 mb-2">No Significant Improvement</h3>
                        <p className="text-red-700 text-sm leading-relaxed">
                        Statistical analysis reveals that the 2014 Regulation is not significantly better than the 2009 Regulation 
                        in reducing parkland violation cases (p-value = 0.107 {'>'} 0.05).
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Expandable Sections */}
                
                {/* Data Overview */}
                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                <button
                    onClick={() => toggleSection('data')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Data & Methodology
                    </h2>
                    {expandedSection === 'data' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSection === 'data' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Dataset Characteristics</h3>
                        <ul className="text-slate-700 space-y-1 text-sm">
                            <li>• 284,405 total penalty records</li>
                            <li>• 25 variables (20 categorical, 5 numerical)</li>
                            <li>• Focus: Centennial Park violation cases</li>
                            <li>• Time period: 2012-2017 (excluding 2014, 2018)</li>
                        </ul>
                        </div>
                        <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Statistical Approach</h3>
                        <ul className="text-slate-700 space-y-1 text-sm">
                            <li>• Two-sample t-test for mean comparison</li>
                            <li>• F-test for equal variance assumption</li>
                            <li>• Q-Q plots for normality validation</li>
                            <li>• One-tailed hypothesis test (α = 0.05)</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                {/* Results & Analysis */}
                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                <button
                    onClick={() => toggleSection('results')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Results & Statistical Evidence
                    </h2>
                    {expandedSection === 'results' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSection === 'results' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="space-y-6 mt-4">
                        
                        {/* Penalty Trends */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Penalty Cases by Year</h3>
                        
                        {/* Bar Chart Visualization */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <div className="flex items-end justify-center gap-4 h-48 mb-4">
                            {penaltyData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                <div 
                                    className={`w-12 ${item.regulation === '2009' ? 'bg-blue-500' : 'bg-green-500'} rounded-t`}
                                    style={{ height: `${(item.cases / 2600) * 160}px` }}
                                ></div>
                                <div className="mt-2 text-xs font-medium text-slate-700">{item.year}</div>
                                <div className="text-xs text-slate-600">{item.cases.toLocaleString()}</div>
                                </div>
                            ))}
                            </div>
                            <div className="flex justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                <span className="text-slate-700">2009 Regulation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                <span className="text-slate-700">2014 Regulation</span>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Statistical Results */}
                        <div className=''>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3"> Data Comparison</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">2009 Regulation (μ₁)</h4>
                            <div className="space-y-1 text-sm text-blue-700">
                                <div>Mean: 2,502.5 cases/year</div>
                                <div>Years: 2012, 2013</div>
                                <div>Sample size: n₁ = 2</div>
                            </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">2014 Regulation (μ₂)</h4>
                            <div className="space-y-1 text-sm text-green-700">
                                <div>Mean: 2,078.3 cases/year</div>
                                <div>Years: 2015, 2016, 2017</div>
                                <div>Sample size: n₂ = 3</div>
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Hypothesis Framework */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Hypothesis Framework</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                <h4 className="font-semibold text-slate-800 mb-2">H₀ (Null Hypothesis)</h4>
                                <p className="text-sm text-slate-700 mb-2">
                                    There is no difference between the mean penalty cases before and after the 2014 regulation.
                                </p>
                                <div className="text-xs text-slate-600 bg-white rounded px-2 py-1 inline-block">
                                    μ₁ - μ₂ = 0
                                </div>
                                </div>
                                <div>
                                <h4 className="font-semibold text-slate-800 mb-2">H₁ (Alternative Hypothesis)</h4>
                                <p className="text-sm text-slate-700 mb-2">
                                    The 2014 regulation is more effective - mean cases after 2014 are significantly lower.
                                </p>
                                <div className="text-xs text-slate-600 bg-white rounded px-2 py-1 inline-block">
                                    μ₁ - μ₂ {'>'} 0 (one-tailed)
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className=''>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Equal Variance Assessment (F-test)</h3>
                        <div className='bg-slate-50 border border-slate-200 rounded-lg p-6'>
                            <p className='text-sm text-slate-700 font-medium'>
                            F-test p-value is 0.1903 {">"} 0.05, indicating both groups have similar variability (equal variance assumption satisfied)
                            </p>

                        </div>
                        </div>

                        
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Normality Assessment (Q-Q Plots)</h3>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                            
                            {/* Before 2014 QQ Plot */}
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-3 text-center">Before 2014 Regulation</h4>
                                <div className="bg-white rounded border border-slate-200 p-4">
                                <svg width="200" height="200" className="mx-auto">
                                    <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                                    </pattern>
                                    </defs>
                                    <rect width="200" height="200" fill="url(#grid)" />
                                    
                                    {/* Reference line */}
                                    <line x1="20" y1="180" x2="180" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                                    
                                    {/* Data points for before 2014 */}
                                    <circle cx="60" cy="150" r="4" fill="#0ea5e9" />
                                    <circle cx="140" cy="50" r="4" fill="#0ea5e9" />
                                    
                                    {/* Axes */}
                                    <line x1="20" y1="20" x2="20" y2="180" stroke="#374151" strokeWidth="2" />
                                    <line x1="20" y1="180" x2="180" y2="180" stroke="#374151" strokeWidth="2" />
                                    
                                    {/* Axis labels */}
                                    <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Theoretical Quantiles</text>
                                    <text x="10" y="100" textAnchor="middle" fontSize="10" fill="#6b7280" transform="rotate(-90 10 100)">Sample Quantiles</text>
                                </svg>
                                </div>
                            </div>
                            
                            {/* After 2014 QQ Plot */}
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-3 text-center">After 2014 Regulation</h4>
                                <div className="bg-white rounded border border-slate-200 p-4">
                                <svg width="200" height="200" className="mx-auto">
                                    <defs>
                                    <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                                    </pattern>
                                    </defs>
                                    <rect width="200" height="200" fill="url(#grid2)" />
                                    
                                    {/* Reference line */}
                                    <line x1="20" y1="180" x2="180" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
                                    
                                    {/* Data points for after 2014 */}
                                    <circle cx="50" cy="160" r="4" fill="#ef4444" />
                                    <circle cx="100" cy="100" r="4" fill="#ef4444" />
                                    <circle cx="150" cy="40" r="4" fill="#ef4444" />
                                    
                                    {/* Axes */}
                                    <line x1="20" y1="20" x2="20" y2="180" stroke="#374151" strokeWidth="2" />
                                    <line x1="20" y1="180" x2="180" y2="180" stroke="#374151" strokeWidth="2" />
                                    
                                    {/* Axis labels */}
                                    <text x="100" y="195" textAnchor="middle" fontSize="10" fill="#6b7280">Theoretical Quantiles</text>
                                    <text x="10" y="100" textAnchor="middle" fontSize="10" fill="#6b7280" transform="rotate(-90 10 100)">Sample Quantiles</text>
                                </svg>
                                </div>
                            </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="text-sm text-blue-700">
                                <strong>Interpretation:</strong> Both Q-Q plots show data points reasonably close to the reference line, 
                                supporting the normality assumption required for the t-test. The slight deviations are acceptable given the small sample sizes.
                            </p>
                            </div>
                        </div>
                        
                        </div>

                        {/* Test Statistics */}
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-3"> Statistical Test Summary</h3>
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-yellow-700">
                                <div>
                                <div className="font-medium">P-value</div>
                                <div>0.107</div>
                                </div>
                                <div>
                                <div className="font-medium">Significance Level</div>
                                <div>α = 0.05</div>
                                </div>
                                <div>
                                <div className="font-medium">Decision</div>
                                <div>Retain H₀</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        

                    </div>
                    </div>
                )}
                </div>

                {/* Assumptions & Validation */}
                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                <button
                    onClick={() => toggleSection('assumptions')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    Statistical Assumptions & Validation
                    </h2>
                    {expandedSection === 'assumptions' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSection === 'assumptions' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="space-y-4 mt-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                            <h3 className="font-semibold text-green-800 mb-1">Independence</h3>
                            <p className="text-green-700 text-sm">Samples taken from different time periods (before/after Sept 2014)</p>
                            </div>
                        </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                            <h3 className="font-semibold text-green-800 mb-1">Equal Variance</h3>
                            <p className="text-green-700 text-sm">F-test p-value = 0.1903 {'>'} 0.05 (assumption satisfied)</p>
                            </div>
                        </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                            <h3 className="font-semibold text-green-800 mb-1">Normality</h3>
                            <p className="text-green-700 text-sm">Q-Q plots show reasonable straight lines for both populations</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                )}
                </div>

                {/* Skills Demonstrated */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-md p-6 text-white">
                <h2 className="text-xl font-bold mb-4">Skills Demonstrated</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                    <h3 className="font-semibold mb-2">Statistical Analysis</h3>
                    <ul className="text-green-100 space-y-1 text-sm">
                        <li>• Hypothesis testing and p-value interpretation</li>
                        <li>• Assumption validation (F-test, Q-Q plots)</li>
                        <li>• Two-sample t-test implementation</li>
                        <li>• Policy impact evaluation</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="font-semibold mb-2">Data Science & Programming</h3>
                    <ul className="text-green-100 space-y-1 text-sm">
                        <li>• R programming and data manipulation</li>
                        <li>• Large dataset processing (284K+ records)</li>
                        <li>• Data visualization and reporting</li>
                        <li>• Statistical package implementation</li>
                    </ul>
                    </div>
                </div>
                </div>

            </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default ParklandRegulationPage;