'use client';

import { useEffect, useState, Suspense, useRef, useMemo, Component } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  useGLTF,
  useProgress
} from '@react-three/drei';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, Eye, Box, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { Heading, Text, Button } from '../../components/ui';

// Error Boundary for 3D model loading
class ModelErrorBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loading fallback for Suspense
function ModelLoadingFallback({ modelPath }: { modelPath: string }) {
  const isLargeModel = modelPath.includes('building');
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-10 pointer-events-none p-6 text-center">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-sm text-white font-semibold tracking-wide">
        Loading 3D Model... 
      </span>
      <span className="text-xs text-zinc-500 mt-2 font-mono max-w-xs truncate block">
        {modelPath}
      </span>
      {isLargeModel && (
        <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/50 rounded-lg max-w-md text-center animate-pulse">
          <span className="text-xs text-amber-300 font-mono">
            Large model (192MB) - may take longer to load
          </span>
        </div>
      )}
    </div>
  );
}

// Error fallback for Error Boundary
interface ModelErrorFallbackProps {
  modelPath: string;
  onRetry: () => void;
}

function ModelErrorFallback({ modelPath, onRetry }: ModelErrorFallbackProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/30 border-2 border-red-500/50 z-20 pointer-events-none p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center mb-4 animate-pulse">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      <Heading as="h3" size="h4" weight="bold" animate={false} className="mb-2 text-red-300">
        Failed to Load Model
      </Heading>
      <Text size="sm" color="muted" className="max-w-md mb-4 text-white/80">
        The 3D model file could not be loaded. It may be missing, corrupted, or too large.
      </Text>
      <Text size="xs" color="muted" className="font-mono bg-red-900/50 px-3 py-2 rounded mb-4 max-w-xs truncate block text-red-200">
        {modelPath}
      </Text>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="secondary" 
          size="sm" 
          className="gap-2 w-full sm:w-auto"
          onClick={onRetry}
        >
          <RefreshCw className="w-4 h-4" />
          Retry Load
        </Button>
        <Button 
          variant="secondary" 
          size="sm" 
          className="gap-2 w-full sm:w-auto"
          onClick={() => window.open(modelPath, '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
          Open Directly
        </Button>
      </div>
    </div>
  );
}

interface ModelViewerProps {
  modelPath: string;
  showWireframe?: boolean;
  autoRotate?: boolean;
  enableControls?: boolean;
  className?: string;
  cameraPosition?: [number, number, number];
  environment?: 'studio' | 'city' | 'apartment' | 'sunset' | 'dawn' | 'night';
  onLoad?: () => void;
  showControls?: boolean;
  projectName?: string;
  category?: string;
  software?: string[];
}

export function ModelViewer({ 
  modelPath, 
  showWireframe = false, 
  autoRotate = false, 
  enableControls = true,
  className = '',
  cameraPosition = [0, 1, 5],
  onLoad,
  showControls = true,
  projectName,
  category,
  software = []
}: ModelViewerProps) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(autoRotate);
  const [showWireframeEnabled, setShowWireframeEnabled] = useState(showWireframe);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [minDistance, setMinDistance] = useState(0.5);
  const [maxDistance, setMaxDistance] = useState(100);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);
  const { active: progressActive, progress } = useProgress();

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLoad = () => {
    setModelLoaded(true);
    setModelError(null);
    onLoad?.();
  };

  const handleError = (error: Error) => {
    setModelError(error.message || 'Failed to load 3D model');
    setModelLoaded(false);
  };

  const handleZoom = (delta: number) => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const camera = controls.object as THREE.PerspectiveCamera;
    if (!camera) return;

    const target = controls.target;
    const direction = new THREE.Vector3().subVectors(camera.position, target);
    const length = direction.length();
    
    const factor = delta > 0 ? 0.8 : 1.25;
    const newLength = THREE.MathUtils.clamp(length * factor, controls.minDistance || 0.5, controls.maxDistance || 50);
    
    direction.normalize().multiplyScalar(newLength);
    camera.position.copy(target).add(direction);
    controls.update();

    setZoomLevel(Math.round((5 / newLength) * 100));
  };

  const handleResetCamera = () => {
    if (!controlsRef.current) return;
    controlsRef.current.reset();
    setZoomLevel(100);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full bg-black rounded-2xl overflow-hidden select-none ${className}`}
      onDoubleClick={handleResetCamera}
    >
      {/* Top Header Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 flex-wrap pointer-events-none">
        {projectName && (
          <div className="bg-bg/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-border/60 shadow-lg">
            <span className="text-sm font-semibold text-text tracking-wide">{projectName}</span>
          </div>
        )}
        {category && (
          <div className="bg-accent/15 backdrop-blur-md px-3 py-1.5 rounded-xl border border-accent/25">
            <span className="text-xs font-medium text-accent uppercase tracking-wider">{category}</span>
          </div>
        )}
        {software.length > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 bg-bg-elevated/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/40">
            <Box className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-text-muted">{software.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* Top Right Quick Controls */}
      {showControls && enableControls && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-bg/90 backdrop-blur-md p-1.5 rounded-xl border border-border/60 shadow-lg">
          <button
            onClick={() => handleZoom(1)}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors cursor-pointer"
            title="Zoom In (+)"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-text-subtle px-1 min-w-[3rem] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => handleZoom(-1)}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors cursor-pointer"
            title="Zoom Out (-)"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-border/60 mx-1" />
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors cursor-pointer"
            title="Reset Camera (Double click anywhere)"
            aria-label="Reset camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-bg-elevated transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* Bottom Control Bar */}
      {showControls && enableControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
          {/* Interaction hints */}
          <div className="hidden md:flex items-center gap-3 bg-bg/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-border/50 text-xs text-text-subtle pointer-events-auto">
            <span>🖱️ <strong className="text-text-muted">Left-Drag:</strong> Rotate</span>
            <span>•</span>
            <span>✋ <strong className="text-text-muted">Right-Drag:</strong> Pan</span>
            <span>•</span>
            <span>🔍 <strong className="text-text-muted">Scroll:</strong> Zoom</span>
          </div>

          {/* Feature toggles */}
          <div className="flex items-center gap-2 bg-bg/90 backdrop-blur-md p-1.5 rounded-xl border border-border/60 shadow-lg pointer-events-auto ml-auto">
            <button
              onClick={() => setAutoRotateEnabled(!autoRotateEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                autoRotateEnabled ? 'bg-accent text-bg' : 'text-text-muted hover:text-text hover:bg-bg-elevated'
              }`}
              title="Toggle Auto-Rotation"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRotateEnabled ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span>Turntable</span>
            </button>

            <button
              onClick={() => setShowWireframeEnabled(!showWireframeEnabled)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                showWireframeEnabled ? 'bg-accent text-bg' : 'text-text-muted hover:text-text hover:bg-bg-elevated'
              }`}
              title="Toggle Wireframe"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Wireframe</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {modelError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-sm z-20 pointer-events-none p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-red-400" />
          </div>
          <Heading as="h3" size="h5" weight="bold" animate={false} className="mb-2 text-red-400">
            Failed to Load Model
          </Heading>
          <Text size="sm" color="muted" className="max-w-md mb-4">
            {modelError}
          </Text>
          <Text size="xs" color="muted" className="font-mono bg-bg-elevated px-3 py-1.5 rounded">
            {modelPath}
          </Text>
          <Button 
            variant="secondary" 
            size="sm" 
            className="mt-4"
            onClick={() => { setModelError(null); setModelLoaded(false); }}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </Button>
        </div>
      )}

      {/* Loading Overlay */}
      {(!modelLoaded || progressActive) && !modelError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 backdrop-blur-sm z-10 pointer-events-none p-6 text-center">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-sm text-text font-semibold tracking-wide">
            Loading 3D Model... {progress > 0 ? `${Math.round(progress)}%` : ''}
          </span>
          {progress > 0 && (
            <div className="w-52 h-1.5 bg-border/60 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-accent rounded-full transition-all duration-200" 
                style={{ width: `${Math.max(5, progress)}%` }} 
              />
            </div>
          )}
          <span className="text-xs text-text-subtle mt-2 font-mono">
            {modelPath.includes('building') 
              ? 'Commercial Complex • Flagship Large-Scale Architectural Model' 
              : 'Autodesk Maya GLB Asset'}
          </span>
        </div>
      )}

      {/* Canvas */}
      <Canvas
        camera={{ position: cameraPosition, fov: 45, near: 0.1, far: 1000 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          preserveDrawingBuffer: true
        }}
        style={{ touchAction: 'none' }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={<ModelLoadingFallback modelPath={modelPath} />}>
          <ModelErrorBoundary
            fallback={<ModelErrorFallback modelPath={modelPath} onRetry={() => { setModelError(null); setModelLoaded(false); }} />}
          >
            <ModelScene 
              modelPath={modelPath} 
              showWireframe={showWireframeEnabled}
              autoRotate={autoRotateEnabled}
              enableControls={enableControls}
              onLoad={handleLoad}
              onError={handleError}
              setMinDistance={setMinDistance}
              setMaxDistance={setMaxDistance}
              minDistance={minDistance}
              maxDistance={maxDistance}
              controlsRef={controlsRef}
            />
          </ModelErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Model Scene with Bounding Box Framing & Materials
function ModelScene({ 
  modelPath, 
  showWireframe, 
  autoRotate, 
  enableControls, 
  onLoad,
  onError,
  setMinDistance,
  setMaxDistance,
  minDistance,
  maxDistance,
  controlsRef
}: { 
  modelPath: string; 
  showWireframe: boolean; 
  autoRotate: boolean; 
  enableControls: boolean; 
  onLoad: () => void;
  onError?: (error: Error) => void;
  setMinDistance: (d: number) => void;
  setMaxDistance: (d: number) => void;
  minDistance: number;
  maxDistance: number;
  controlsRef: React.MutableRefObject<any>;
}) {
  let gltf;
  try {
    gltf = useGLTF(modelPath);
  } catch (error) {
    onError?.(error as Error);
    throw error; // Re-throw for React error boundary
  }
  const clonedScene = useMemo(() => gltf?.scene?.clone(), [gltf?.scene]);
  const { camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);

  // Handle missing scene
  if (!clonedScene) {
    return (
      <group>
        <ambientLight intensity={1.0} color="#ff6b6b" />
        <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ff6b6b" castShadow />
        <Environment preset="studio" background={false} />
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ff4444" wireframe />
        </mesh>
      </group>
    );
  }

  // Auto-frame model based on geometry bounding box
  useEffect(() => {
    if (!clonedScene) return;
    onLoad();

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    clonedScene.position.x = -center.x;
    clonedScene.position.y = -box.min.y;
    clonedScene.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    let cameraDistance = maxDim / (2 * Math.tan(fov / 2));
    cameraDistance *= 0.65;  // Good initial fill - model visible but not overwhelming

    // Ensure minimum camera distance for small models
    const minDistance = Math.max(maxDim * 1.2, 1.0);
    cameraDistance = Math.max(cameraDistance, minDistance);

    camera.position.set(cameraDistance * 0.6, cameraDistance * 0.4, cameraDistance);
    camera.lookAt(0, size.y * 0.4, 0);

    if (controlsRef.current) {
      controlsRef.current.target.set(0, size.y * 0.4, 0);
      // Min distance = "medium" view when zoomed in (not inside the model)
      const minD = Math.max(maxDim * 0.3, 0.5);
      const maxD = Math.max(maxDim * 10.0, 100);
      controlsRef.current.minDistance = minD;
      controlsRef.current.maxDistance = maxD;
      setMinDistance(minD);
      setMaxDistance(maxD);
      controlsRef.current.update();
      controlsRef.current.saveState();
    }

    clonedScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Preserve original materials - only ensure they're MeshStandardMaterial for consistent rendering
        if (child.material) {
          // If material is already a standard material, keep it but ensure proper settings
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = Math.max(child.material.roughness || 0.7, 0.3);
            child.material.metalness = Math.min(child.material.metalness || 0.1, 0.5);
          } else {
            // Convert other material types to MeshStandardMaterial while preserving color/texture
            const originalMaterial = child.material;
            const newMaterial = new THREE.MeshStandardMaterial({
              color: originalMaterial.color || 0x808080,
              map: originalMaterial.map || null,
              roughness: 0.7,
              metalness: 0.1,
            });
            // Dispose old material if it's not shared
            if (originalMaterial.dispose && originalMaterial !== child.material) {
              originalMaterial.dispose();
            }
            child.material = newMaterial;
          }
        }
      }
    });

  }, [clonedScene, camera, modelPath, onLoad, controlsRef]);

  // Wireframe toggle
  useEffect(() => {
    if (!clonedScene) return;
    clonedScene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        if (showWireframe) {
          if (!child.userData.wireframe) {
            const wireframe = new THREE.WireframeGeometry(child.geometry);
            const lineMaterial = new THREE.LineBasicMaterial({ 
              color: 0x93c5fd, 
              opacity: 0.35, 
              transparent: true,
              linewidth: 1
            });
            const lines = new THREE.LineSegments(wireframe, lineMaterial);
            lines.position.copy(child.position);
            lines.rotation.copy(child.rotation);
            lines.scale.copy(child.scale);
            child.add(lines);
            child.userData.wireframe = lines;
          }
        } else if (child.userData.wireframe) {
          child.remove(child.userData.wireframe);
          child.userData.wireframe.geometry.dispose();
          child.userData.wireframe.material.dispose();
          delete child.userData.wireframe;
        }
      }
    });
  }, [showWireframe, clonedScene]);

  // Turntable auto-rotation
  useFrame((_, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={2.0} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-10, 10, -10]} intensity={1.0} />
      <directionalLight position={[0, -5, 5]} intensity={0.5} />

      <Environment 
        preset="studio" 
        background={false} 
      />

      <ContactShadows 
        opacity={0.25} 
        scale={25} 
        blur={2.5} 
        far={15} 
        resolution={512}
        position={[0, -0.01, 0]}
      />

      <group ref={modelRef}>
        <primitive object={clonedScene} />
      </group>

      {enableControls && (
        <OrbitControls 
          ref={controlsRef}
          makeDefault
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.06}
          minPolarAngle={0.05}
          maxPolarAngle={Math.PI / 2 + 0.05}
          zoomSpeed={1.2}
          panSpeed={1.0}
          rotateSpeed={0.9}
          minDistance={minDistance}
          maxDistance={maxDistance}
        />
      )}
    </>
  );
}

useGLTF.preload('/models/firepump.glb');
useGLTF.preload('/models/ghostblaster.glb');
useGLTF.preload('/models/bike.glb');
useGLTF.preload('/models/boat.glb');
useGLTF.preload('/models/radio.glb');
useGLTF.preload('/models/Home.glb');
useGLTF.preload('/models/book.glb');
