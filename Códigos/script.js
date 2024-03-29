"use strict";
var angulo = 0;
var mouseX = 0, mouseY = 0;
var winX = window.innerWidth / 2;
var winY = window.innerHeight / 2;
var limiteZ = 0;
var posicao = 0;

//Linha da pista
var materialLinha = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var geometriaLinha = new THREE.Geometry();

//Cena
var cena = new THREE.Scene();

//Câmera
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000);

//Posição da câmera
camera.position.set(0, 0.09, 18);

//Renderizador
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
var canvas = renderer.domElement;
document.body.appendChild(renderer.domElement);

//luz
var luz = new THREE.SpotLight(0xffffff, 1);
luz.position.set(2, 0, 19);
luz.castShadow = true;
luz.target.position.set(0, 0, 0);
luz.shadow.camera.near = 3;
luz.shadow.camera.far = 19;

cena.add(luz);

//sombra
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

//Pista
var planoPista = new THREE.PlaneGeometry(20, 20, 1, 1);
var pistaMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('../imagens/pista.png')
});
//Unindo o material da pista com o plano
var pista = new THREE.Mesh(planoPista, pistaMaterial);
pista.receiveShadow = true;
pista.castShadow = true;
pista.position.set(1, 0, -0.2);

// Adicionando o a pista a cena
cena.add(pista);

// Base dos Telões
//Base 1
var geometry = new THREE.CylinderGeometry(0.2, 0.2, 3.3, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var baseTelao = new THREE.Mesh(geometry, material);
baseTelao.rotation.x = 1.4;
baseTelao.position.y = 10;
baseTelao.position.x = -9;
baseTelao.position.z = 0;
cena.add(baseTelao);

//Base 2
var baseTelao2 = baseTelao.clone();
baseTelao2.rotation.x = 1.4;
baseTelao2.position.y = 10;
baseTelao2.position.x = 10.9;
baseTelao2.position.z = 0;
cena.add(baseTelao2);

//Telão
var material = new THREE.PlaneGeometry(2.8, 2.5, 1);
var animacao = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('../Gifs/tela.gif'),
  transparent: true
});

var tela = new THREE.Mesh(material, animacao);
tela.rotation.x = 1.5;
tela.rotation.y = 0.8;
tela.position.x = -9;
tela.position.y = 10.3;
tela.position.z = 2.8;
cena.add(tela);

// Telão 2/
var tela2 = tela.clone();
tela.rotation.x = 1.4;
tela.rotation.y = -0.8;
tela.position.x = 10.9;
tela.position.y = 10.4;
tela.position.z = 2.8;
cena.add(tela2);

//Arquibancada
var geometry = new THREE.PlaneGeometry(20, 20, 2);
var torcida = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('../imagens/torcida.png'),
  transparent: true
});

var arquibancada1 = new THREE.Mesh(geometry, torcida);
arquibancada1.rotation.z = 17.28;
arquibancada1.rotation.x = 0.5;
arquibancada1.position.x = 1;
arquibancada1.position.z = 2;
arquibancada1.position.y = 15;
cena.add(arquibancada1);

var arquibancada2 = arquibancada1.clone();
arquibancada2.position.y = 0;
arquibancada2.position.x = -12;
arquibancada2.position.z = 4;
arquibancada2.rotation.x = 0;
arquibancada2.rotation.y = 1;
arquibancada2.rotation.z = 0;
cena.add(arquibancada2);

var arquibancada3 = arquibancada1.clone();
arquibancada3.position.y = 0;
arquibancada3.position.x = 14;
arquibancada3.position.z = 4;
arquibancada3.rotation.x = 0;
arquibancada3.rotation.y = -1;
arquibancada3.rotation.z = 3.12;
cena.add(arquibancada3);

//sol
var sunGeometry = new THREE.SphereGeometry(1, 50, 50);
var sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
var sol = new THREE.Mesh(sunGeometry, sunMaterial);
sol.position.set(2, 0, 19);
sol.castShadow = false;
sol.receiveShadow = false;
cena.add(sol);

