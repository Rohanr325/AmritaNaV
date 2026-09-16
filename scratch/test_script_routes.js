const fs = require('fs');

const scriptCode = fs.readFileSync('script.js', 'utf-8');
const vm = require('vm');
const context = {
  console: console,
  Math: Math,
  parseInt: parseInt,
  parseFloat: parseFloat,
  document: {
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {}
  }
};

vm.createContext(context);
try {
  vm.runInContext(scriptCode, context);
  console.log("script.js loaded successfully!");
  
  context.initAllNavigationGraphs();
  console.log("initAllNavigationGraphs completed!");

  const tests = [
    { from: 'GAD-PR', to: 'N204B', desc: 'Admin Porch (0) -> N204B (2)' },
    { from: 'N-020', to: 'S212B', desc: 'North Prayer (0) -> S212B (2)' },
    { from: 'N-010', to: 'S205', desc: 'Mech Staff (0) -> S205 (2)' },
    { from: 'A-001', to: 'A201A', desc: 'Acharya (0) -> A201A (2)' },
    { from: 'N211C', to: 'S-013', desc: 'N211C (2) -> S-013 (0)' },
    { from: 'N-001', to: 'A207A', desc: 'Admission (0) -> A207A (2)' }
  ];

  tests.forEach(t => {
    const r = context.findRoute(t.from, t.to);
    if (!r) {
      console.error(`FAIL: No route found for ${t.desc}`);
    } else {
      console.log(`SUCCESS: ${t.desc} -> Stair: ${r.staircase ? r.staircase.name : 'N/A'}, Dist: ${r.distanceMeters}m`);
    }
  });

} catch (err) {
  console.error("ERROR:", err);
}
