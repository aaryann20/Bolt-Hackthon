import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import DemoSection from './components/DemoSection';
import FlowDiagram from './components/FlowDiagram';
import ProcessFlow from './components/ProcessFlow';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import DeploymentSection from './components/DeploymentSection';
import FullReport from './components/FullReport';
import AIChatbot from './components/AIChatbot';
import TimeMachineAudit from './pages/TimeMachineAudit';
import ContractSocialProof from './pages/ContractSocialProof';
import VulnerabilitySimulator from './pages/VulnerabilitySimulator';
import MarketAnalytics from './pages/MarketAnalytics';
import ContractExplorer from './pages/ContractExplorer';
import RealTimeRiskAnalysis from './pages/RealTimeRiskAnalysis';
import LiquidityPoolAnalyzer from './pages/LiquidityPoolAnalyzer';
import WhaleActivityMonitor from './pages/WhaleActivityMonitor';
import AdvancedFeatures from './pages/AdvancedFeatures';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: false,
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="font-inter text-gray-800">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main>
                <DemoSection />
                <FlowDiagram />
                <ProcessFlow />
                <TechStack />
                <DeploymentSection />
              </main>
              <Footer />
              <AIChatbot />
            </>
          } />
          <Route path="/report" element={<FullReport />} />
          <Route path="/advanced-features" element={<AdvancedFeatures />} />
          <Route path="/time-machine" element={<TimeMachineAudit />} />
          <Route path="/social-proof" element={<ContractSocialProof />} />
          <Route path="/vulnerability-simulator" element={<VulnerabilitySimulator />} />
          <Route path="/market-analytics" element={<MarketAnalytics />} />
          <Route path="/contract-explorer" element={<ContractExplorer />} />
          <Route path="/real-time-risk" element={<RealTimeRiskAnalysis />} />
          <Route path="/liquidity-analyzer" element={<LiquidityPoolAnalyzer />} />
          <Route path="/whale-monitor" element={<WhaleActivityMonitor />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;