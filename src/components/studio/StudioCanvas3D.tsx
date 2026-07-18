import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { StudioObject, Vec3, Col3 } from './types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function col3ToHex(c: Col3): string {
  const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function toColor(c?: Col3) {
  return c ? new THREE.Color(c.r, c.g, c.b) : new THREE.Color(0.6, 0.6, 0.6);
}

// ─── Individual Renderers ─────────────────────────────────────────────────────

interface ObjProps {
  obj: StudioObject;
  selected: boolean;
  onClick: () => void;
}

function GeometrySelector({ shape, size }: { shape?: string; size: Vec3 }) {
  if (shape === 'Sphere') {
    return <sphereGeometry args={[size.x / 2, 32, 32]} />;
  }
  if (shape === 'Cylinder') {
    return <cylinderGeometry args={[size.x / 2, size.z / 2, size.y, 32]} />;
  }
  if (shape === 'Wedge') {
    // Custom wedge shape using direct BufferGeometry or a box deformation, simplified box fallback
    return <boxGeometry args={[size.x, size.y, size.z]} />;
  }
  return <boxGeometry args={[size.x, size.y, size.z]} />;
}

function PartMesh({ obj, selected, onClick }: ObjProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const size = (obj.properties.Size as Vec3) ?? { x: 4, y: 1, z: 4 };
  const pos  = (obj.properties.Position as Vec3) ?? { x: 0, y: size.y / 2, z: 0 };
  const rot  = (obj.properties.Rotation as Vec3) ?? { x: 0, y: 0, z: 0 };
  const col  = toColor(obj.properties.Color as Col3 | undefined);
  const mat  = (obj.properties.Material as string) ?? 'SmoothPlastic';
  const trans = (obj.properties.Transparency as number) ?? 0;
  const shape = obj.properties.Shape;

  const isNeon = mat === 'Neon';
  const isGlass = mat === 'Glass';

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(pos.x, pos.y, pos.z);
      ref.current.rotation.set(
        (rot.x * Math.PI) / 180,
        (rot.y * Math.PI) / 180,
        (rot.z * Math.PI) / 180
      );
    }
  });

  return (
    <group>
      <mesh ref={ref} onClick={(e) => { e.stopPropagation(); onClick(); }} castShadow receiveShadow>
        <GeometrySelector shape={shape} size={size} />
        {isNeon ? (
          <meshStandardMaterial
            color={col}
            emissive={col}
            emissiveIntensity={obj.properties.GlowIntensity ?? 2}
            transparent={trans > 0}
            opacity={1 - trans}
          />
        ) : isGlass ? (
          <meshPhysicalMaterial
            color={col}
            transparent
            opacity={Math.max(0.1, 1 - trans - 0.4)}
            roughness={0}
            metalness={0.1}
            transmission={0.8}
            ior={1.5}
          />
        ) : (
          <meshStandardMaterial
            color={col}
            roughness={mat === 'Metal' ? 0.2 : 0.7}
            metalness={mat === 'Metal' ? 0.8 : 0.1}
            transparent={trans > 0}
            opacity={1 - trans}
          />
        )}
      </mesh>
      {selected && (
        <group position={[pos.x, pos.y, pos.z]} rotation={[(rot.x * Math.PI) / 180, (rot.y * Math.PI) / 180, (rot.z * Math.PI) / 180]}>
          <lineSegments>
            <edgesGeometry args={[
              shape === 'Sphere'
                ? new THREE.SphereGeometry(size.x / 2 + 0.05, 16, 16)
                : shape === 'Cylinder'
                ? new THREE.CylinderGeometry(size.x / 2 + 0.05, size.z / 2 + 0.05, size.y + 0.05, 16)
                : new THREE.BoxGeometry(size.x + 0.05, size.y + 0.05, size.z + 0.05)
            ]} />
            <lineBasicMaterial color="#ffcc00" linewidth={2} />
          </lineSegments>
        </group>
      )}
    </group>
  );
}

