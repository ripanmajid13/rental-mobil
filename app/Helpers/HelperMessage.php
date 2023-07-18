<?php

if (!function_exists('HelperMessageSuccessStore')) {
    function HelperMessageSuccessStore() {
        return "Data was saved successfully.";
    }
}

if (!function_exists('HelperMessageSuccessUpdate')) {
    function HelperMessageSuccessUpdate() {
        return "The data has been successfully updated.";
    }
}

if (!function_exists('HelperMessageSuccessDestroy')) {
    function HelperMessageSuccessDestroy() {
        return "Data deleted successfully.";
    }
}

if (!function_exists('HelperMessageSuccessRestore')) {
    function HelperMessageSuccessRestore() {
        return "Data was restored successfully.";
    }
}

if (!function_exists('HelperMessageSuccessDestroyPermanent')) {
    function HelperMessageSuccessDestroyPermanent() {
        return "The data has been permanently deleted successfully.";
    }
}
