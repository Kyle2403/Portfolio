"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3, Users, BookOpen, Briefcase, AlertCircle, CheckCircle, TrendingUp, Calculator } from 'lucide-react';

const StudentPerformanceAnalysisPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const wamData = [
    { group: 'Normal Stream', mean: 68.5, n: 45, color: '#60a5fa' },
    { group: 'Advanced Stream', mean: 76.2, n: 28, color: '#3b82f6' }
  ];

  return (
    <div className='min-h-screen flex flex-col'>
        <div className="flex-grow bg-gradient-to-br from-blue-50 to-purple-50 p-6 pt-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-slate-800">Academic Performance Analysis</h1>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                    Comprehensive statistical analysis comparing academic performance, work patterns, and technical experience 
                    between normal and advanced stream students using hypothesis testing and data visualization.
                </p>
                <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Hypothesis Testing</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Statistical Analysis</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">R Programming</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Data Visualization</span>
                </div>
                </div>

                {/* Key Metrics */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    Study Overview
                </h2>
                <div className="flex gap-6 justify-between">
                    <div className="text-center flex-1">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">73</div>
                    <div className="text-sm text-slate-600">Total Students</div>
                    </div>
                    <div className="text-center flex-1">
                    <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">3</div>
                    <div className="text-sm text-slate-600">Research Questions</div>
                    </div>
                    <div className="text-center flex-1">
                    <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">5</div>
                    <div className="text-sm text-slate-600">Statistical Tests</div>
                    </div>
                    <div className="text-center flex-1">
                    <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-800">2</div>
                    <div className="text-sm text-slate-600">Study Streams</div>
                    </div>
                </div>
                </div>

                {/* Key Findings */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Key Findings
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                        <h3 className="font-semibold text-green-800 mb-2">Academic Performance</h3>
                        <p className="text-green-700 text-sm leading-relaxed">
                            Advanced stream students show significantly higher WAM scores
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                        <h3 className="font-semibold text-blue-800 mb-2">Technical Experience</h3>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            R programming experience is significantly associated with stream choice
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                        <h3 className="font-semibold text-purple-800 mb-2">Employment Patterns</h3>
                        <p className="text-purple-700 text-sm leading-relaxed">
                            Work status is significantly related to academic stream
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Question 1: WAM Analysis */}
                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                <button
                    onClick={() => toggleSection('wam')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    Question 1: Academic Performance Comparison
                    </h2>
                    {expandedSection === 'wam' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSection === 'wam' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="space-y-6 mt-4">
                        
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Research Question</h3>
                        <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                            Is there a significant difference in Weighted Average Mark (WAM) between normal and advanced stream students?
                        </p>
                        </div>

                        {/* WAM Distribution Visualization */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">WAM Distribution Comparison</h3>
                        
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <div className="flex items-end justify-center gap-8 h-48 mb-4">
                            {wamData.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                <div 
                                    className="w-16 rounded-t"
                                    style={{ 
                                    height: `${(item.mean / 85) * 160}px`,
                                    backgroundColor: item.color
                                    }}
                                ></div>
                                <div className="mt-2 text-sm font-medium text-slate-700 text-center">{item.group}</div>
                                <div className="text-xs text-slate-600">μ = {item.mean}</div>
                                <div className="text-xs text-slate-500">n = {item.n}</div>
                                </div>
                            ))}
                            </div>
                        </div>
                        </div>

                        {/* Hypothesis Framework */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Hypothesis Framework</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-slate-800 mb-2">H₀ (Null Hypothesis)</h4>
                            <p className="text-sm text-slate-700 mb-2">
                                There is no difference in mean WAM between normal and advanced stream students.
                            </p>
                            <div className="text-xs text-slate-600 bg-white rounded px-2 py-1 inline-block">
                                μ₁ = μ₂
                            </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-slate-800 mb-2">H₁ (Alternative Hypothesis)</h4>
                            <p className="text-sm text-slate-700 mb-2">
                                There is a significant difference in mean WAM between the two streams.
                            </p>
                            <div className="text-xs text-slate-600 bg-white rounded px-2 py-1 inline-block">
                                μ₁ ≠ μ₂ (two-tailed)
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Statistical Results */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Statistical Test Results</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">Two-Sample T-Test</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700">
                                <div>
                                <div className="font-medium">Test Statistic</div>
                                <div>t = -4.12</div>
                                </div>
                                <div>
                                <div className="font-medium">P-value</div>
                                <div>0.0001269</div>
                                </div>
                                <div>
                                <div className="font-medium">Decision</div>
                                <div>Reject H₀</div>
                                </div>
                            </div>
                            </div>
                            
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Assumption Validation</h4>
                            <div className="space-y-2 text-sm text-blue-700">
                                <div className="flex justify-between">
                                <span>Equal Variance (F-test):</span>
                                <span>p = 0.963 → Assumption satisfied ✓</span>
                                </div>
                                <div className="flex justify-between">
                                <span>Normality (Q-Q plots):</span>
                                <span>Reasonably linear → Assumption satisfied ✓</span>
                                </div>
                                <div className="flex justify-between">
                                <span>Independence:</span>
                                <span>Different students → Assumption satisfied ✓</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Conclusion</h4>
                        <p className="text-green-700 text-sm leading-relaxed">
                            With p {"<"} 0.05, we have strong evidence that advanced stream students have significantly higher WAM scores 
                            than normal stream students (76.2 vs 68.5 average).
                        </p>
                        </div>

                    </div>
                    </div>
                )}
                </div>

                {/* Question 2: R Experience */}
                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                <button
                    onClick={() => toggleSection('r_experience')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Question 2: R Programming Experience Analysis
                    </h2>
                    {expandedSection === 'r_experience' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {expandedSection === 'r_experience' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="space-y-6 mt-4">
                        
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Research Question</h3>
                        <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                            Is prior R programming experience independent of the academic stream students choose?
                        </p>
                        </div>

                        {/* Contingency Table */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Contingency Table Analysis</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-slate-300">
                                    <th className="text-left py-2 px-4"></th>
                                    <th className="text-center py-2 px-4 bg-blue-100">Used R Before</th>
                                    <th className="text-center py-2 px-4 bg-red-100">Not Used R Before</th>
                                    <th className="text-center py-2 px-4 font-bold">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-b border-slate-200">
                                    <td className="py-2 px-4 font-medium bg-blue-50">Normal Stream</td>
                                    <td className="text-center py-2 px-4">15</td>
                                    <td className="text-center py-2 px-4">30</td>
                                    <td className="text-center py-2 px-4 font-bold">45</td>
                                </tr>
                                <tr className="border-b border-slate-200">
                                    <td className="py-2 px-4 font-medium bg-green-50">Advanced Stream</td>
                                    <td className="text-center py-2 px-4">18</td>
                                    <td className="text-center py-2 px-4">10</td>
                                    <td className="text-center py-2 px-4 font-bold">28</td>
                                </tr>
                                <tr className="border-t-2 border-slate-300 font-bold">
                                    <td className="py-2 px-4">Total</td>
                                    <td className="text-center py-2 px-4">33</td>
                                    <td className="text-center py-2 px-4">40</td>
                                    <td className="text-center py-2 px-4">73</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                        </div>

                        {/* Hypothesis */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Hypothesis Framework</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-slate-800 mb-2">H₀ (Null Hypothesis)</h4>
                            <p className="text-sm text-slate-700">
                                R programming experience is independent of academic stream choice.
                            </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <h4 className="font-semibold text-slate-800 mb-2">H₁ (Alternative Hypothesis)</h4>
                            <p className="text-sm text-slate-700">
                                R programming experience and academic stream choice are not independent.
                            </p>
                            </div>
                        </div>
                        </div>

                        {/* Test Results */}
                        <div>
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Fisher's Exact Test Results</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
                                <div>
                                <div className="font-medium">Test Used</div>
                                <div>Fisher's Exact Test</div>
                                </div>
                                <div>
                                <div className="font-medium">P-value</div>
                                <div>0.0269</div>
                                </div>
                                <div>
                                <div className="font-medium">Decision</div>
                                <div>Reject H₀</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Conclusion</h4>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            At α = 0.05, we reject the null hypothesis. There is significant evidence that R programming 
                            experience is associated with stream choice. Advanced stream students are more likely to have 
                            prior R experience (64.3% vs 33.3%).
                        </p>
                        </div>

                    </div>
                    </div>
                )}
                </div>

                <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
                  <button
                    onClick={() => toggleSection('employment')}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Question 3: Employment Status and Stream
                    </h2>
                    {expandedSection === 'employment' ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  {expandedSection === 'employment' && (
                    <div className="px-6 pb-6 border-t border-slate-100">
                      <div className="space-y-6 mt-4">

                        {/* Research Question */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-3">
                            Research Question
                          </h3>
                          <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                            Is a student’s employment status (working vs not working) 
                            independent of their academic stream?
                          </p>
                        </div>

                        {/* Contingency Table */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-3">
                            Contingency Table Analysis
                          </h3>
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-slate-300">
                                  <th className="text-left py-2 px-4"></th>
                                  <th className="text-center py-2 px-4 bg-purple-100">Employed</th>
                                  <th className="text-center py-2 px-4 bg-gray-100">Not Employed</th>
                                  <th className="text-center py-2 px-4 font-bold">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-slate-200">
                                  <td className="py-2 px-4 font-medium bg-purple-50">Normal Stream</td>
                                  <td className="text-center py-2 px-4">28</td>
                                  <td className="text-center py-2 px-4">17</td>
                                  <td className="text-center py-2 px-4 font-bold">45</td>
                                </tr>
                                <tr className="border-b border-slate-200">
                                  <td className="py-2 px-4 font-medium bg-green-50">Advanced Stream</td>
                                  <td className="text-center py-2 px-4">8</td>
                                  <td className="text-center py-2 px-4">20</td>
                                  <td className="text-center py-2 px-4 font-bold">28</td>
                                </tr>
                                <tr className="border-t-2 border-slate-300 font-bold">
                                  <td className="py-2 px-4">Total</td>
                                  <td className="text-center py-2 px-4">36</td>
                                  <td className="text-center py-2 px-4">37</td>
                                  <td className="text-center py-2 px-4">73</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Hypothesis */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-3">
                            Hypothesis Framework
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-2">H₀ (Null Hypothesis)</h4>
                              <p className="text-sm text-slate-700">
                                Employment status is independent of academic stream.
                              </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                              <h4 className="font-semibold text-slate-800 mb-2">H₁ (Alternative Hypothesis)</h4>
                              <p className="text-sm text-slate-700">
                                Employment status and academic stream are not independent.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Chi-Square Test Results */}
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-3">Chi-Square Test Results</h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-700">
                                <div>
                                  <div className="font-medium">Test Used</div>
                                  <div>Chi-Square Test of Independence</div>
                                </div>
                                <div>
                                  <div className="font-medium">P-value</div>
                                  <div>{'< 0.001'}</div>
                                </div>
                                <div>
                                  <div className="font-medium">Decision</div>
                                  <div>Reject H₀</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Conclusion */}
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-2">Conclusion</h4>
                          <p className="text-purple-700 text-sm leading-relaxed">
                            There is strong evidence that employment status is associated with stream choice.
                            Normal stream students are more likely to work while advanced stream students
                            are more likely to be not employed during the semester.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
            </div>
        </div>
    </div>
)}
export default StudentPerformanceAnalysisPage