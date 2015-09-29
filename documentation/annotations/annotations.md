# Annotations

### Persistent storage

**Sevianno**: Anatomy2.0 uses the Sevianno service to store annotations. All operations that interact with the Sevianno service can be found in `annotations.js`. Currently, there are `create`, `read`, `update` and `delete`. 

Note: Sevianno uses ArangoDB to store annotations. Sevianno is able to store custom fields with annotations. In case you want to store annotation data with Sevianno and Sevianno does not provide a field for that data, just safe it anyways. When reading data from Sevianno you will find that your new field is available in the `annotationData` attribute of the returned JSON object.

**Sevianno ID**: Sevianno creates IDs for all objects it stores. Therefore, each annotation has an ID. In addition, annotations are attached to objects (in our case: models), which also have an ID. Sevianno object IDs for models are stored in Anatomy2.0 database. After initially reading the model ID from our database, `model-viewer.js` will keep track of all Sevianno IDs it receives.

`TODO`: When uploading a model to Anatomy2.0, a Sevianno object id has to be derived for the model. This is not yet implemented.

**Local ID**: When creating a new annotation in the model viewer, it takes some time until Sevianno stored the new annotation and returns a Sevianno ID. Of course, we have to show the annotation in the frontend before storing the annotation with Sevianno is finished. Now, the user might add multiple annotaions during this timespan. When receiving a response from Sevianno with a Sevianno ID, we now need to be able to map the response to one of the created annotations. For this reason,  `model-viewer.js` creates local IDs (which are stored as part of the annotation on Sevianno). When receiving a response (which will contain a local ID), model viewer is able to match the response to one of the new annotations.

**What is stored with Sevianno?**
For each annotation, its position, `title`, `content`, `username` and `localId` is stored with Sevianno Service. The position of an annotation is stored with two values. First, the 3D coordinates of the position `pos` of the cone (more precisely the position of the apex of the cone) is stored. Secondly, the 3D vector of the direction `norm` of the cone is stored. The last editor is stored as the user name (`givenName + ' ' + lastName`). Model viewer has a helper function `modelViewer.getCurrentUsername()` to receive the name of the currently logged in user.

Note: Sevianno Service does not provide predefined fields for all values used by Anatomy2.0. E.g. there is no `pos` field in Sevianno. But you can add custom fields to your annotation. Just create a custom attribute in the (JSON encoded) object to send to Sevianno. When receiving an answer from Sevianno Service, you will find your custom attribute in the `annotationData` attribute of the received JSON encoded object.

### Displaying annotations

**x3dom Scene Graph and "How to access annotation markers?"** 
In the x3dom scene graph an annotation marker will be represented by 4 elements. There is a `transform` node which positions the annotation marker in 3D space. A `shape` node is attached to the `transform`, which represents the 3D geometry of the annotation marker. The `shape` node has a `cone` child and an `appearance` child node which contains a `material` node. Adam found out, that the `material` node is required for lighting calculations to take place. The `material` node defines all values for lighting calculation (e.g. diffuse color and transparency). 

The `annotationMarkers.elements` object stores a reference to all annotation markers by annotation id. Local ids are used if there is no Sevianno ID yet. `annotationMarkers.elements` will store the `transform` node of each annotation marker. You have to navigate via the `children[i]` attribute to its descendant nodes.

**Annotation marker appearance:** 
Anatomy 2.0 provides the feature, that annotations are color coded to show their editor. In other words, the markers of two annotations will have diffent colors if they have been last edited by two different users. Of course, annotations created by the same user will have the same color. This way, it is easy to see which annotations have been created by the same user.

The color of each annotation marker can be set using its `material` node. The model viewer saves a material node for each user who has at least one annotation on the currently viewed model. The materials are stored in the `annotationMarkers.materials` object by username. When showing an annotation marker, the function `annotationMarkers.getMaterial()` is used to determine the annotations look. If there is no material for the user yet, a new one is created.

Note: It is not possible to assign the same material to multiple annotation markers, because x3dom will remove the material node from the shape it has been previously attached to. Therefore, `material` nodes are always copied before assigning them to a node. This is already handled by `annotationMarkers.getMaterial()` function.

**Content box:** 
There needs to be some place to display detailed information about an annotation. Anatomy2.0 has a content box to display detail information for annontations. There is one content box statically defined in HTML code called `annotation-content`. One set of HTML elements is sufficient, because there is always just one content box visible at a time. 

The content box has three different modes to be able to react to user interaction. The modes are `loading`, `read` and `edit`. The content box is in `read` mode by default. `loading` is shown if and only if the user tries to open a content box, but the annotation is not yet in local storage (it is still being created and / or read from Sevianno Service). Switching modes is done with the `annotationContentBox.switchMode()` which accepts a `String` as argument. The argument has to be one of the three mode names.

When a user clicks an annotation marker, the annotation content box has to be positioned somewhere near the marker. But it should not overlap with the marker or the model part which is annotated. Anatomy2.0 has a simple algorithm which tries to approximately achieve this behavior. The annotation content box is initially placed at the position where the user clicked the annotation marker and from there it is shifted to the border of the screen. The positioning is handled by `annotationContentBox.calcPosition()`. Note, that the content box is not repositioned when the user rotates or moves the model on the screen.

### Miscellaneous

**On load event on x3dom inline node:** 
The x3dom inline element seems not to support the standard HTML `addEventListener()` function, so Model Viewer provides a workaround to be able to attach multiple event listeners to the x3dom inline element. Just call `modelViewer.addEventListener('load', callback)` and replace `callback` by your callback function.