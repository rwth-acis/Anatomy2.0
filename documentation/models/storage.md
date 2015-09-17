# Model Storage

The following directory structure must be followed when uploading models:

```
-> root
	-> models
		-> [MODEL UNIQUE ID]
			-> [MODEL UNIQUE ID].x3d
			-> textures
				-> texture_1.png
				...
		...
```
Note that `[MODEL UNIQUE ID]` is the ID that will be given to the model by Anatomy2.0

Textures can keep their names, however they must be stored in the `textures` folder of the model and references of the x3dom file must be set accordingly.

Example
```
-> root
	-> models
		-> 1
			-> 1.x3dom
			-> textures
				-> texture_1.png
				-> texture_2.png
		-> 2
			-> 2.x3dom
			-> textures
				-> texture.pn
				```