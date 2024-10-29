import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { showModal } from "@openmrs/esm-framework";
import Tutorial from "./tutorial";
import userEvent from "@testing-library/user-event";

const mockShowModal = jest.mocked(showModal)

describe('Tutorial Component', () => {
	it('renders the menu item with the correct label', () => {
		render(<Tutorial />);

		expect(screen.getByText(/Tutorials/i)).toBeInTheDocument();
	})

	it('calls showModal when the menu item is clicked', async() => {
		render(<Tutorial />);

		const menuItem = screen.getByText(/Tutorials/i);
		await userEvent.click(menuItem);

		expect(mockShowModal).toHaveBeenCalledWith('tutorial-modal', expect.any(Object))
	})
})