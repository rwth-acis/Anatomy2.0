<!--
 - Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 -
 - Licensed under the Apache License, Version 2.0 (the "License");
 - you may not use this file except in compliance with the License.
 - You may obtain a copy of the License at
 -
 -   http://www.apache.org/licenses/LICENSE-2.0
 -
 - Unless required by applicable law or agreed to in writing, software
 - distributed under the License is distributed on an "AS IS" BASIS,
 - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 - See the License for the specific language governing permissions and
 - limitations under the License.
 -
 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Jasmine Spec Runner v2.1.2</title>

    <link rel="shortcut icon" type="image/png" href="lib/jasmine-2.1.2/jasmine_favicon.png">
    <link rel="stylesheet" href="lib/jasmine-2.1.2/jasmine.css">
    <link rel="stylesheet" href="../../css/editcourse.css">

    
    <script src="lib/jasmine-2.1.2/jasmine.js"></script>
    <script src="lib/jasmine-2.1.2/jasmine-html.js"></script>
    <script src="lib/jasmine-2.1.2/boot.js"></script>

    <!-- jQuery support and use of fixtures (loading of external html files) -->
    <script src ="http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
    <script src="lib/jasmine-2.1.2/jasmine-jquery.js"></script>

    <!-- include source files here... -->
    <script src ="http://dbis.rwth-aachen.de/gadgets/iwc/lib/iwc.js" > </script>
    <script type='text/javascript' src='../../x3dom.js'> </script>
    <script src="../../js/tools.js"></script>
    <script src="../../js/ajax.js"></script>
    <script src="../../js/viewer.js"></script>
    <script src="../../js/toolbar.js"></script>
    <script src="../../js/init-wrapper.js"></script>
    <script src="../../js/init-subsite.js"></script>
    <script src="../../js/editcourse.js"></script>
    <script src="../../js/x3d-extensions.js"></script>
    <script src="../../js/search.js"></script>

    <!-- Helper for Specs: -->
    <script src="spec/SpecHelper.js"></script>

    <!-- include spec files here... -->
    <!-- <script src="spec/ExampleSpec.js"></script> -->
    <script src="spec/ToolSpec.js"></script>
    <script src="spec/ViewerSpec.js"></script>
    <script src="spec/MenuToolbarSpec.js"></script>
    <script src="spec/Init-WrapperSpec.js"></script>
    <script src="spec/Init-SubsiteSpec.js"></script>
    <script src="spec/EditCourseSpec.js"></script>
    <script src="spec/SearchSpec.js"></script>
  </head>

  <body>

    <!-- Not so nice, but it simplifies functionality that manipulates the view 
    mode selection -->
    <div style="display:none">
      <?php include("spec/javascripts/fixtures/viewModeSelect.html"); ?>
    </div>

  </body>
</html>
