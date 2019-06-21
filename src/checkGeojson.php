<?php

declare(strict_types=1);

namespace DHTM;

use Exception;

class CheckGeoJSON extends DHTM {

    const DATE_LENGTH = 10;
    const SKIP_VALID_TO = 11;
    const SKIP_VALID_FROM = 13;

    public $geojsonPath = "./geojson/d_line.geojson";
    
    public static function openGeojson($filename) {
        return fopen($filename, 'r');
    }

    public static function getLine($geojson): string {
        return fgets($geojson);
    }

    public static function getValidFrom(string $line): string {
        $startPosition = strpos($line, 'valid_from') + SKIP_VALID_FROM;
        $validFrom = substr($line, $startPosition, DATE_LENGTH);
        return $validFrom;
    }

    public static function getValidTo(string $line): string {
        $startPosition = strpos($line, 'valid_from') + SKIP_VALID_TO;
        $validTo = substr($line, $startPosition, DATE_LENGTH);
        return $validTo;
    }

    public static function isValidationCorrect(string $validFrom, $validTo): boolean {
        if ($validFrom > $validTo) { 
            return false;
        } else {
            return true;
        }
    }

    public static function checkGeojson(): boolean {
        $geojson = openGeojson($geojsonPath);
        $areValidDates = true;
        while (feof($geojson)) {
            $line = getLine($geojson);
            $validFrom = getValidFrom($line);
            $validTo = getValidTo($line);
            $areValidDates = isValidationCorrect($validFrom, $validTo);
            // missing step for moving next line
        }
        return $areValidDates;
    }

}
