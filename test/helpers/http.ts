import { NextRequest } from "next/server";

/** Minimal NextRequest double whose `json()` resolves to the given body. */
export const jsonRequest = (body: unknown): NextRequest =>
    ({ json: async () => body } as unknown as NextRequest);

/** NextRequest double that only exposes a rejecting `json()` (malformed body). */
export const brokenJsonRequest = (): NextRequest =>
    ({
        json: async () => {
            throw new SyntaxError("Unexpected end of JSON input");
        },
    } as unknown as NextRequest);

/** NextRequest double exposing `nextUrl.searchParams` from a plain object. */
export const searchParamsRequest = (params: Record<string, string>): NextRequest =>
    ({
        nextUrl: { searchParams: new URLSearchParams(params) },
    } as unknown as NextRequest);
