import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

interface OfficeRoomProps {
  onMapClick?: () => void;
}

// Complete Detective Office Room with wood paneling and bookshelves
export const OfficeRoom = ({ onMapClick }: OfficeRoomProps) => {
  // Load Sherlock Holmes map texture with anisotropic filtering
  const mapTexture = useLoader(THREE.TextureLoader, '/map.png');
  mapTexture.anisotropy = 16;

  return (
    <group>
      {/* Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8b4513" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Back Wall (North) - Dark wood paneling with window cutout - 10% shorter */}
      {/* Left section of back wall (narrow strip) */}
      <mesh position={[-8.8, 4.5, -10]}>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Right section of back wall (narrow strip) */}
      <mesh position={[8.8, 4.5, -10]}>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Top section above window - positioned higher to not cut off window */}
      <mesh position={[0, 7.85, -10]}>
        <planeGeometry args={[15.6, 2.3]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Front Wall (South) - Wood paneling - 10% shorter */}
      <mesh position={[0, 4.5, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Left Wall (West) - Wood paneling - 10% shorter */}
      <mesh position={[-10, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Right Wall (East) - Wood paneling - 10% shorter */}
      <mesh position={[10, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#2a1810" roughness={0.6} />
      </mesh>

      {/* Sherlock Holmes Map of Europe - Framed on Right Wall */}
      {/* Dark wooden frame */}
      <mesh position={[9.9, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 2.6]} />
        <meshStandardMaterial color="#1a0d00" roughness={0.4} />
      </mesh>
      {/* Map - Interactive */}
      <mesh
        position={[9.85, 3, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onMapClick?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[3, 2.4]} />
        <meshStandardMaterial
          map={mapTexture}
          roughness={0.5}
          side={THREE.DoubleSide}
          emissive="#d4c5a0"
          emissiveIntensity={0.05}
        />
      </mesh>


      {/* Ceiling with wooden beams - 10% lower */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 9, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1006" roughness={0.8} />
      </mesh>

      {/* Wooden ceiling beams - 10% lower */}
      {[-6, -2, 2, 6].map((z, i) => (
        <mesh key={i} position={[0, 8.8, z]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 20, 0.3]} />
          <meshStandardMaterial color="#654321" roughness={0.7} />
        </mesh>
      ))}

      {/* EXTERIOR ENVIRONMENT - Creates boundary around office */}

      {/* Extended ground plane - larger than room */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#1a1410"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Exterior back wall - behind the office */}
      <mesh position={[0, 4.5, -15]} receiveShadow>
        <planeGeometry args={[60, 15]} />
        <meshStandardMaterial
          color="#0d0a08"
          roughness={0.8}
        />
      </mesh>

      {/* Exterior left wall */}
      <mesh position={[-15, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 15]} />
        <meshStandardMaterial
          color="#0d0a08"
          roughness={0.8}
        />
      </mesh>

      {/* Exterior right wall */}
      <mesh position={[15, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 15]} />
        <meshStandardMaterial
          color="#0d0a08"
          roughness={0.8}
        />
      </mesh>

      {/* Exterior front wall - in front of the office */}
      <mesh position={[0, 4.5, 15]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[60, 15]} />
        <meshStandardMaterial
          color="#0d0a08"
          roughness={0.8}
        />
      </mesh>

      {/* Exterior ceiling - top */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 15, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#0a0806"
          roughness={0.9}
        />
      </mesh>
    </group>
  );
};