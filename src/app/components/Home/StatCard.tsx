"use client"

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: "primary" | "secondary" | "success" | "warning";
  size?: "small" | "medium";
}

const colorClasses = {
  primary: "bg-primary-50 text-primary-600",
  secondary: "bg-secondary-50 text-secondary-600",
  success: "bg-green-50 text-green-600",
  warning: "bg-orange-50 text-orange-600",
};

const iconColorClasses = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  success: "text-green-600",
  warning: "text-orange-600",
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  color = "primary",
  size = "medium"
}: StatCardProps) => {
  const isSmall = size === "small";
  
  return (
    <div className={`${colorClasses[color]} rounded-lg p-4 ${isSmall ? 'md:col-span-1' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 mb-1">{label}</p>
          <p className={`font-bold ${isSmall ? 'text-2xl' : 'text-3xl'}`}>
            {value}
          </p>
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
          <i className={`fa-solid ${icon} ${iconColorClasses[color]} text-xl`}></i>
        </div>
      </div>
    </div>
  );
};

interface RankingItemProps {
  rank: number;
  name: string;
  count: number;
  icon: string;
  color: "primary" | "secondary" | "success" | "warning";
}

const RankingItem = ({ rank, name, count, icon, color }: RankingItemProps) => {
  const colors = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    success: "text-green-600",
    warning: "text-orange-600",
  };

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary-200 transition-colors">
      <div className="text-2xl">{medals[rank - 1]}</div>
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${colorClasses[color]}`}>
        <i className={`fa-solid ${icon} ${colors[color]}`}></i>
      </div>
      <div className="flex-1">
        <p className="font-medium text-neutral-900">{name}</p>
        <p className="text-sm text-neutral-500">{count} libros</p>
      </div>
    </div>
  );
};

export { StatCard, RankingItem };
