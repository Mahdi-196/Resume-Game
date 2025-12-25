import * as THREE from 'three';
import { RealisticBook, generateRealisticBook } from './RealisticBook';

/**
 * Art Deco Bookshelf - 1930s geometric style with chrome accents and stepped design
 * Features streamlined moderne aesthetic with metallic details
 */
export const ArtDecoBookshelf = ({
  position,
  rotation = [0, 0, 0],
  variant = 0
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
}) => {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // Art Deco color palette - bold, contrasting colors
  const bookColors = [
    "#1a1a2e", "#16213e", "#0f3460", // Deep blues
    "#8b0000", "#a52a2a", "#800020", // Rich reds
    "#1b4d3e", "#2d5016", "#3d550c", // Forest greens
    "#2c2c54", "#474787", "#341f97", // Purples
    "#000000", "#1c1c1c", "#2e2e2e", // Blacks
    "#8b6914", "#b8860b", "#daa520", // Golds
    "#4a1c1c", "#5c2e2e", "#6b3e3e", // Deep maroons
  ];

  const generateShelfBooks = (shelfIndex: number) => {
    const books = [];
    // 80% full: 18-26 books per shelf for realistic fullness
    const bookCount = 18 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 8);

    for (let i = 0; i < bookCount; i++) {
      const seed = variant * 1000 + shelfIndex * 100 + i;
      const config = generateRealisticBook(seed, bookColors, 'artdeco');

      // 15% chance of starting a new book group (spacing)
      const groupStart = seededRandom(seed + 85) > 0.85;

      books.push({ config, groupStart });
    }
    return books;
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Stepped base - Art Deco signature element */}
      <mesh position={[0, 0.08, -0.4]}>
        <boxGeometry args={[2.0, 0.16, 0.95]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, -0.4]}>
        <boxGeometry args={[1.9, 0.08, 0.88]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Chrome base trim */}
      <mesh position={[0, 0.26, -0.4]}>
        <boxGeometry args={[1.95, 0.025, 0.92]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.95}
          roughness={0.15}
          emissive="#404040"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Main frame - sleek vertical pillars */}
      <mesh position={[-0.88, 2.7, -0.4]}>
        <boxGeometry args={[0.12, 5.0, 0.85]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0.88, 2.7, -0.4]}>
        <boxGeometry args={[0.12, 5.0, 0.85]} />
        <meshStandardMaterial color="#2d2d2d" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Chrome vertical accents */}
      <mesh position={[-0.82, 2.7, 0.03]}>
        <boxGeometry args={[0.025, 4.9, 0.025]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.15} />
      </mesh>
      <mesh position={[0.82, 2.7, 0.03]}>
        <boxGeometry args={[0.025, 4.9, 0.025]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Back panel with geometric pattern */}
      <mesh position={[0, 2.7, -0.82]}>
        <boxGeometry args={[1.76, 5.0, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>

      {/* Geometric back pattern - vertical stripes */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <mesh key={`pattern-${i}`} position={[x, 2.7, -0.795]}>
          <boxGeometry args={[0.02, 4.9, 0.01]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.5} />
        </mesh>
      ))}

      {/* Stepped crown - signature Art Deco element */}
      <group position={[0, 5.25, -0.4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.85, 0.12, 0.88]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.7, 0.08, 0.8]} />
          <meshStandardMaterial color="#3d3d3d" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[1.55, 0.08, 0.72]} />
          <meshStandardMaterial color="#4d4d4d" roughness={0.4} metalness={0.4} />
        </mesh>

        {/* Chrome top accent */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.6, 0.02, 0.75]} />
          <meshStandardMaterial
            color="#c0c0c0"
            metalness={0.95}
            roughness={0.15}
            emissive="#404040"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* Shelves - clean lines with chrome edges */}
      {[1.0, 2.0, 3.0, 4.0, 5.0].map((y, i) => (
        <group key={`shelf-${i}`}>
          <mesh position={[0, y, -0.4]}>
            <boxGeometry args={[1.7, 0.05, 0.75]} />
            <meshStandardMaterial color="#2d2d2d" roughness={0.5} metalness={0.3} />
          </mesh>
          {/* Chrome shelf edge */}
          <mesh position={[0, y - 0.015, 0.015]}>
            <boxGeometry args={[1.7, 0.02, 0.02]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* Books on shelves */}
      {[1.0, 2.0, 3.0, 4.0, 5.0].map((shelfY, shelfIndex) => {
        const shelfBooks = generateShelfBooks(shelfIndex);
        let currentX = -0.78;

        return (
          <group key={`books-${shelfIndex}`}>
            {shelfBooks.map((book, bookIndex) => {
              if (currentX > 0.8) return null;

              // Add spacing for book groups
              if (book.groupStart && bookIndex > 0) {
                currentX += 0.05;
              }

              const xPos = currentX + book.config.thickness / 2;
              currentX += book.config.thickness + 0.006;

              const shelfTop = shelfY + 0.025;
              const bookCenterY = shelfTop + book.config.height / 2;

              return (
                <RealisticBook
                  key={`book-${shelfIndex}-${bookIndex}`}
                  config={book.config}
                  position={[xPos, bookCenterY, -0.3]}
                />
              );
            })}
          </group>
        );
      })}

      {/* Geometric corner ornaments */}
      {[
        [-0.88, 5.2, 0.02],
        [0.88, 5.2, 0.02],
        [-0.88, 0.3, 0.02],
        [0.88, 0.3, 0.02],
      ].map((pos, i) => (
        <group key={`ornament-${i}`} position={pos as [number, number, number]}>
          <mesh>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Vertical chrome strips on sides */}
      <mesh position={[-0.94, 2.7, 0.03]}>
        <boxGeometry args={[0.015, 5.0, 0.015]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.95}
          roughness={0.15}
          emissive="#404040"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh position={[0.94, 2.7, 0.03]}>
        <boxGeometry args={[0.015, 5.0, 0.015]} />
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.95}
          roughness={0.15}
          emissive="#404040"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};
