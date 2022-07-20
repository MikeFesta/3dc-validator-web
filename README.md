# Khronos 3D Commerce Asset Validator Single Page Application Implementation

## SPDX-License-Identifier: Apache-2.0

**This is a work in progress.**

### Usage
open index.html in a modern web browser

### About this project
This is an implementation of the 3dc-validator npm package that runs in a
web browser.

The primary objective of this tools is to check a 3D model against a
specification file to report if the model meets the requirements for a given
use case. The specification is based on the Asset Creation Guidelines set forth
by the Khronos Group's 3D Commerce Working Group, which are available here:
https://github.com/KhronosGroup/3DC-Asset-Creation/

#### Checks currently available
* File Size (min/max)
* Triangle Count (max)

#### Checks to be added
* Dimensions
* Transparent Geometry Separated
* Material Count
* 0-1 UV Texture Space
* Mesh Count
* Node Count
* Primitive Count
* Texture Map Resolution
* Texture Density
* Hard Edges
* PBR Safe Colors
* UV Overlaps
* UV Margin Size
* Inverted UVs
* Clean Origin for Top Node
* Non-Manifold Edges

