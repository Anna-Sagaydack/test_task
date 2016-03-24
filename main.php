<?php
require_once 'controller/include.php';
if(!isset($_SESSION["logged_in"]))
{
    header("Location: authoriz.php");
}
include 'view/header.html';
include 'view/index.html';
include 'view/footer.html';