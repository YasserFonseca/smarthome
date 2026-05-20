import React from 'react';
import { render, screen } from '@testing-library/react';
import EnergyDashboard from '../components/EnergyDashboard';

describe('EnergyDashboard Component', () => {
  it('calculates energy consumption correctly with no extra devices', () => {
    const lights = { kitchen: false, bath: false, bedRoom: false, livingRoom: false, bedRoom2: false };

    render(<EnergyDashboard lights={lights} tvActive={false} robotActive={false} />);

    // Base is 120W
    expect(screen.getAllByText(/120/)[0]).toBeInTheDocument();
  });

  it('calculates energy consumption correctly with some lights on', () => {
    const lights = { kitchen: true, bath: false, bedRoom: true, livingRoom: false, bedRoom2: false };

    render(<EnergyDashboard lights={lights} tvActive={false} robotActive={false} />);

    // Base (120) + 2 lights (30) = 150
    expect(screen.getByText(/150/)).toBeInTheDocument();
  });

  it('calculates energy consumption correctly with tv and robot active', () => {
    const lights = { kitchen: false, bath: false, bedRoom: false, livingRoom: false, bedRoom2: false };

    render(<EnergyDashboard lights={lights} tvActive={true} robotActive={true} />);

    // Base (120) + TV (150) + Robot (1200) = 1470
    expect(screen.getByText(/1470/)).toBeInTheDocument();
  });
});
