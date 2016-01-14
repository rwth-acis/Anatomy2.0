# legacy file, retained to keep bookmarks/links to '.../model_viewer.php' intact

<?php
    header("Status: 301 Moved Permanently");
    header("Location: ./showcase.php?". $_SERVER['QUERY_STRING']);
    exit;

