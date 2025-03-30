type Props = {
    label: string;
    value: string;
    details?: Record<string, number>;
  };
  
  export function KPIBox({ label, value, details }: Props) {
    return (
      <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between">
        <h3 className="text-sm text-gray-600 font-medium">{label}</h3>
        {value && <p className="text-2xl font-bold text-primary">{value}</p>}
  
        {details && (
          <ul className="mt-3 space-y-1 text-sm text-gray-700">
            {Object.entries(details).map(([key, val]) => (
              <li key={key} className="flex justify-between">
                <span>{key}</span>
                <span className="font-semibold">${val}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  