//Spline
//Pontos por onde a curva irá passar
var curva = new THREE.SplineCurve([
  new THREE.Vector3(-7.2, 3, 0.2),
  new THREE.Vector3(-7.2, 7.5, 0.2),
  new THREE.Vector3(-4, 7.5, 0.2),
  new THREE.Vector3(-3.5, 3, 0.2),
  new THREE.Vector3(2, 3, 0.2),
  new THREE.Vector3(3, 7.5, 0.2),
  new THREE.Vector3(5.5, 7.5, 0.2),
  new THREE.Vector3(6.5, 1.5, 0.2),
  new THREE.Vector3(8.7, 0, 0.2),
  new THREE.Vector3(9, -3, 0.2),
  new THREE.Vector3(6.6, -4.5, 0.2),
  new THREE.Vector3(6, -7.9, 0.2),
  new THREE.Vector3(3.3, -8, 0.2),
  new THREE.Vector3(2.5, -5, 0.2),
  new THREE.Vector3(2.5, -2, 0.2),
  new THREE.Vector3(-1.2, -2, 0.2),
  new THREE.Vector3(-1.8, -6, 0.2),
  new THREE.Vector3(-4, -6, 0.2),
  new THREE.Vector3(-4.6, -3.8, 0.2),
  new THREE.Vector3(-6.7, -2.9, 0.2),
  new THREE.Vector3(-7.2, 3, 0.2),
]);

var caminho = new THREE.Path(curva.getPoints(250));
var geometriaLinha = caminho.createPointsGeometry(250);

//Desenhar os pontos de referencia 
var materialPonto = new THREE.PointsMaterial({ size: 10, sizeAttenuation: false });

//For responsável por adicionar os pontos na tela
for (let p of curva.points) {
  var geometriaPonto = new THREE.Geometry();
  geometriaPonto.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
  var ponto = new THREE.Points(geometriaPonto, materialPonto);
  cena.add(ponto);
}

//Linha que será o caminho por onde o carro irá passar
var linha = new THREE.Line(geometriaLinha, materialLinha);
cena.add(linha);

//Corpo do carro
var geometria = new THREE.BoxGeometry(1, 1.5, 0.3);
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var corpoCarro = new THREE.Mesh(geometria, material);
corpoCarro.position.z = 0;
corpoCarro.receiveShadow = true;

//Vidro frente e trás do carro
var geometry = new THREE.PlaneGeometry(1, 0.4, 32);
var material = new THREE.MeshPhongMaterial({
  color: 0x6bbd1,
  side: THREE.DoubleSide
});
var vidro1 = new THREE.Mesh(geometry, material);
vidro1.receiveShadow = true;
vidro1.rotation.x = 1.6;
vidro1.position.y = 0.3
vidro1.position.z = 0.2;

var vidro2 = vidro1.clone();
vidro2.rotation.x = 1.6;
vidro2.position.y = -0.3
vidro2.position.z = 0.2;

//Vidro lateral do carro
var geometry = new THREE.PlaneGeometry(0.2, 0.5, 32);
var material = new THREE.MeshPhongMaterial({
  color: 0x6bbd1,
  side: THREE.DoubleSide
});
var vidro3 = new THREE.Mesh(geometry, material);
vidro3.rotation.y = 1.6;
vidro3.position.x = 0.51;
vidro3.position.z = 0.26;

var vidro4 = vidro3.clone();
vidro4.rotation.y = 1.6;
vidro4.position.x = -0.51;
vidro4.position.z = 0.26;

//Teto do Carro
var geometry = new THREE.PlaneGeometry(1, 0.6, 32);
var material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide
});
var teto = new THREE.Mesh(geometry, material);
teto.position.z = 0.4;
teto.receiveShadow = true;

//Interior do carro
var geometria = new THREE.BoxGeometry(1, 0.5, 0.2);
var material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
var interior = new THREE.Mesh(geometria, material);
interior.position.z = 0.3;
interior.receiveShadow = true;

//Roda do carro
var circulo = new THREE.CircleGeometry(0.2, 32);
var imagemRoda = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load('../imagens/roda.png'),
  side: THREE.DoubleSide
});

