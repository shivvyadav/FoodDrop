export default function StatCard({ title, value, icon: Icon, gradient }: any) {
  return (
    <div
      className={`relative flex h-24 flex-col justify-between overflow-hidden rounded-2xl p-4 text-white ${gradient}`}
    >
      <Icon className="absolute top-4 right-4 size-10 opacity-30" />
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="text-2xl font-semibold"> {value}</p>
    </div>
  );
}
