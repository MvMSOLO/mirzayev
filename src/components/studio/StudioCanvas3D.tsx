import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { StudioObject, Vec3, Col3 } from './types';

// ─── helpers ─────────────────────────────────────────────────────────────────

function col3ToHex(c: Col3): string {
  const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function toColor(c?: Col3) {
  return c ? new THREE.Color(c.r, c.g, c.b) : new THREE.Color(0.6, 0.6, 0.6);
}

// ─── individual renderers ─────────────────────────────────────────────────────

interface ObjProps {
  obj: StudioObject;
  selected: boolean;
  onClick: () => void;
}

function PartMesh({ obj, selected, onClick }: ObjProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const size = (obj.properties.Size as Vec3) ?? { x: 4, y: 1, z: 4 };
  const pos  = (obj.properties.Position as Vec3) ?? { x: 0, y: size.y / 2, z: 0 };
  const rot  = (obj.properties.Rotation as Vec3) ?? { x: 0, y: 0, z: 0 };
  const col  = toColor(obj.properties.Color as Col3 | undefined);
  const mat  = (obj.properties.Material as string) ?? 'SmoothPlastic';
  const trans = (obj.properties.Transparency as number) ?? 0;

  const isNeon = mat === 'Neon';
  const isGlass = mat === 'Glass';

  return (
    <group position={[pos.x, pos.y, pos.z]} rotation={[rot.x * Math.PI / 180, rot.y * Math.PI / 180, rot.z * Math.PI / 180]}>
      <mesh ref={ref} onClick={(e) => { e.stopPropagation(); onClick(); }} castShadow receiveShadow>
        <boxGeometry args={[size.x, size.y, size.z]} />
        {isNeon
          ? <meshStandardMaterial color={col} emissive={col} emissiveIntensity={2} transparent={trans > 0} opacity={1 - trans} />
          : isGlass
          ? <meshPhysicalMaterial color={col} transparent opacity={Math.max(0.1, 1 - trans - 0.4)} roughness={0} metalness={0} transmission={0.6} />
          : <meshLambertMaterial color={col} transparent={trans > 0} opacity={1 - trans} />
        }
      </mesh>
      {selected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size.x + 0.05, size.y + 0.05, size.z + 0.05)]} />
          <lineBasicMaterial color="#ffcc00" linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
}

function SpawnMesh({ obj, selected, onClick }: ObjProps) {
  const size = (obj.properties.Size as Vec3) ?? { x: 6, y: 1, z: 6 };
  const pos  = (obj.properties.Position as Vec3) ?? { x: 0, y: 0.5, z: 0 };
  const col  = toColor(obj.properties.Color as Col3 | undefined);

  // Checkerboard texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 64;
    const ctx2d = canvas.getContext('2d')!;
    ctx2d.fillStyle = col3ToHex((obj.properties.Color as Col3) ?? { r: 0.106, g: 0.165, b: 0.208 });
    ctx2d.fillRect(0, 0, 64, 64);
    ctx2d.fillStyle = '#ffffff22';
    ctx2d.fillRect(0, 0, 32, 32); ctx2d.fillRect(32, 32, 32, 32);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    return tex;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj.properties.Color]);

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(); }} castShadow receiveShadow>
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshLambertMaterial color={col} map={texture} />
      </mesh>
      {/* Spawn arrow indicator */}
      <mesh position={[0, size.y / 2 + 0.6, 0]}>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshLambertMaterial color="#00ff88" />
      </mesh>
      {selected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(size.x + 0.05, size.y + 0.05, size.z + 0.05)]} />
          <lineBasicMaterial color="#ffcc00" />
        </lineSegments>
      )}
    </group>
  );
}

