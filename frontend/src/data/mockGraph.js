const graphData = {
  nodes: [
    { id: 1, x: 0, y: 0, z: 0 },
    { id: 2, x: 2, y: 1, z: 0 },
    { id: 3, x: -2, y: 1, z: 0 },
    { id: 4, x: 0, y: -2, z: 0 }
  ],

  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 }
  ]
};

export default graphData;