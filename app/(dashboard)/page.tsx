const mockData = [
  { keyword: "Next.js", content: "A React framework for building full-stack web applications with server-side rendering and static site generation." },
  { keyword: "React", content: "A JavaScript library for building user interfaces using component-based architecture." },
  { keyword: "Tailwind CSS", content: "A utility-first CSS framework for rapidly building custom user interfaces." },
  { keyword: "TypeScript", content: "A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale." },
  { keyword: "Prisma", content: "An open-source ORM for Node.js and TypeScript that simplifies database access." },
  { keyword: "Docker", content: "A platform for developing, shipping, and running applications inside lightweight containers." },
  { keyword: "PostgreSQL", content: "A powerful, open-source object-relational database system with a strong reputation for reliability." },
  { keyword: "GraphQL", content: "A query language for APIs and a runtime for executing those queries with your existing data." },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 p-6 lg:p-10 bg-slate-50 dark:bg-slate-950 min-h-full">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Browse and manage your keyword references.</p>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-48">Keyword</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Content</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockData.map((item, index) => (
                <tr
                  key={index}
                  className="group hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-lg">
                      {item.keyword}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-700 dark:text-slate-300">{mockData.length}</span> entries
          </p>
        </div>
      </div>
    </div>
  );
}
