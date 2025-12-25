import { RealisticBook, generateRealisticBook } from './RealisticBook';

// Bookshelf Component - Realistic library style with varied books
export const Bookshelf = ({ position, rotation = [0, 0, 0], variant = 0 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: number;
}) => {
  // Seeded random function for consistent results
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const bookColors = [
    "#8b0000", "#2e8b57", "#4b0082", "#800080", "#008b8b", "#b8860b", 
    "#8b4513", "#2f4f4f", "#556b2f", "#8b008b", "#ff8c00", "#9932cc",
    "#dc143c", "#228b22", "#191970", "#8fbc8f", "#cd853f", "#4682b4",
    "#d2691e", "#8fbc8f", "#9acd32", "#20b2aa", "#87ceeb", "#dda0dd"
  ];

  // Generate consistent book layout for each shelf based on variant
  // 80% full: 18-26 books per shelf for realistic fullness
  const generateShelfBooks = (shelfIndex: number) => {
    const books = [];
    const bookCount = 18 + Math.floor(seededRandom(variant * 100 + shelfIndex * 10) * 8); // 18-26 books per shelf

    for (let i = 0; i < bookCount; i++) {
      const seed = variant * 1000 + shelfIndex * 100 + i;
      const config = generateRealisticBook(seed, bookColors, 'standard');
      books.push(config);
    }
    return books;
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Bookshelf frame - more realistic proportions */}
      <mesh position={[0, 2.5, -0.8]}>
        <boxGeometry args={[1.8, 5, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-0.85, 2.5, -0.4]}>
        <boxGeometry args={[0.1, 5, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      <mesh position={[0.85, 2.5, -0.4]}>
        <boxGeometry args={[0.1, 5, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Top and bottom */}
      <mesh position={[0, 4.9, -0.4]}>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.1, -0.4]}>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>
      
      {/* Shelves - 5 shelves with proper spacing */}
      {[0.8, 1.6, 2.4, 3.2, 4.0].map((y, i) => (
        <mesh key={`shelf-${i}`} position={[0, y, -0.4]}>
          <boxGeometry args={[1.7, 0.05, 0.75]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
      ))}
      
      {/* Books on each shelf - positioned directly on shelf tops */}
      {[0.8, 1.6, 2.4, 3.2, 4.0].map((shelfY, shelfIndex) => {
        const shelfBooks = generateShelfBooks(shelfIndex);
        let currentX = -0.75; // Start from left

        return (
          <group key={`books-${shelfIndex}`}>
            {shelfBooks.map((book, bookIndex) => {
              // Pack books tightly with very small gaps
              const xPos = currentX + book.thickness/2;
              currentX += book.thickness + 0.005; // Very small gap between books

              // Stop if we've filled the shelf, but allow more books
              if (currentX > 0.8) return null;

              // Clamp book height to stay within shelf compartment (0.8 units between shelves)
              const maxHeight = 0.5;
              const clampedHeight = Math.min(book.height, maxHeight);

              // Position book so bottom sits ON the shelf top surface
              const shelfTop = shelfY + 0.025;
              const bookCenterY = shelfTop + clampedHeight/2;

              return (
                <RealisticBook
                  key={`book-${shelfIndex}-${bookIndex}`}
                  config={{
                    ...book,
                    height: clampedHeight // Use clamped height
                  }}
                  position={[xPos, bookCenterY, -0.2]}
                />
              );
            })}

          </group>
        );
      })}

      {/* Add some shelf decorations based on variant */}
      {variant % 3 === 0 && (
        <mesh position={[0.6, 3.7, -0.65]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1]} />
          <meshStandardMaterial color="#8b7355" metalness={0.6} roughness={0.4} />
        </mesh>
      )}
      
      {variant % 4 === 1 && (
        <mesh position={[-0.5, 4.9, -0.6]}>
          <sphereGeometry args={[0.03]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
        </mesh>
      )}

      {variant % 5 === 2 && (
        <mesh position={[0.3, 2.5, -0.6]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08]} />
          <meshStandardMaterial color="#8b4513" roughness={0.9} />
        </mesh>
      )}
    </group>
  );
};