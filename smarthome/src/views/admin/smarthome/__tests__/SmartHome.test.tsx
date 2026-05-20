import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SmartHome from '../index';

describe('SmartHome Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders FloorPlan and its initial state', () => {
    render(<SmartHome />);

    // Check if initial components from FloorPlan are rendered
    expect(screen.getByText('Controles')).toBeInTheDocument();
    expect(screen.getByText('Consumo de Energia')).toBeInTheDocument();
  });
});
