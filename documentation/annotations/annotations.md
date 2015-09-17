# Annotations

### Persistent storage

**Sevianno**: Anatomy2.0 uses the Sevianno service to store annotations. All operations that interact with the Sevianno service can be found in `annotations.js`. Currently, there are `create`, `read`, `update` and `delete`. 

Note: Sevianno uses ArangoDB to store annotations. Sevianno is able to store custom fields with annotations. In case you want to store annotation data with Sevianno and Sevianno does not provide a field for that data, just safe it anyways. When reading data from Sevianno you will find that your new field is available in the `annotationData` attribute of the returned JSON object.

**Sevianno ID**: Sevianno creates IDs for all objects it stores. Therefore, each annotation has an ID. In addition, annotations are attached to objects (in our case: models), which also have an ID. Sevianno object IDs for models are stored in Anatomy2.0 database. After initially reading the model ID from our database, `model-viewer.js` will keep track of all Sevianno IDs it receives.

`TODO`: When uploading a model to Anatomy2.0, a Sevianno object id has to be derived for the model. This is not yet implemented.

**Local ID**: When creating a new annotation in the model viewer, it takes some time until Sevianno stored the new annotation and returns a Sevianno ID. Of course, we have to show the annotation in the frontend before storing the annotation with Sevianno is finished. Now, the user might add multiple annotaions during this timespan. When receiving a response from Sevianno with a Sevianno ID, we now need to be able to map the response to one of the created annotations. For this reason,  `model-viewer.js` creates local IDs (which are stored as part of the annotation on Sevianno). When receiving a response (which will contain a local ID), model viewer is able to match the response to one of the new annotations.