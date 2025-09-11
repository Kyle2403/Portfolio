'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, BarChart3, Shield, Clock } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
const FuzzingThesisPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50  to-blue-50">
      <NavigationBar/>
      <div className='flex flex-col min-h-screen'>

      
      <div className="max-w-4xl mx-auto pt-20 flex-grow">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200 hover:bg-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-800">Fuzzing Rule Evaluation</h1>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
          Statistical analysis evaluating a stopping rule proposed by earlier study for fuzzing campaigns.

          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Security Testing</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Statistical Analysis</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Research Validation</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">AFL++</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-slate-200 hover:bg-gray-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
             Scale & Scope
          </h2>
          <div className="flex gap-6">
            <div className="text-center flex-1">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">48 Hours</div>
              <div className="text-sm text-slate-600">Campaign Duration</div>
            </div>
            <div className="text-center flex-1">
              <Code className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">4 Targets</div>
              <div className="text-sm text-slate-600">Real-world Programs</div>
            </div>
            <div className="text-center flex-1">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">7 Estimators</div>
              <div className="text-sm text-slate-600">Statistical Models</div>
            </div>
            <div className="text-center flex-1">
              <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">480K+</div>
              <div className="text-sm text-slate-600">Basic Blocks</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            The Problem
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Fuzzing is a powerful way to find software bugs, but security teams often let these tests run endlessly without knowing when they have already caught most issues. This project tackles this by evaluating a stopping rule proposed by earlier study.
          </p>
        </div>


        {/* Expandable Sections */}
        
        {/* Methodology */}
        <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
          <button
            onClick={() => toggleSection('methodology')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              Methodology & Tools
            </h2>
            {expandedSection === 'methodology' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSection === 'methodology' && (
            <div className="px-6 pb-6 border-t border-slate-100">
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Experimental Design</h3>
                  <ul className="text-slate-700 space-y-1 text-sm">
                    <li>• Replicated methodology from original paper</li>
                    <li>• 48-hour AFL++ fuzzing campaigns</li>
                    <li>• Real-world targets: FFmpeg, FreeType2, JsonCpp, Jasper</li>
                    <li>• Statistical consistency validation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Statistical Analysis</h3>
                  <ul className="text-slate-700 space-y-1 text-sm">
                    <li>• Seven coverage estimators (Chao2, Jackknife, ICE)</li>
                    <li>• Wilcoxon signed-rank testing</li>
                    <li>• Bootstrap validation against ground truth</li>
                    <li>• Bias analysis over time</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Findings */}
        <div className="bg-white rounded-lg shadow-md mb-6 border border-slate-200">
          <button
            onClick={() => toggleSection('findings')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Key Findings & Data
            </h2>
            {expandedSection === 'findings' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {expandedSection === 'findings' && (
            <div className="px-6 pb-6 border-t border-slate-100">
              <div className="space-y-6 mt-4">
                
                {/* Key Results Summary */}
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">Critical Discovery</h3>
                    <p className="text-red-700 text-sm">
                      All seven statistical estimators consistently predict false peaks - suggesting saturation while significant coverage remains undiscovered.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Mixed Stopping Criterion Results</h3>
                    <p className="text-yellow-700 text-sm">
                      The proposed stopping rule (f₁ ≤ f₂) worked for some targets but triggered prematurely in others, requiring context-sensitive application.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Reproducible Methodology</h3>
                    <p className="text-green-700 text-sm">
                      Statistical consistency validated across independent runs (p {'>'} 0.05), confirming estimator reliability despite systematic bias.
                    </p>
                  </div>
                </div>

                {/* Visual Placeholders */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Supporting Evidence</h3>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <img 
                      src="/cov.png" 
                      className="w-full max-w-xl mx-auto mb-3  rounded"
                    />
                    <h4 className="font-medium text-slate-700 mb-2">Coverage and estimated reachable coverage</h4>

                    <div className="text-xs text-slate-500 bg-white rounded px-3 py-1 inline-block">
                    Table 1: Presence of false peak predictions by all estimators
                    </div>
                  </div>

                  

                  {/* Coverage Over Time */}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <img 
                      src="/jk1.png" 
                      className="w-full max-w-xl mx-auto mb-3  rounded"
                    />
                    <h4 className="font-medium text-slate-700 mb-2">Coverage vs. Estimator Predictions</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Jackknife estimates compared to bootstrapped reachable coverage over campaign duration
                    </p>
                    <div className="text-xs text-slate-500 bg-white rounded px-3 py-1 inline-block">
                      Figure 1: Red dots indicate stopping criterion satisfaction points
                    </div>
                  </div>

                  {/* Bias Analysis */}
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <img 
                      src="/bias.png" 
                      className="w-full max-w-xl mx-auto mb-3  rounded"
                    />
                    <h4 className="font-medium text-slate-700 mb-2">Estimator Bias Over Time</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Percentage deviation from bootstrapped ground truth across all targets and estimators
                    </p>
                    <div className="text-xs text-slate-500 bg-white rounded px-3 py-1 inline-block">
                      Figure 2: Bias approaches 0% as campaigns progress, showing improved accuracy
                    </div>
                  </div>

                  {/* Estimator Consistency Chart */}
                  <div className=" border-2 border-dashed border-slate-300 rounded-lg py-4 text-center">
                    <img 
                      src="/meandiff.png" 
                      alt="Estimator Consistency Analysis" 
                      className="w-full max-w-xl mx-auto mb-3  rounded"
                    />
                    <h4 className="font-medium text-slate-700 mb-2">Estimator Consistency Analysis</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Mean normalized difference between replicated and original results across 7 estimators
                    </p>
                    <div className="text-xs text-slate-500 bg-white rounded px-3 py-1 inline-block">
                      Figure 3: Differences range from -0.004 to 0.012 (statistically insignificant)
                    </div>
                  </div>

                  
                </div>
              </div>
              
            </div>
          )}
        </div>
           <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-6 text-white mb-4">
            <h2 className="text-xl font-bold mb-4">Skills Demonstrated</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                <h3 className="font-semibold mb-2">Research & Analysis</h3>
                <ul className="text-blue-100 space-y-1 text-sm">
                    <li>• Experimental design and replication</li>
                    <li>• Statistical hypothesis testing</li>
                    <li>• Critical evaluation of existing methods</li>
                </ul>
                </div>
                <div>
                <h3 className="font-semibold mb-2">Technical Implementation</h3>
                <ul className="text-blue-100 space-y-1 text-sm">
                    <li>• Automated testing frameworks (AFL++)</li>
                    <li>• Data collection and analysis</li>
                    <li>• Security testing methodology</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default FuzzingThesisPage;