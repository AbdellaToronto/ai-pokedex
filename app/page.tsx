import { PokemonComponent } from "@/components/pokemon-component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <PokemonComponent />
    </main>
  );
}
