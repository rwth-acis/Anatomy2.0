<?php
/**
 * Copyright 2015 Adam Brunnmeier, Dominik Studer, Alexandra Wörner, Frederik Zwilling, Ali Demiralp, Dev Sharma, Luca Liehner, Marco Dung, Georgios Toubekis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @file search.php
 * Search field used on the models overview page (overview.php) and editcourse.php
 */
?>
<div class="search_box">
  <form autocomplete="on" onsubmit="return false;">
    <input type="text" class="text-box" id="search" name="search" placeholder="Search..." oninput="modelSearch.showModels(this.value)" onsubmit="modelSearch.showModels(this.value)">
  </form>
</div>