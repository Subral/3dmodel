// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// new OrbitControls(camera, renderer.domElement);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(0, 10, -10);
// scene.add(directionalLight);

// const loader = new GLTFLoader();

// loader.load('adamHead/adamHead.gltf', function (gltf) {
//     const model = gltf.scene;
//     model.scale.set(0.7, 0.7, 0.7); // Adjust scale if needed
//     model.position.set(0, 0, 0); // Adjust position if needed
//     scene.add(model);


// }, undefined, function (error) {
//     console.error(error);
// });

// camera.position.z = 5;

// const clock = new THREE.Clock();

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();

// window.addEventListener('resize', onWindowResize);

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 10, -10);
scene.add(directionalLight);


const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new THREE.TextureLoader().load('adamHead\Assets\Models\PBR\Adam\Textures\Adam_Head_a.jpg', (texture) => {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    scene.background = envMap;
    texture.dispose();
    pmremGenerator.dispose();
});

new OrbitControls(camera, renderer.domElement);


const loader = new GLTFLoader();
loader.load('adamHead/adamHead.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.9, 0.9, 0.9); 
    model.position.set(0, 0, 0); 
    scene.add(model);
}, undefined, (error) => {
    console.error(error);
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
