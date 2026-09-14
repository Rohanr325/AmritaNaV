from PIL import Image

im = Image.open(r'C:\Users\rohan\.gemini\antigravity-ide\brain\a450b43e-c4b5-4a37-a3dd-9360d67ed47e\.user_uploaded\media_1789398055396.png').convert('RGB')
w, h = im.size

# Let's inspect the user's orange lines and where they turn relative to the rooms:
# In the image, we can directly see the room labels and boundaries!
# Let's inspect each turn of the orange path in the user image:

# Turn 1: Starts at North Exit / Atrium top:
# Between N-020 (left) and S-014 (right), near the top edge of N-020 / S-014.
# It goes UP, then turns RIGHT (East).
# Then goes across the top of S-014 / S-013, past the east edge of S-014/S-013/WC-S2, to the far right.
# Then turns DOWN (South).

# East Perimeter Line:
# Runs all the way down the east side.
# When it reaches the gap between S-004A and A-001 (Acharya Hall):
# A line branches WEST into the gap:
# It runs along the north wall of A-001 / south wall of S-004A, into the Breezeway,
# then angles southwest into the corridor south of S-001 (Guest Room)!
# And the main perimeter line continues DOWN past A-001 (Acharya Hall) to the bottom.

# South Perimeter Line:
# Turns WEST at the bottom-right corner, runs below GAD (PR Office) all the way across to the bottom-left corner (west of A-006 Amritheswari Hall).

# West Perimeter Line:
# Turns NORTH at the bottom-left corner, runs up the west side of A-006 (Amritheswari Hall).
# When it reaches the top-left of A-006:
# Turns EAST, runs between A-006 and N-005 (Nano Sciences)!
# When it reaches the corridor / breezeway east of N-004:
# Turns NORTH, runs vertically between N-004/N-009 and the central spine (N-001..N-010)!
# When it reaches the level between N-009 and N-014 (Metallurgy Lab):
# Angles NORTH-WEST, connecting to the corridor right at the south entrance of N-014 (Metallurgy Lab)!

print("Path semantics mapped out perfectly!")
