import React, { useCallback } from "react";
import Reflux from "reflux";
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        zIndex: -100
    }
  });

class Background extends Reflux.Component {
    componentDidMount() {
        let camera, scene, renderer;
        let cameraCube, sceneCube;
        let textureCube;
        let cubeMesh;
        let mouseX = 0, mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        console.log("开始绘制动态背景")
        console.log(THREE);

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

        let r = "textures/cube/minecraftSea/";
        let urls = [r + "panorama_3.png", r + "panorama_1.png",
        r + "panorama_4.png", r + "panorama_5.png",
        r + "panorama_2.png", r + "panorama_0.png"];

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
            camera.position.y += (- mouseY - camera.position.y) * .05;

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
        const { classes } = this.props;

        return (<div className={classes.root} ref="three" />);
    }
}

export default withStyles(styles)(Background);;