function SpawnMesh({ obj, selected, onClick }: ObjProps) {
  const size = (obj.properties.Size as Vec3) ?? { x: 6, y: 1, z: 6 };
  const pos  = (obj.properties.Position as Vec3) ?? { x: 0, y: 0.5, z: 0 };
  const col  = toColor(obj.properties.Color as Col3 | undefined);

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx2d = canvas.getContext('2d')!;
    ctx2d.fillStyle = col3ToHex((obj.properties.Color as Col3) ?? { r: 0.106, g: 0.165, b: 0.208 });
    ctx2d.fillRect(0, 0, 128, 128);
    ctx2d.fillStyle = '#ffffff22';
    ctx2d.fillRect(0, 0, 64, 64);
    ctx2d.fillRect(64, 64, 64, 64);
    // Draw spawn logo 'R'
    ctx2d.fillStyle = '#ffffff';
    ctx2d.font = 'bold 48px monospace';
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';
    ctx2d.fillText('R', 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    return tex;
  }, [obj.properties.Color]);

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <mesh onClick={(e) => { e.stopPropagation(); onClick(); }} castShadow receiveShadow>
        <boxGeometry args={[size.x, size.y, size.z]} />
        <meshStandardMaterial color={col} map={texture} roughness={0.4} />
      </mesh>
      {/* Dynamic particles above spawn */}
      <Sparkles position={[0, size.y / 2 + 1, 0]} count={6} scale={size.x * 0.8} size={2} speed={0.5} color="#00ffcc" />
      <mesh position={[0, size.y / 2 + 0.6, 0]}>
        <coneGeometry args={[0.4, 0.8, 16]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={1} />
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
        <meshStandardMaterial color={col} roughness={0.5} />
      </mesh>
      {/* Head */}
      <mesh position={[0, bodyH + 1.2 + headR * 1.2, 0]} castShadow>
        <boxGeometry args={[1.1, 1.1, 1.1]} />
        <meshStandardMaterial color={col} roughness={0.5} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.22, bodyH + 1.4 + headR * 1.2, 0.56]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.22, bodyH + 1.4 + headR * 1.2, 0.56]}>
        <boxGeometry args={[0.22, 0.18, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Arms */}
      <mesh position={[bodyW / 2 + 0.4, bodyH / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, bodyH * 0.9, 0.6]} />
        <meshStandardMaterial color={col} roughness={0.5} />
      </mesh>
      <mesh position={[-(bodyW / 2 + 0.4), bodyH / 2 + 1.2, 0]} castShadow>
        <boxGeometry args={[0.6, bodyH * 0.9, 0.6]} />
        <meshStandardMaterial color={col} roughness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[0.4, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color={col} roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color={col} roughness={0.5} />
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
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={col} emissive={col} emissiveIntensity={3} />
      </mesh>
      <Sparkles count={5} scale={1.2} size={1.5} speed={0.4} color={col} />
      {selected && (
        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color="#ffcc00" wireframe />
        </mesh>
      )}
    </group>
  );
}