function NPCMesh({ obj, selected, onClick }: ObjProps) {
  const pos = (obj.properties.Position as Vec3) ?? { x: 0, y: 0, z: 0 };
  const col = toColor(obj.properties.Color as Col3 | undefined);
  const bodyH = 3; const bodyW = 1.4; const headR = 0.6;

  return (
    <group position={[pos.x, pos.y, pos.z]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Torso */}
      <mesh position={[0, bodyH / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[bodyW, bodyH, 0.8]} />
        <meshLambertMaterial color={col} />
      </mesh>
      {/* Head */}
      <mesh position={[0, bodyH + 1.2 + headR * 1.2, 0]} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshLambertMaterial color={col} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.22, bodyH + 1.4 + headR * 1.2, 0.56]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshLambertMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.22, bodyH + 1.4 + headR * 1.2, 0.56]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshLambertMaterial color="#1a1a2e" />
      </mesh>
      {/* Arms */}
      <mesh position={[bodyW / 2 + 0.4, bodyH / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, bodyH * 0.9, 0.6]} />
        <meshLambertMaterial color={col} />
      </mesh>
      <mesh position={[-(bodyW / 2 + 0.4), bodyH / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, bodyH * 0.9, 0.6]} />
        <meshLambertMaterial color={col} />
      </mesh>
      {/* Legs */}
      <mesh position={[0.4, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshLambertMaterial color={col} />
      </mesh>
      <mesh position={[-0.4, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshLambertMaterial color={col} />
      </mesh>
      {selected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(bodyW + 1.5, bodyH + 2.5, bodyW + 0.8)]} />
          <lineBasicMaterial color="#ffcc00" />
        </lineSegments>
      )}
    </group>
  );
}

function PointLightObj({ obj, selected, onClick }: ObjProps) {
  const pos = (obj.properties.Position as Vec3) ?? { x: 0, y: 8, z: 0 };
  const col = toColor(obj.properties.Color as Col3 | undefined);
  const brightness = (obj.properties.Brightness as number) ?? 5;
  const range = (obj.properties.Range as number) ?? 16;

  return (
    <group position={[pos.x, pos.y, pos.z]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <pointLight color={col} intensity={brightness} distance={range} castShadow />
      <mesh>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={col} emissive={col} emissiveIntensity={3} />
      </mesh>
      {selected && (
        <mesh>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color="#ffcc00" wireframe />
        </mesh>
      )}
    </group>
  );
}

function Baseplate() {
  return (
    <mesh receiveShadow position={[0, -0.5, 0]}>
      <boxGeometry args={[512, 1, 512]} />
      <meshLambertMaterial color="#6b9e6b" />
    </mesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

interface SceneProps {
  objects: Map<string, StudioObject>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function Scene({ objects, selectedId, onSelect }: SceneProps) {
  const { gl } = useThree();

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  const visibleObjects = useMemo(() => {
    return Array.from(objects.values()).filter(
      o => !['Workspace', 'Lighting', 'ReplicatedStorage', 'StarterGui',
             'StarterPack', 'SoundService', 'Teams', 'Players',
             'Script', 'LocalScript', 'ModuleScript', 'Folder'].includes(o.type)
    );
  }, [objects]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[50, 80, 30]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <hemisphereLight args={['#87ceeb', '#6b9e6b', 0.4]} />

      {/* Ground */}
      <Baseplate />

      {/* Grid overlay */}
      <Grid
        position={[0, 0.02, 0]}
        args={[100, 100]}
        cellSize={4}
        cellThickness={0.5}
        cellColor="#555"
        sectionSize={20}
        sectionThickness={1}
        sectionColor="#777"
        fadeDistance={200}
        fadeStrength={1}
        followCamera={false}
      />

      {/* Studio objects */}
      {visibleObjects.map(obj => {
        const props: ObjProps = {
          obj,
          selected: obj.id === selectedId,
          onClick: () => onSelect(obj.id),
        };
        switch (obj.type) {
          case 'SpawnLocation': return <SpawnMesh key={obj.id} {...props} />;
          case 'NPCModel':      return <NPCMesh   key={obj.id} {...props} />;
          case 'PointLight':    return <PointLightObj key={obj.id} {...props} />;
          default:              return <PartMesh  key={obj.id} {...props} />;
        }
      })}

      {/* Click background to deselect */}
      <mesh
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={() => onSelect(null)}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <OrbitControls makeDefault dampingFactor={0.08} enableDamping />
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface Props {
  objects: Map<string, StudioObject>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  isRunning: boolean;
}

export function StudioCanvas3D({ objects, selectedId, onSelect, isRunning }: Props) {
  return (
    <div className="relative w-full h-full bg-[#87ceeb]">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#87ceeb] to-[#c9e8ff] pointer-events-none" />

      <Canvas
        camera={{ position: [28, 22, 28], fov: 60, near: 0.1, far: 1000 }}
        shadows
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene objects={objects} selectedId={selectedId} onSelect={onSelect} />
      </Canvas>

      {/* Run mode indicator */}
      {isRunning && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-600/90 text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          GAME RUNNING
        </div>
      )}

      {/* Coords hint */}
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-black/30 pointer-events-none">
        Left-click select · Orbit drag · Scroll zoom
      </div>
    </div>
  );
}
