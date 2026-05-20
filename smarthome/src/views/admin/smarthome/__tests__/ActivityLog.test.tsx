import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityLog from '../components/ActivityLog';

describe('ActivityLog Component', () => {
  it('renders correctly with no logs', () => {
    render(<ActivityLog logs={[]} />);
    expect(screen.getByText('Nenhuma atividade registrada.')).toBeInTheDocument();
  });

  it('renders a list of logs', () => {
    const logs = [
      { id: 1, time: '14:00', message: 'Luz da Sala ligada.' },
      { id: 2, time: '14:05', message: 'TV da sala ligada automaticamente.' }
    ];

    render(<ActivityLog logs={logs} />);

    expect(screen.getByText('Luz da Sala ligada.')).toBeInTheDocument();
    expect(screen.getByText('14:00')).toBeInTheDocument();

    expect(screen.getByText('TV da sala ligada automaticamente.')).toBeInTheDocument();
    expect(screen.getByText('14:05')).toBeInTheDocument();
  });
});
