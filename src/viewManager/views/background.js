import React from 'react';

class CoolBackground extends React.Component {
    componentDidMount() {
        let camera, scene, renderer;
        let cameraCube, sceneCube;
        let textureCube;
        let cubeMesh;
        let mouseX = 0, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        // 摄像机

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
        camera.position.set(0, 0, 1000);
        cameraCube = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);

        // 场景

        scene = new THREE.Scene();
        sceneCube = new THREE.Scene();

        // 灯光

        let ambient = new THREE.AmbientLight(0xffffff);
        scene.add(ambient);

        // 材质

        let resLocation = "/img/textures/cube/minecraftSea/";
        let urls = [resLocation + "panorama_3.png", resLocation + "panorama_1.png",
        resLocation + "panorama_4.png", resLocation + "panorama_5.png",
        resLocation + "panorama_2.png", resLocation + "panorama_0.png"];

        textureCube = new THREE.CubeTextureLoader().load(urls);
        textureCube.format = THREE.RGBFormat;
        textureCube.mapping = THREE.CubeReflectionMapping;
        textureCube.encoding = THREE.sRGBEncoding;

        // 材质

        let cubeShader = THREE.ShaderLib["cube"];
        let cubeMaterial = new THREE.ShaderMaterial({
            fragmentShader: cubeShader.fragmentShader,
            vertexShader: cubeShader.vertexShader,
            uniforms: cubeShader.uniforms,
            depthWrite: false,
            side: THREE.BackSide
        });

        cubeMaterial.uniforms["tCube"].value = textureCube;
        Object.defineProperty(cubeMaterial, 'map', {
            get: function () {
                return this.uniforms.tCube.value;
            }
        });

        // 天空盒

        cubeMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100), cubeMaterial);
        sceneCube.add(cubeMesh);



        let onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.25;
            mouseY = (event.clientY - windowHalfY) * 0.25;
        }

        let onWindowResize = () => {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            cameraCube.aspect = window.innerWidth / window.innerHeight;
            cameraCube.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        let animate = () => {
            requestAnimationFrame(animate);

            // 渲染部分

            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (mouseY - camera.position.y) * .05;

            camera.lookAt(scene.position);

            cameraCube.rotation.copy(camera.rotation);

            renderer.render(sceneCube, cameraCube);
            renderer.render(scene, camera);
        }

        renderer = new THREE.WebGLRenderer();
        renderer.autoClear = false;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.refs.three.appendChild(renderer.domElement);

        renderer.gammaOutput = true;

        window.addEventListener('resize', onWindowResize, false);

        document.addEventListener('mousemove', onDocumentMouseMove, false);

        animate();
    }

    render() {
        return (<div ref="three" style={{width: '100%', height: '100%', zIndex: -1000, position: 'absolute'}} />);
    }
}

export default CoolBackground;