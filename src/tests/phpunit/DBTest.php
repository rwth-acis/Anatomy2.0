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
 */

require_once "Generic_Tests_DatabaseTestCase.php";
require_once "../../php/tools.php";

/**
 * Tests the models database
 * Testing of correct insertion and selection behaviour
 */
class DBTest extends Generic_Tests_DatabaseTestCase {
    
    public function getDataSet()
    {
        return $this->createXmlDataSet("small_dataset.xml");
    }

    public function testGetRowCount() {
        $this->assertEquals(8, $this->getConnection()->getRowCount("models_test"));
    }

    public function testAddEntry() {
        $this->assertEquals(8, $this->getConnection()->getRowCount("models_test"));
        $this->getConnection()->getConnection()->query("INSERT INTO models_test VALUES (
            7, 'Helmet down to 1%', 'Scanned helmet, downscaled to 1%', 'Archeology', 
            '2014-11-25 00:00:00','1.2 MB','models/7/7.x3d','models/7/preview/7.png',NULL)");
        $this->assertEquals(9, $this->getConnection()->getRowCount("models_test"));
    }

    public function testSelectRow() {
        $arg = 5;
        $query  = $this->getConnection()->getConnection()->query(
            "SELECT * FROM models_test WHERE id = $arg");
        $result = $query->fetchAll();

        $this->assertEquals(1, count($result));
        $this->assertEquals("Helmet", $result[0]["name"]);

    }

    public function testSelectDataURL() {
        $arg = 3;
        $query  = $this->getConnection()->getConnection()->query(
            "SELECT data_url FROM models_test WHERE id = $arg");
        $result = $query->fetchAll(PDO::FETCH_COLUMN);
        
        $this->assertEquals(1, count($result));
        $this->assertEquals("models/3/3.x3d", $result[0]);

    }

    public function testDisplayModels() {
        $arg = 3;
        $query  = $this->getConnection()->getConnection()->query(
            "SELECT * FROM models_test WHERE id = $arg");
        $result = $query->fetchAll();
        
        $html = createModelsTable($result);
        $this->assertEquals($html, "<div class='row'><div class='col-md-6 overview-entry' name='table-entry' id='table_entry1'><a href='model_viewer.php?id=3' id='a_img1'>
            <img src='../../models/3/preview/3.png' alt=Helmet class='img-responsive img-fit'>
            <h3>Helmet</h3>
          </a>
          <p><b>Model Name:</b> Helmet</p>
            <p><b>Category:</b> Archeology</p>
            <p><b>Size:</b> 13.9 MB</p>
            <p><b>Upload Date:</b> 2014-11-27 00:00:00</p>
            <p><b>Description:</b> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div></div>");
    }
}
?>