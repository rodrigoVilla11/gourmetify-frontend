type Tab = {
    key: string;
    label: string;
  };
  
  type TabsProps = {
    tabs: Tab[];
    active: string;
    onChange: (key: string) => void;
  };
  
  export function Tabs({ tabs, active, onChange }: TabsProps) {
    return (
      <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              active === tab.key
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }
  