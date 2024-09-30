import React from 'react';
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

import PhysicalDonations from '../components/donations/PhysicalDonations';


export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <AppView />
      <PhysicalDonations />
    </>
  );
}
