import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Room from '../components/Room';
import { MdLightbulbOutline } from "react-icons/md";

describe('Room Component', () => {
  it('toggles light on and off', () => {
    const handleToggle = jest.fn();

    const { container } = render(
      <Room
        url="test.png"
        icon={<MdLightbulbOutline data-testid="light-icon" />}
        onToggle={handleToggle}
      />
    );

    const icon = screen.getByTestId('light-icon');

    // Light is off by default
    // we assume the first child of the wrapper that wraps the icon triggers the toggle
    // let's grab the wrapper by the click event
    const button = icon.parentElement;

    fireEvent.click(button!);

    // Function should have been called
    expect(handleToggle).toHaveBeenCalledTimes(1);

    // Background should update (checked through dimmer state internal logic, class text-brand-500 should be active)
    expect(button).toHaveClass('text-brand-500');

    // Click again
    fireEvent.click(button!);
    expect(handleToggle).toHaveBeenCalledTimes(2);
    expect(button).toHaveClass('text-gray-500');
  });
});
