import { vi } from "vitest";

// The code under test logs on its error paths (controllers do `console.log(error)`,
// CloudinaryService logs upload failures, etc.). Many tests deliberately exercise
// those paths, so their output would flood the test report with scary — but
// expected — stack traces. We assert on return values / thrown errors, not on
// console output, so silence these here to keep the report readable.
//
// Temporarily comment this out if you need to see a service's logs while debugging.
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});
vi.spyOn(console, "warn").mockImplementation(() => {});
