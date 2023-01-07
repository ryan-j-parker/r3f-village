export default /* glsl */ `

void main() {
    // projectionMatrix, modelViewMatrix, position
    gl_Position = projectionMatrix
        * modelViewMatrix
        * vec4(position.x, position.y, position.z, 1.0);
}
`;
