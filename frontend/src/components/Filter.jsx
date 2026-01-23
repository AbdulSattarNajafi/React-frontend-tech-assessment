import { useState } from "react";
import { FaFilter, FaCheck } from "react-icons/fa6";

import { useTasksContext } from "../contexts/TasksContext";
import useOutsideClick from "../hooks/useOutsideClick";
import { cn } from "../lib/util";

function Filter({ options, filterType }) {
  const [currentFilter, setCurrentFilter] = useState(options.at(0).value);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useOutsideClick(() => setShowDropdown(false));
  const { setOptions } = useTasksContext();

  const handleClick = (value) => {
    setCurrentFilter(value);
    setOptions((prev) => ({ ...prev, [filterType]: value }));
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 rounded border border-stone-200 px-3 py-1",
          showDropdown && "bg-gray-100",
        )}
      >
        <FaFilter className="text-sm" />
        <span className="capitalize">{filterType}</span>
      </button>

      <div
        className={cn(
          "absolute top-full right-0 z-20 hidden w-36 pt-1",
          showDropdown && "block",
        )}
        ref={ref}
      >
        <div className="p-2.5s flex flex-col gap-0.5 rounded border border-stone-100 bg-white shadow-md overflow-hidden">
          {options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              disabled={option.value === currentFilter}
              className={cn(
                "flex items-center justify-center gap-2 p-1 transition-all duration-200 hover:bg-gray-100",
                currentFilter === option.value && "bg-gray-100",
              )}
            >
              {currentFilter === option.value && (
                <FaCheck className="text-blue-500" />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
