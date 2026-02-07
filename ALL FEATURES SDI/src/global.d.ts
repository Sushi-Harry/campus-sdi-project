import { ThreeElements } from '@react-three/fiber'

export {};

declare global {
  interface Window {
    // Injected by MetaMask
    ethereum?: any;
  }

  namespace JSX {
    // This line tells React that <primitive />, <ambientLight />, etc., are valid
    interface IntrinsicElements extends ThreeElements {}
  }
}