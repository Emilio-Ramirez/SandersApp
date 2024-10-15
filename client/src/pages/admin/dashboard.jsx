import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

import Statistics from '../../components/Statistics/Statistics'; 
import PhysicalDonations from '../../components/donations/PhysicalDonations';


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview'); // Tab state management

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* Tab Navigation */}
      <div className="tab-navigation">
      <button
            type="button"
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            className={activeTab === 'donaciones' ? 'active' : ''}
            onClick={() => setActiveTab('donaciones')}
          >
            Donaciones Físicas
          </button>
          <button
            type="button"
            className={activeTab === 'statistics' ? 'active' : ''}
            onClick={() => setActiveTab('statistics')}
          >
            Estadísticas
          </button>
      </div>

      {/* Render Content Based on Active Tab */}
      {activeTab === 'overview' && <AppView />}
      {activeTab === 'donaciones' && <PhysicalDonations />}
      {activeTab === 'statistics' && <Statistics />}
    </>
  );
}
