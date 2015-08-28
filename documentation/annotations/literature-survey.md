# Annotations - Literature Survey

### Annotations and X3D

I found only one promising resource on Annotations with X3D at the Xj3D project http://www.xj3d.org/  
They proposed an extension of X3D for annotations: http://www.xj3d.org/extensions/annotation.html#Concepts

The following documentation for X3D XML encoding exists:  
x3dom provides a good description of all node elements of X3D: http://doc.x3dom.org/author/nodes.html  
The same list can also be found on the official X3D page: http://www.web3d.org/documents/specifications/19776-1/V3.3/Part01/EncodingOfNodes.html#MetadataSet  

Unfortunately, there is no node in X3D which concretely supports annotations. X3D just supports a `Text` node. There are also nodes for 2D elements.

Although none of the X3D profiles supports annotations, an overview about all profiles can be found at http://www.web3d.org/x3d/profiles  
To read about details on the profiles, visit http://www.web3d.org/documents/specifications/19775-1/V3.2/Part01/Architecture.html . Note, that this specification is not specific to X3D XML encoding (instead it describes the X3D scence graph elements).

There is also a working group specialized on medical modelling. But I could not find any helpful results on their page http://www.web3d.org/working-groups/medical

There seems to be one comprehensive book on X3D called X3D: 3D Graphics for Web Authors, by Don Brutzman and Leonard Daly. Two example chapters can be accessed on http://x3dgraphics.com/chapters/

The authors of "X3D Fragment Identifiers - Extending the Open Annotation Model to Support Semantic Annotation of 3D Cultural Heritage Objects over the Web" created point and volumentric annotations for X3D objects which conform to the Open Annotation model. The PDF unfortunately cannot be accessed for free on http://multi-science.atypon.com/doi/ref/10.1260/2047-4970.3.3.579

### Open Annotation Model

According to its specification, "The primary aim of the Open Annotation Data Model is to provide a standard description mechanism for sharing Annotations between systems." The full specification can be found at http://www.openannotation.org/spec/core/#Aims

The Open Annotation Model (OAM) is based on the Resource Description Framework (RDF), which is comprehensively explained at http://www.w3.org/TR/2014/NOTE-rdf11-primer-20140225/#section-graph-syntax

Although OAM focuses on sharing annotations between multiple applications, its use cases at http://www.openannotation.org/usecases.html are still very helpful to identify requirements for annotations for Anatomy2.0.

### Results - Annotation Concept Model

Based on the OAM use cases and specification I identified three main components which should to be associated with each annotation:
- Target: Which object is to be annotated? At minimum the target is a unique identifier for the object/model to be annotated (like in [3Drepository](http://dbis.rwth-aachen.de/3dnrt/3Drepository/)). But the target will typically also define, where on the model an annotation can be accessed. How the "where" is decribed can be very different. It could be a point in space, a sphere, a cube or another 3D object. Another interesting alternative might be, that the annotation can be accessed only at the intersection of a primitive 3D object with the model. This means, the annotation might be connected to a sphere, but is only accessible where the sphere intersects with the model. This way, it feels more like parts of the model are annotated. It can also be beneficial to associate multiple targets with a single annotation. This way multiple areas of a single model or similar areas on differnt models can be annotated consistently.
- Content (called "body" in OAM): What is to be displayed as an annotation? Can be text, an image, a video or audio data. It might be interesting to allow for localization of text (and also video / audio data). This can be achieved by providing multiple content components for a single annotation (which could be distinguished by an identifier, which could specify the language of the content).
- Access Rights: Who can view or modify an annotation? Viewing can be restricted based on the purpose of the annotation. An annotation for teaching purposes provided by the lecturer should probably be visible to everyone. In contrast, a note added to the model by a student may be interesting only for the student himself/herself. Error reports as annotations to a model should probably be visible to the owner of the model and the one who reported the error. Editing annotations should typically be possible for the creator of an annotation. But in a collaborative annotation scenario, also a group of other users should be allowed to edit the annotation.

### Annotations and Sevianno

To check whether the requirements listed above can be met be Sevianno, I need to have a closer look at the Sevianno documentation. But in general, Sevianno allows adding custom fields, which can allow for the implementation of these requirements. This might require an advanced client though.

### Licencing of X3D models

### Security and Trust for models
- Binary format?
- Hashing, checksum?

### Requirements for client implementation
- Yogi mentioned Yatta (=y.js), but this is not directly related to annotations. The library is concerned with concurrency control (see http://y-js.org/).
- Resolving a 3D point based on a click on a 2D interface. x3dom supports some raytracing algorithm that may be helpful?!
- Inserting 3D geometry into scene graph to indicate position of annotation
- Display annotation content
- Collapse / uncollapse annotation content