function Baseplate() {
  const gridTexture = useMemo(() => {
    // Generate Classic Lego/Roblox grid Baseplate style
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#6b9e6b';
    ctx.fillRect(0, 0, 128, 128);
    // Darker borders
    ctx.strokeStyle = '#5a8d5a';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 128, 128);
    // Small studs
    ctx.fillStyle = '#7cae7c';
    ctx.beginPath();
    ctx.arc(32, 32, 10, 0, Math.PI * 2);
    ctx.arc(96, 32, 10, 0, Math.PI * 2);
    ctx.arc(32, 96, 10, 0, Math.PI * 2);
    ctx.arc(96, 96, 10, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(128, 128);
    return tex;
  }, []);

  return (
    <mesh receiveShadow position={[0, -0.5, 0]}>
      <boxGeometry args={[512, 1, 512]} />
      <meshStandardMaterial map={gridTexture} roughness={0.6} metalness={0.1} />
    </mesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

interface SceneProps {
  objects: Map<string, StudioObject>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  timeOfDay: number; // 0 to 24 hours scale
}

function Scene({ objects, selectedId, onSelect, timeOfDay }: SceneProps) {
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

  // Lighting parameters derived from Time of Day
  const { ambientIntensity, sunColor, sunIntensity, sunPosition, fogColor, skyColor } = useMemo(() => {
    const isNight = timeOfDay < 6 || timeOfDay > 18;
    let ratio = 1;
    if (timeOfDay >= 6 && timeOfDay <= 12) ratio = (timeOfDay - 6) / 6;
    else if (timeOfDay > 12 && timeOfDay <= 18) ratio = 1 - (timeOfDay - 12) / 6;
    else ratio = 0; // complete night

    return {
      ambientIntensity: 0.15 + ratio * 0.5,
      sunColor: isNight ? '#5566aa' : '#fff8ee',
      sunIntensity: isNight ? 0.3 : 1.5,
      sunPosition: [
        50 * Math.cos((timeOfDay / 24) * Math.PI * 2),
        80 * Math.sin((timeOfDay / 24) * Math.PI * 2),
        30,
      ] as [number, number, number],
      fogColor: isNight ? '#050510' : '#87ceeb',
      skyColor: isNight ? '#050515' : '#87ceeb',
    };
  }, [timeOfDay]);

  return (
    <>
      {/* Sky color matches time of day */}
      <color attach="background" args={[skyColor]} />
      {/* Fog effect */}
      <fog attach="fog" args={[fogColor, 100, 350]} />

      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={sunPosition}
        color={sunColor}
        intensity={sunIntensity}
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

      {/* Hemisphere sky light */}
      <hemisphereLight args={[skyColor, '#4b7e4b', 0.4]} />

      {/* Ground Baseplate */}
      <Baseplate />

      {/* Grid overlay */}
      <Grid
        position={[0, 0.02, 0]}
        args={[100, 100]}
        cellSize={4}
        cellThickness={0.5}
        cellColor="#666"
        sectionSize={20}
        sectionThickness={1}
        sectionColor="#888"
        fadeDistance={200}
        fadeStrength={1}
        followCamera={false}
      />

      {/* Sparks during night / general environment dust */}
      <Sparkles count={timeOfDay < 6 || timeOfDay > 18 ? 100 : 30} position={[0, 15, 0]} scale={80} size={1.2} speed={0.4} color="#ffffff" />

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

// ─── Public Component ─────────────────────────────────────────────────────────

interface Props {
  objects: Map<string, StudioObject>;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  isRunning: boolean;
  timeOfDay?: number; // 0 to 24 hours
}

export function StudioCanvas3D({ objects, selectedId, onSelect, isRunning, timeOfDay = 12 }: Props) {
  return (
    <div className="relative w-full h-full bg-[#87ceeb]">
      <Canvas
        camera={{ position: [35, 25, 35], fov: 60, near: 0.1, far: 1000 }}
        shadows
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene objects={objects} selectedId={selectedId} onSelect={onSelect} timeOfDay={timeOfDay} />
      </Canvas>

      {/* Run mode indicator */}
      {isRunning && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-600/90 text-white font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          GAME RUNNING
        </div>
      )}

      {/* Time of Day HUD Overlay */}
      <div className="absolute top-2 right-2 bg-black/60 border border-white/10 px-3 py-1.5 rounded font-mono text-[9px] text-white/80 uppercase tracking-wider select-none">
        🕒 Time: {String(Math.floor(timeOfDay)).padStart(2, '0')}:00 {timeOfDay >= 12 ? 'PM' : 'AM'}
      </div>

      {/* Coords hint */}
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-white/50 pointer-events-none drop-shadow">
        Left-click select · Orbit drag · Scroll zoom
      </div>
    </div>
  );
}
