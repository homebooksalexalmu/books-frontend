"use client"

interface StatBoxProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: number;
}

interface AuthorCardProps {
  rank: number;
  name: string;
  count: number;
  color: string;
}

export const StatBox = ({ icon, label, value, trend }: StatBoxProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-neutral-200 p-6 hover:border-neutral-300 transition-all hover:shadow-md">
      {/* Gradiente de fondo sutil */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/50 to-secondary-100/50 rounded-full -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-500 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-neutral-900">{value}</p>
            {trend && (
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +{trend}%
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          <i className={`fa-solid ${icon} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

export const CategoryBar = ({ 
  name, 
  count
}: { 
  name: string; 
  count: number;
}) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-neutral-700">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-secondary-600">{count}</p>
      </div>
    </div>
  );
};

export const AuthorCard = ({ rank, name, count }: AuthorCardProps) => {
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex items-center gap-3 py-3">
      <span className="text-2xl">{medals[rank - 1]}</span>
      <div className="flex-1">
        <p className="font-semibold text-neutral-900 text-sm">{name}</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-primary-600">{count}</p>
      </div>
    </div>
  );
};
