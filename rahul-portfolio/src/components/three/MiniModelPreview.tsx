'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { AlertCircle, RefreshCw } from 'lucide-react';

/* ─────────────────────────────────────────────
   Inner scene rendered inside the mini canvas
 ───────────────────────────────────────────── */
function MiniScene({ modelPath, onError }: { modelPath: string; onError?: (error: Error) => void }) {
  let gltf;
  try {
    gltf = useGLTF(modelPath);
  } catch (error) {
    onError?.(error as Error);
    throw error; // Let Suspense/Error Boundary handle it
  }
  const clonedScene = useMemo(() => gltf?.scene?.clone(), [gltf?.scene]);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Handle missing scene
  if (!clonedScene) {
    return (
      <group>
        <ambientLight intensity={0.9} />
        <directionalLight position={[8, 12, 8]} intensity={1.4} />
        <directionalLight position={[-8, 8, -8]} intensity={0.6} />
        <directionalLight position={[0, -4, 4]} intensity={0.25} />
        <Environment preset="studio" background={false} />
      </group>
    );
  }

  useEffect(() => {
    if (!clonedScene) return;

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Centre the model at the origin
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -box.min.y;
    clonedScene.position.z = -center.z;

    // Frame it in camera view
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const dist = (maxDim / (2 * Math.tan(fov / 2))) * 1.55;

    camera.position.set(dist * 0.75, dist * 0.55, dist);
    camera.lookAt(0, size.y * 0.35, 0);

    // Ensure materials render properly
    const isHome = modelPath.toLowerCase().includes('home');
    clonedScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (isHome) {
          if (!child.material || child.material.color?.getHex() === 0xffffff) {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xd4d8e0,
              roughness: 0.65,
              metalness: 0.08,
            });
          }
        }
      }
    });
  }, [clonedScene, camera, modelPath]);

  // Slow continuous turntable
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[8, 12, 8]} intensity={1.4} />
      <directionalLight position={[-8, 8, -8]} intensity={0.6} />
      <directionalLight position={[0, -4, 4]} intensity={0.25} />
      <Environment preset="studio" background={false} />

      <group ref={groupRef}>
        <primitive object={clonedScene} />
      </group>
    </>
  );
}

/* ─────────────────────────────────────────────
   Skeleton placeholder shown while loading
 ───────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg pointer-events-none gap-2">
      <div className="w-8 h-8 border-2 border-accent/50 border-t-accent rounded-full animate-spin" />
      <span className="text-[10px] font-mono text-text-subtle tracking-wider">Loading Model…</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Public component – drop into any card
 ───────────────────────────────────────────── */
interface MiniModelPreviewProps {
  modelPath: string;
  className?: string;
}

export function MiniModelPreview({ modelPath, className = '' }: MiniModelPreviewProps) {
  const [modelError, setModelError] = useState<string | null>(null);

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {modelError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-sm z-20 pointer-events-none p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <span className="text-xs font-medium text-red-400 mb-1">Failed to Load</span>
          <span className="text-[10px] text-text-subtle font-mono max-w-xs truncate block mb-2">{modelPath}</span>
          <button 
            onClick={() => setModelError(null)}
            className="text-[10px] font-mono text-accent hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Retry
          </button>
        </div>
      )}

      <Suspense fallback={<LoadingSkeleton />}>
        <Canvas
          camera={{ fov: 45, near: 0.01, far: 2000 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'default',
            stencil: false,
            depth: true,
          }}
          style={{ display: 'block', width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.setClearColor(0x0a0a0b, 1);
          }}
        >
          <Suspense fallback={null}>
            <MiniScene 
              modelPath={modelPath} 
              onError={(error) => setModelError(error.message || 'Failed to load model')} 
            />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}