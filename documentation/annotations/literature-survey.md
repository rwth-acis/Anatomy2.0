# Annotations - Literature Survey

### Annotations and X3D

**X3D Specification**  
http://www.web3d.org/documents/specifications/19775-1/V3.3/index.html  
**X3D XML encoding**  
http://www.web3d.org/documents/specifications/19776-1/V3.3/index.html  
x3dom provides a good description of all node elements of X3D:  
http://doc.x3dom.org/author/nodes.html

Unfortunately, there is no node in X3D which concretely supports annotations. X3D just supports a `Text` node. There are also nodes for 2D elements.

[Ourdated project] I found this resource on Annotations with X3D at the Xj3D project http://www.xj3d.org/  
They proposed an extension of X3D for annotations: http://www.xj3d.org/extensions/annotation.html#Concepts

**Profiles:**
Although none of the X3D profiles supports annotations, an overview about all profiles can be found at http://www.web3d.org/x3d/profiles  
To read about details on the profiles, visit http://www.web3d.org/documents/specifications/19775-1/V3.2/Part01/Architecture.html . Note, that this specification is not specific to X3D XML encoding (instead it describes the X3D scence graph elements).

There is also a working group specialized on medical modelling. But I could not find any helpful results on their page http://www.web3d.org/working-groups/medical

**Literature**
There seems to be one comprehensive book on X3D called X3D: 3D Graphics for Web Authors, by Don Brutzman and Leonard Daly. Two example chapters can be accessed on http://x3dgraphics.com/chapters/

David Yu and Jane Hunter wrote "X3D Fragment Identifiers - Extending the Open Annotation Model to Support Semantic Annotation of 3D Cultural Heritage Objects over the Web" in 2014.  
There they created point and volumentric annotations for X3D objects which conform to the Open Annotation model. The PDF unfortunately cannot be accessed for free on http://multi-science.atypon.com/doi/ref/10.1260/2047-4970.3.3.579

### Open Annotation Model

According to its specification, "The primary aim of the Open Annotation Data Model is to provide a standard description mechanism for sharing Annotations between systems." The full specification can be found at http://www.openannotation.org/spec/core/#Aims

The Open Annotation Model (OAM) is based on the Resource Description Framework (RDF), which is comprehensively explained at http://www.w3.org/TR/2014/NOTE-rdf11-primer-20140225/#section-graph-syntax

Although OAM focuses on sharing annotations between multiple applications, its use cases at http://www.openannotation.org/usecases.html are still very helpful to identify requirements for annotations for Anatomy2.0.

### Results - Annotation Concept Model

Based on the OAM use cases and specification I identified three main components which should to be associated with each annotation:  

**Target:** Which object is to be annotated?   
At minimum the target is a unique identifier for the object/model to be annotated (see for example [3Drepository](http://dbis.rwth-aachen.de/3dnrt/3Drepository/) and [3D Repository Documentation](https://github.com/dost25/3Drepository)). In 3Drepository, the annotations are added globally to a model.  
But the target can also define, where on the model an annotation can be accessed. There are three different options:
- Point: A point in 3D space is annotated. Of cause, a point in 3D space is not sufficiently visible to users. Therefore, a different representation needs to be chosen as an indicator for the frontend.
- Surface: The surface of the model could be annotated. [This is an idea for implementing this: Store, that this annotation is of type 'Surface' and store a primitive 3D object as a target of the annotation. In the visualization, highlight only the intersection of the primitive 3D object and the model.]
- 3D Space: Arbitrary 3D space could be annotated. The space should have a primitive shape.

It can also be beneficial to associate multiple targets with a single annotation. There are two scenarios, which require multiple targets:

- Scenario 1: There are two models of a skull. The bones on the models are annotated for teaching purposes (for example with their name). The same bones appear in both models. For consistency reasons, there should be the same annotations for the same bonees in both models. So here it would be nice to be able to annotate locations in two different models with the same annotation (The annotation would need two targets).
- Scenario 2: The teacher wants to annotate a specific bone of a model. No primitive shape fits the bone well enough. Now it might be useful to combine multiple primitive shapes to describe the shape of the bone precise enough. This can be implemented by using multiple targets. Each target is a primitive shape. All targets combined describe the bones shape.

**Content:** (called "body" in OAM): What is to be displayed as an annotation? Can be text, an image, a video or audio data. It might be interesting to allow for localization of text (and also video / audio data). This can be achieved by providing multiple content components for a single annotation (which could be distinguished by an identifier, which could specify the language of the content).  

**Access Rights:** Who can view or modify an annotation? Viewing can be restricted based on the purpose of the annotation. An annotation for teaching purposes provided by the lecturer should probably be visible to everyone. In contrast, a note added to the model by a student may be interesting only for the student himself/herself. Error reports as annotations to a model should probably be visible to the owner of the model and the one who reported the error. Editing annotations should typically be possible for the creator of an annotation. But in a collaborative annotation scenario, also a group of other users should be allowed to edit the annotation.

### Annotations and Sevianno

To check whether the requirements listed above can be met be Sevianno, I need to have a closer look at the Sevianno documentation. But in general, Sevianno allows adding custom fields, which can allow for the implementation of these requirements. This might require an advanced client though.

### Licencing of X3D models
X3D provides header fields which allow adding licence information to models. Here you can find an example:  
http://www.web3d.org/x3d/content/examples/Basic/development/_pages/page81.html

### Requirements for client implementation
- Yogi mentioned Yatta (=y.js), but this is not directly related to annotations. The library is concerned with concurrency control (see http://y-js.org/).
- Resolving a 3D point based on a click on a 2D interface. x3dom supports some raytracing algorithm that may be helpful?!
- Inserting 3D geometry into scene graph to indicate position of annotation
- Display annotation content
- Collapse / uncollapse annotation content
