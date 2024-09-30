
import React from 'react';
import { Helmet } from 'react-helmet-async'; // Meta tag management for the page title
import { AppView } from 'src/sections/overview/view'; // Main dashboard view (overview)
import PhysicalDonations from '../components/PhysicalDonations'; // Import the PhysicalDonations component

export default function DashboardPage() {
  return (
    <>
      {/* Helmet manages the title of the page */}
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* AppView is the main overview component for the dashboard */}
      <AppView />

      {/* PhysicalDonations will handle the form for physical donations */}
      <PhysicalDonations />
    </>
  );
}
