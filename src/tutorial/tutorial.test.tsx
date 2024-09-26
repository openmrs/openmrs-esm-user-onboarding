import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { showModal } from "@openmrs/esm-framework";
import Tutorial from "./tutorial";

jest.mock('@openmrs/esm-framework', () => ({
	showModal: jest.fn(),
}))

describe('Tutorial Component', () => {
	it('renders the menu item with the correct label', () => {
		render(<Tutorial />);

		expect(screen.getByText(/Tutorials/i)).toBeInTheDocument();
	})

	it('calls showModal when the menu item is clicked', () => {
		render(<Tutorial />);

		const menuItem = screen.getByText(/Tutorials/i);
		fireEvent.click(menuItem);

		expect(showModal).toHaveBeenCalledWith('tutorial-modal', expect.any(Object))
	})
})