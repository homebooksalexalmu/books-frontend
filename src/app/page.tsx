import FilterWrapper from "./components/Books/Filters/FilterWrapper";
import GridBooks from "./components/Books/GridBooks";

export default function Home() {

  return (
    <div className="w-full min-h-screen py-4 px-2 md:px-5">
      <FilterWrapper />
      <GridBooks />
    </div>
  );
}
