import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CustomShader } from './CustomShader';

const Background = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Position camera to see the plane
    camera.position.z = 10;
    
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    // Create a plane that fills the view
    const geometry = new THREE.PlaneGeometry(50, 50);
    const material = new CustomShader();
    const backgroundMesh = new THREE.Mesh(geometry, material);
    scene.add(backgroundMesh);

    // Clock to track time
    const clock = new THREE.Clock();

    // Set up animation loop with time update
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.time = elapsedTime; // Update the shader time uniform
      
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    }
  }, []);

  return <div ref={mountRef} style={{position: 'fixed', top:0, left:0, width: '100%', height:'100%', zIndex:-1}} />;
};

export default Background;
