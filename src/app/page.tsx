"use client"
import { StatBox, CategoryBar, AuthorCard } from "./components/Home/DashboardCards";

export default function Home() {
  const stats = {
    totalBooks: 42,
    pendingBooks: 7,
    completedThisMonth: 3,
    totalPages: 12453,
    topCategories: [
      { name: "Ficción Científica", count: 12, total: 42 },
      { name: "Misterio", count: 9, total: 42 },
      { name: "Novela Contemporánea", count: 8, total: 42 },
    ],
    topAuthors: [
      { name: "Isaac Asimov", count: 5, color: "blue" },
      { name: "Agatha Christie", count: 4, color: "amber" },
      { name: "Stephen King", count: 3, color: "green" },
    ],
  };

  return (
    <main className="w-full min-h-[calc(100vh-120px)] bg-gradient-to-b from-neutral-50 via-neutral-50 to-white py-4 px-4 md:px-6 pt-6">
      {/* Header con gradiente */}
      <div className="mb-3">
        <div className="flex items-baseline gap-3 mb-2">
          <h1 className="text-4xl font-bold text-neutral-900">Mi Biblioteca</h1>
        </div>
        <p className="text-neutral-600">Tu colección de libros en un vistazo</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        <StatBox
          icon="fa-book"
          label="Total de Libros"
          value={stats.totalBooks}
          trend={15}
        />
        <StatBox
          icon="fa-hourglass-half"
          label="Por Leer"
          value={stats.pendingBooks}
        />
        <StatBox
          icon="fa-check-circle"
          label="Este Mes"
          value={stats.completedThisMonth}
        />
        <StatBox
          icon="fa-scroll"
          label="Total Páginas"
          value={`${(stats.totalPages / 1000).toFixed(1)}k`}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Top Categorías - Takes 2 columns on large screens */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-row items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-neutral-900">Top Categorías</h2>
          </div>
          <div className="space-y-6">
            {stats.topCategories.map((category) => (
              <CategoryBar
                key={category.name}
                name={category.name}
                count={category.count}
              />
            ))}
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <i className="fa-solid fa-lightning-bolt"></i>
            Resumen
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <span className="text-white/90">Promedio por libro</span>
              <span className="font-bold text-lg">{(stats.totalPages / stats.totalBooks).toFixed(0)} págs</span>
            </div>
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <span className="text-white/90">Libros por mes</span>
              <span className="font-bold text-lg">{(stats.totalBooks / 12).toFixed(1)}</span>
            </div>
            <div className="pt-2">
              <p className="text-sm text-white/80">Sigue leyendo y mejora tu ranking 📚</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Autores */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-20 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Autores Favoritos</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.topAuthors.map((author, index) => (
            <AuthorCard
              key={author.name}
              rank={index + 1}
              name={author.name}
              count={author.count}
              color={author.color}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
