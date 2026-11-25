import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
const light = new THREE.AmbientLight(0x444444,15); 
scene.add(light);

const loader = new THREE.TextureLoader();
const texture = loader.load('images.png');

const geometry = new THREE.BoxGeometry(1, 1, 1)
const geometryCircle = new THREE.CircleGeometry(1, 32);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  color: 0xffffff,
});
const Circle = new THREE.Mesh(geometryCircle);
const cube = new THREE.Mesh(geometry, material);
Circle.position.x = 2;
scene.add(cube, Circle);

camera.position.z = 5;
const fogColor = 0xcccccc;
scene.background = new THREE.Color(fogColor);
scene.fog = new THREE.Fog(fogColor, 3, 10);
const gltfLoader = new GLTFLoader();
		gltfLoader.load( 'https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', ( gltf ) => {

			const root = gltf.scene;
            root.scale.set(0.001, 0.001, 0.001);
            root.position.set(-2, 0, 0);
			scene.add( root );

			
			const box = new THREE.Box3().setFromObject( root );

			const boxSize = box.getSize( new THREE.Vector3() ).length();
			const boxCenter = box.getCenter( new THREE.Vector3() );

			
			frameArea( boxSize * 0.5, boxSize, boxCenter, camera );

			controls.maxDistance = boxSize * 10;
			controls.target.copy( boxCenter );
			controls.update();

		} );

function animate(time) {
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  renderer.render(scene, camera);
}