//Roda 1
var roda1 = new THREE.Mesh(circulo, imagemRoda);
roda1.receiveShadow = true;
roda1.rotation.x = 1.57;
roda1.rotation.y = 1.57;
roda1.position.x = 0.6;
roda1.position.y = -0.4;
roda1.position.z = -0.2;

//Roda 2
var roda2 = roda1.clone();
roda2.rotation.x = 1.57;
roda2.rotation.y = -1.57;
roda2.position.x = -0.6;
roda2.position.y = -0.4;
roda2.position.z = -0.2;

//Roda 3
var roda3 = roda1.clone();
roda3.rotation.x = 1.57;
roda3.rotation.y = 1.57;
roda3.position.x = 0.6;
roda3.position.y = 0.4;
roda3.position.z = -0.2;

//Roda 4
var roda4 = roda1.clone();
roda4.rotation.x = 1.57;
roda4.rotation.y = -1.57;
roda4.position.x = -0.6;
roda4.position.y = 0.4;
roda4.position.z = -0.2;

//Farol 1
var geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
var material = new THREE.MeshPhongMaterial({ color: 0xf8cf0d });
var farol1 = new THREE.Mesh(geometry, material);
farol1.receiveShadow = true;
farol1.position.x = 0.4;
farol1.position.y = -0.7;
farol1.position.z = 0.1;

//Farol 2
var farol2 = farol1.clone();
farol2.position.x = -0.4;
farol2.position.y = -0.7;
farol2.position.z = 0.1;

//Farol 3
var farol3 = farol1.clone();
farol3.position.x = -0.4;
farol3.position.y = 0.7;
farol3.position.z = 0.1;

//Farol 4
var farol4 = farol1.clone();
farol4.position.x = 0.4;
farol4.position.y = 0.7;
farol4.position.z = 0.1;

//Carro
var carro = new THREE.Group();
carro.add(corpoCarro);
carro.add(roda1);
carro.add(roda2);
carro.add(roda3);
carro.add(roda4);
carro.add(vidro1);
carro.add(vidro2);
carro.add(vidro3);
carro.add(vidro4);
carro.add(teto);
carro.add(interior);
carro.add(farol1);
carro.add(farol2);
carro.add(farol3);
carro.add(farol4);
carro.position.set(-7.2, 3, 0.2);
cena.add(carro);

function pegarAngulo(posicao) {
  // Pegando a tangent 2D da curva
  var tangent = caminho.getTangent(posicao).normalize();

  // Mudando a tangent para 3D
  angulo = - Math.atan(tangent.x / tangent.y);

  return angulo;
}

function movimento() {

  var vel = 0.16;

  roda1.rotation.x -= vel;
  roda2.rotation.x -= vel;
  roda3.rotation.x -= vel;
  roda4.rotation.x -= vel;

  // Adicionando a posição para o movimento
  posicao += 0.001;

  if (posicao > 1.0) {
    posicao = 0.001;
  }
  // Obtendo o ponto da posição
  var ponto = caminho.getPointAt(posicao);
  carro.position.x = ponto.x;
  carro.position.y = ponto.y;

  var angulo = pegarAngulo(posicao);
  // Define o quaternion
  carro.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angulo);
}

//Movimentação da Camera
var xi;
var yi;

canvas.addEventListener("mousedown", function (e) {
  xi = e.offsetX;
  yi = e.offsetY;

}, false);

canvas.addEventListener("mousemove", function (e) {

  if (e.buttons == 1) { //botão esquerdo do mouse
    camera.position.x = -40 * (xi - e.offsetX) / canvas.width;
    camera.position.y = -40 * (e.offsetY - yi) / canvas.height;
  }

  if (e.buttons == 2) { //botão direito do mouse
    camera.position.y = 20 * Math.sin((e.offsetY - yi) * Math.PI / 180);
    camera.position.z = 20 * Math.cos((e.offsetY - yi) * Math.PI / 180);
    camera.lookAt(cena.position);
  }

}, false);

function desenhar() {
  movimento();
  requestAnimationFrame(desenhar);
  tela.material.map.needsUpdate = true;
  tela2.material.map.needsUpdate = true;
  renderer.render(cena, camera);
}

requestAnimationFrame(desenhar);