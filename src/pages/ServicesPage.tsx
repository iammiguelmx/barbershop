import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Elige tu servicio</h1>

      <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {services.map(s => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </section>
    </main>
  );
}
