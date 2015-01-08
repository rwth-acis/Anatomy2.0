# 3D MODELS

3D Models is a web-based, mobile-ready application which allows to:

  - choose from a list of three-dimensional models,
  - (collaboratively) view the chosen model and
  - update more three-dimensional models.

Collaborative 3D model viewing allows investigating and learning from a 3D model in a group. You can open a model on different devices and if one person moves the model on his device, the view on all other devices is synchronized. Therefore, you can easily show, explain or discuss parts of the model, no matter if you are explaining something as a teacher, learning in a group over the internet or discussing about an object you don't have physical access to. The project mainly focuses on models from 3D scanned real objects that often are too valuable or not available for investigation by hands. If you want to view a model that is not already in the database, you can also upload it yourself.

### ROLE
The collaborative 3D model viewing is provided in widgets for the Responsive Open Learning Environments ([ROLE]). Here you can create a workspace, setup a learning environment and invite other people to join you. ROLE allows you to combine the Collaborative 3D Model Viewing with many other widgets for collaborative learning.

#### Setup
Setting up the environment for collaborative viewing is really easy. If you do it for the first time, you can follow these steps:

1. Create a ROLE space [here]
2. Log in (e.g. with your Google account)
3. Add the following widgets in the sidebar on the left
 * http://eiche.informatik.rwth-aachen.de/henm1415g2/src/role/overview.xml
 * http://eiche.informatik.rwth-aachen.de/henm1415g2/src/role/model_viewer.xml
4. Invite others by providing the link to the space (e.g. http://role-sandbox.eu/spaces/spacename)
5. Select a model in the overview

### Tech

3DModels uses a number of open source projects to work properly:

* Javascript
* PHP
* MySQL
* [Interwidget Communication]

### Development

Want to contribute? Great!
Shoot us an email, if you encounter any bugs or problems: henm1415g2@dbis.rwth-aachen.de

### Todo's

 - Extend functionality



[ROLE]:http://role-sandbox.eu
[here]:http://role-sandbox.eu
[Interwidget Communication]:http://dbis.rwth-aachen.de/cms/projects/the-xmpp-experience/#interwidget-communication
