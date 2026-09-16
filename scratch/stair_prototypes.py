# Let's inspect the current Floor 0 SVG around the stairs and test the new staircase SVG code

stair_north_svg = """
  <g class="stair-group" id="stair-north" data-stair="stair_north" data-name="North Atrium Stairs">
    <!-- Outer boundary box -->
    <rect class="stair-box" x="355" y="253" width="42" height="20" rx="1.5" />
    <!-- Center flight (going up to landing) -->
    <rect class="stair-inner-box" x="367" y="253" width="18" height="9" />
    <line class="stair-step" x1="371" y1="253" x2="371" y2="262" />
    <line class="stair-step" x1="376" y1="253" x2="376" y2="262" />
    <line class="stair-step" x1="381" y1="253" x2="381" y2="262" />
    <!-- Left flight -->
    <rect class="stair-inner-box" x="355" y="260" width="12" height="13" />
    <line class="stair-step" x1="355" y1="263" x2="367" y2="263" />
    <line class="stair-step" x1="355" y1="266" x2="367" y2="266" />
    <line class="stair-step" x1="355" y1="269" x2="367" y2="269" />
    <!-- Right flight -->
    <rect class="stair-inner-box" x="385" y="260" width="12" height="13" />
    <line class="stair-step" x1="385" y1="263" x2="397" y2="263" />
    <line class="stair-step" x1="385" y1="266" x2="397" y2="266" />
    <line class="stair-step" x1="385" y1="269" x2="397" y2="269" />
    <!-- Center landing -->
    <rect class="stair-landing" x="367" y="262" width="18" height="11" />
    <!-- Stair Label & Direction Arrow Badge -->
    <g class="stair-badge-group">
      <rect class="stair-badge-bg" x="361" y="243" width="30" height="8" rx="2" />
      <text class="stair-badge-text" x="376" y="249" text-anchor="middle">STAIRS ▲ 2F</text>
    </g>
  </g>
"""

stair_mid_svg = """
  <g class="stair-group" id="stair-mid" data-stair="stair_mid" data-name="Mid Atrium Stairs">
    <!-- Outer boundary box -->
    <rect class="stair-box" x="355" y="490" width="42" height="20" rx="1.5" />
    <!-- Center flight -->
    <rect class="stair-inner-box" x="367" y="490" width="18" height="9" />
    <line class="stair-step" x1="371" y1="490" x2="371" y2="499" />
    <line class="stair-step" x1="376" y1="490" x2="376" y2="499" />
    <line class="stair-step" x1="381" y1="490" x2="381" y2="499" />
    <!-- Left flight -->
    <rect class="stair-inner-box" x="355" y="497" width="12" height="13" />
    <line class="stair-step" x1="355" y1="500" x2="367" y2="500" />
    <line class="stair-step" x1="355" y1="503" x2="367" y2="503" />
    <line class="stair-step" x1="355" y1="506" x2="367" y2="506" />
    <!-- Right flight -->
    <rect class="stair-inner-box" x="385" y="497" width="12" height="13" />
    <line class="stair-step" x1="385" y1="500" x2="397" y2="500" />
    <line class="stair-step" x1="385" y1="503" x2="397" y2="503" />
    <line class="stair-step" x1="385" y1="506" x2="397" y2="506" />
    <!-- Center landing -->
    <rect class="stair-landing" x="367" y="499" width="18" height="11" />
    <!-- Stair Label & Direction Arrow Badge -->
    <g class="stair-badge-group">
      <rect class="stair-badge-bg" x="361" y="480" width="30" height="8" rx="2" />
      <text class="stair-badge-text" x="376" y="486" text-anchor="middle">STAIRS ▲ 2F</text>
    </g>
  </g>
"""

stair_sw_svg = """
  <g class="stair-group" id="stair-sw" data-stair="stair_sw" data-name="South-West Courtyard Stairs">
    <!-- Outer boundary L-shape path -->
    <path class="stair-box" d="M 316 636 L 350 636 L 350 688 L 334 688 L 334 656 L 316 656 Z" />
    <!-- Corner landing -->
    <rect class="stair-landing" x="316" y="636" width="12" height="20" />
    <!-- Top horizontal run treads (vertical lines) -->
    <line class="stair-step" x1="332" y1="636" x2="332" y2="656" />
    <line class="stair-step" x1="336" y1="636" x2="336" y2="656" />
    <line class="stair-step" x1="340" y1="636" x2="340" y2="656" />
    <line class="stair-step" x1="344" y1="636" x2="344" y2="656" />
    <!-- Bottom vertical run treads (horizontal lines) -->
    <line class="stair-step" x1="334" y1="662" x2="350" y2="662" />
    <line class="stair-step" x1="334" y1="667" x2="350" y2="667" />
    <line class="stair-step" x1="334" y1="672" x2="350" y2="672" />
    <line class="stair-step" x1="334" y1="677" x2="350" y2="677" />
    <line class="stair-step" x1="334" y1="682" x2="350" y2="682" />
    <!-- Badge -->
    <g class="stair-badge-group">
      <rect class="stair-badge-bg" x="306" y="626" width="30" height="8" rx="2" />
      <text class="stair-badge-text" x="321" y="632" text-anchor="middle">STAIRS ▲ 2F</text>
    </g>
  </g>
"""

stair_se_svg = """
  <g class="stair-group" id="stair-se" data-stair="stair_se" data-name="South-East Courtyard Stairs">
    <!-- Outer boundary L-shape path (symmetrical) -->
    <path class="stair-box" d="M 398 636 L 432 636 L 432 656 L 414 656 L 414 688 L 398 688 Z" />
    <!-- Corner landing -->
    <rect class="stair-landing" x="420" y="636" width="12" height="20" />
    <!-- Top horizontal run treads (vertical lines) -->
    <line class="stair-step" x1="404" y1="636" x2="404" y2="656" />
    <line class="stair-step" x1="408" y1="636" x2="408" y2="656" />
    <line class="stair-step" x1="412" y1="636" x2="412" y2="656" />
    <line class="stair-step" x1="416" y1="636" x2="416" y2="656" />
    <!-- Bottom vertical run treads (horizontal lines) -->
    <line class="stair-step" x1="398" y1="662" x2="414" y2="662" />
    <line class="stair-step" x1="398" y1="667" x2="414" y2="667" />
    <line class="stair-step" x1="398" y1="672" x2="414" y2="672" />
    <line class="stair-step" x1="398" y1="677" x2="414" y2="677" />
    <line class="stair-step" x1="398" y1="682" x2="414" y2="682" />
    <!-- Badge -->
    <g class="stair-badge-group">
      <rect class="stair-badge-bg" x="412" y="626" width="30" height="8" rx="2" />
      <text class="stair-badge-text" x="427" y="632" text-anchor="middle">STAIRS ▲ 2F</text>
    </g>
  </g>
"""

print("Stair SVG prototypes ready.")
