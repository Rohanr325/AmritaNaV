def update_events(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    func_code = """function setupJourneyBarEvents() {
  const journeyLeg0Btn = document.getElementById('journeyLeg0Btn');
  const journeyLeg2Btn = document.getElementById('journeyLeg2Btn');
  const journeyStairIndicator = document.getElementById('journeyStairIndicator');

  if (journeyLeg0Btn) {
    journeyLeg0Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchFloor(0);
    });
  }
  if (journeyLeg2Btn) {
    journeyLeg2Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchFloor(2);
    });
  }
  if (journeyStairIndicator) {
    journeyStairIndicator.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextFloor = (appState.currentFloor === 0) ? 2 : 0;
      switchFloor(nextFloor);
    });
  }
}
"""

    if "function setupJourneyBarEvents()" not in content:
        idx = content.find("function setupFloorSwitcher()")
        assert idx != -1, f"setupFloorSwitcher not found in {filepath}"
        content = content[:idx] + func_code + "\n" + content[idx:]

    call_target = "  // Setup Floor Switcher Buttons\n  setupFloorSwitcher();"
    call_replacement = """  // Setup Floor Switcher Buttons
  setupFloorSwitcher();

  // Setup Multi-Floor Journey Bar Buttons
  setupJourneyBarEvents();"""

    if "setupJourneyBarEvents();" not in content:
        assert call_target in content, f"call_target not found in {filepath}"
        content = content.replace(call_target, call_replacement, 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

update_events('script.js')
update_events('app.js')
