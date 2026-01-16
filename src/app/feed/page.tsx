import { unstable_noStore } from "next/cache";
import GridBooks from "../components/Books/GridBooks";

export default function Feed() {
  unstable_noStore();
  return (
    <main className="w-full min-h-[calc(100vh-120px)] bg-neutral-50 py-4 px-4 md:px-6 pt-6">
      <GridBooks />
    </main>
  );
}
