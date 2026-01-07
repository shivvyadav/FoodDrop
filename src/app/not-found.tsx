import GoBackButton from '@/components/GoBackButton';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-4xl font-bold">Not Found</h2>
      <p className="text-lg">Could not find requested resource</p>

      <div className="bg-info border-border mt-4 rounded-xl border px-4 py-2 text-white">
        <GoBackButton />
      </div>
    </div>
  );
}
