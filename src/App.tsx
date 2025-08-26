import { Toaster, toast } from 'sonner';

export default function App() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-6">
      <Toaster richColors position="top-right" />
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Skillruta Web</h1>
        <p className="text-gray-600">React + TS + Vite + Tailwind + Sonner</p>
        <button
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
          onClick={() => toast.success('Hola, Skillruta!')}
        >
          Probar toast
        </button>
      </div>
    </div>
  );
}
