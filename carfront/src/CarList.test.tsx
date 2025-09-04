import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CarList from "./Components/CarList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import userEvent from '@testing-library/user-event'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        }
    }
});

const wrapper = ({ children } : {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe("CarList tests", () => {
    test("component renders", () => {
        render(<CarList/>, { wrapper })
        expect(screen.getByText(/Loading/i)).toBeDefined();
    })

    test("Cars are fetched", async () => {
        render(<CarList/>, { wrapper });

        await waitFor(() => screen.getByText(/New Car/i));
        expect(screen.getByText(/Leaf/i)).toBeDefined();
    })

    test("Open new car model", async () => {
        render(<CarList/>, { wrapper });

        await waitFor(() => screen.getByText(/New Car/i));
        await userEvent.click(screen.getByText(/New Car/i));
        expect(screen.getByText(/Save/i)).toBeDefined();
    })
})