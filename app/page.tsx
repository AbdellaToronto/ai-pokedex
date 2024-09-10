import { PokemonComponent } from "@/components/pokemon-component";

export const maxDuration = 60;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between h-screen">
      <PokemonComponent />
    </main>
  );
}
